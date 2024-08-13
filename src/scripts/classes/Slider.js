import $ from "jquery";
import Slide from "./Slide.js";

export default class Slider {
  constructor($slider) {
    this.$slider = $slider;
    this.slides = $slider
      .find(".js-slide")
      .map(function () {
        return new Slide($(this));
      })
      .get();
    this.currentSlideNumber = 0;
    $slider.find("#js-slider-prev").on("click", () => this.prevSlide());
    $slider.find("#js-slider-next").on("click", () => this.nextSlide());
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
  }
}
