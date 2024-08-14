import $ from "jquery";
import Slide from "./Slide.js";

export default class Slider {
  constructor($slider) {
    const $html = $("html");
    this.$slider = $slider;
    this.currentSlideNumber = 0;
    this.opacityTransitionDuration = parseFloat($html.css("--main-slider-opacity-trans-dur"));
    this.transitionDuration = parseFloat($html.css("--main-slider-trans-dur"));
    this.isOpacityTransitioning = false;
    this.slides = $slider
      .find(".js-slide")
      .map((index, el) => new Slide($(el), index === this.currentSlideNumber))
      .get();

    this.autoplay();

    $slider.find("#js-slider-prev").on("click", () => {
      sliderControlClickHandler.call(this, this.prevSlide.bind(this));
    });

    $slider.find("#js-slider-next").on("click", () => {
      sliderControlClickHandler.call(this, this.nextSlide.bind(this));
    });

    function sliderControlClickHandler(switchFunction) {
      if (!this.isOpacityTransitioning) {
        clearTimeout(this.autoplayTimeoutId);
        switchFunction();
        this.blockControls();
      }
    }
  }

  autoplay() {
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
    this.autoplay();

    if (!this.isOpacityTransitioning) {
      // Then we come here from autoplay and not from control click. So we need to block first click here. Otherwise, after quick click user could see not cleared previous slide
      this.blockControls();
    }
  }
}
