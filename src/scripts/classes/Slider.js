import $ from "jquery";
import Slide from "./Slide.js";

export default class Slider {
  constructor($slider) {
    const $window = $(window);
    const $document = $(document);
    const $html = $("html");
    const windowParams = {
      windowWidth: $window.width(),
      windowHeight: $window.height()
    };
    this.$body = $("body");
    this.$slider = $slider;
    this.currentSlideNumber = 0;
    this.opacityTransitionDuration = parseFloat($html.css("--main-slider-opacity-trans-dur"));
    this.transitionDuration = parseFloat($html.css("--main-slider-trans-dur"));
    this.isOpacityTransitioning = false;
    this.slides = $slider
      .find(".js-slide")
      .map((index, el) => new Slide($(el), index === this.currentSlideNumber, windowParams))
      .get();
    const $slidesHeadings = this.$slider.find(".js-slide__heading");
    this.slidesScrollStartPos = getSlidesScrollStartPos();
    this.slidePresentationToScroll = this.$slider.find(".js-slide-presentation-to-scroll");

    this.autoPlay();

    const winScrollTop = $window.scrollTop();

    if (winScrollTop > 0) this.hideElementsAndScrollHeading(winScrollTop); // For correct reload in Chrome

    $document.on("scroll", () => {
      const winScrollTop = $window.scrollTop();

      if (winScrollTop > 0) {
        this.hideElementsAndScrollHeading(winScrollTop);
      } else {
        this.showElements();
      }
    });

    $window.on("resize", () => {
      windowParams.windowWidth = $window.width();
      windowParams.windowHeight = $window.height();
      this.slideHeadingsBottomPos = getSlidesScrollStartPos();
      this.slides[this.currentSlideNumber].fragments.forEach((fragment) => fragment.updateFragment());
    });

    $slider.find("#slider-scroll-down").on("click", () => {
      $html.animate({ scrollTop: windowParams.windowHeight - 30 }, 2000);
    });

    $slider.find("#slider-prev").on("click", () => {
      sliderControlClickHandler.call(this, this.prevSlide.bind(this));
    });

    $slider.find("#slider-next").on("click", () => {
      sliderControlClickHandler.call(this, this.nextSlide.bind(this));
    });

    function sliderControlClickHandler(switchFunction) {
      if (!this.isOpacityTransitioning) {
        clearTimeout(this.autoplayTimeoutId);
        switchFunction();
        this.blockControls();
      }
    }

    function getSlidesScrollStartPos() {
      return $slidesHeadings
        .map((_index, el) => {
          const $el = $(el);
          return windowParams.windowHeight - ($el.offset().top + $el.innerHeight()) + $window.scrollTop(); // $window.scrollTop() is required for page refresh
        })
        .get();
    }
  }

  autoPlay() {
    this.autoplayTimeoutId = setTimeout(() => {
      this.nextSlide();
    }, (this.transitionDuration + this.opacityTransitionDuration) * 1000);
  }

  blockControls() {
    this.isOpacityTransitioning = true;
    setTimeout(() => {
      this.isOpacityTransitioning = false;
    }, this.opacityTransitionDuration * 1000);
  }

  prevSlide() {
    const prevSlideNumber = this.currentSlideNumber;
    this.currentSlideNumber = prevSlideNumber === 0 ? this.slides.length - 1 : prevSlideNumber - 1;
    this.moveToSlide(this.currentSlideNumber, prevSlideNumber);
  }

  nextSlide() {
    const prevSlideNumber = this.currentSlideNumber;
    this.currentSlideNumber = prevSlideNumber === this.slides.length - 1 ? 0 : prevSlideNumber + 1;
    this.moveToSlide(this.currentSlideNumber, prevSlideNumber);
  }

  moveToSlide(slideNumber, prevSlideNumber) {
    this.slides[prevSlideNumber].deactivate();
    this.slides[slideNumber].activate();
    this.autoPlay();

    if (!this.isOpacityTransitioning) {
      // Then we come here from autoplay and not from control click. So we need to block first click here. Otherwise, after quick click user could see not cleared previous slide
      this.blockControls();
    }
  }

  startPlaying() {
    this.slides[this.currentSlideNumber].activateFragments();
    this.autoPlay();
  }

  stopPlaying() {
    clearTimeout(this.autoplayTimeoutId);
    this.slides[this.currentSlideNumber].revertFragments();
  }

  hideElementsAndScrollHeading(scrollTop) {
    this.$body.addClass("js-body--scrolled");
    this.stopPlaying();

    if (scrollTop > this.slidesScrollStartPos[this.currentSlideNumber]) {
      this.slidePresentationToScroll.eq(this.currentSlideNumber).css("top", this.slidesScrollStartPos[this.currentSlideNumber] - scrollTop + "px");
    } else {
      this.slidePresentationToScroll.eq(this.currentSlideNumber).css("top", "0px");
    }
  }

  showElements() {
    this.$body.removeClass("js-body--scrolled");
    this.slidePresentationToScroll.eq(this.currentSlideNumber).css("top", "0px"); // If scroll fast (e. g. press "Home" key) some top value is still remain
    this.startPlaying();
  }
}
