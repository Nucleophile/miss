import $ from "jquery";
import SliderFragment from "./SliderFragment.js";

export default class Slide {
  constructor($slide, isActive) {
    this.$slide = $slide;
    this.fragments = this.$slide
      .find(".js-slide-fragment")
      .map(function (index) {
        return new SliderFragment($(this), index, isActive);
      })
      .get();
  }

  deactivate() {
    this.$slide.removeClass("js-slide--active");
    this.fragments.forEach(fragment => fragment.clearFragment());
  }

  activate() {
    this.$slide.addClass("js-slide--active");
    this.fragments.forEach(fragment => fragment.startAnimation());
  }
}
