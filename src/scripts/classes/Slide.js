import $ from "jquery";
import SliderFragment from "./SliderFragment.js";

export default class Slide {
  constructor($slide, isActive, windowParams) {
    this.$slide = $slide;
    this.fragments = this.$slide
      .find(".js-slide-fragment")
      .map(function (index) {
        return new SliderFragment($(this), index, isActive, windowParams);
      })
      .get();
  }

  activate() {
    this.$slide.addClass("js-slide--active");
    this.activateFragments();
  }

  deactivate() {
    this.$slide.removeClass("js-slide--active");
    this.deactivateFragments();
  }

  activateFragments() {
    this.fragments.forEach(fragment => fragment.startAnimation());
  }

  deactivateFragments() {
    this.fragments.forEach(fragment => fragment.clearFragment(true));
  }

  revertFragments() {
    this.fragments.forEach(fragment => fragment.clearFragment(false));
  }
}
