import $ from "jquery";

export default class SliderFragment {
  constructor($fragment, index) {
    this.$fragment = $fragment;
    this.index = index; // 0 - left top; 1 - right top, 2 - left-bottom, 3 - right bottom
    this.calculateFragment();
  }

  calculateFragment() {
    let windowWidth = $(window).width();
    let windowHeight = $(window).height();
    let horizontalRatio = windowWidth / windowHeight > 1.6; // 1.6 = 1920 / 1200 - background images dimentions
    const positions = {};
    let backgroundPosition,
        positionLeft,
        positionTop,
        positionRight,
        positionBottom;

    switch (this.index) {
      case 0:
        positionLeft = getRandomInt(0, 0.2 * windowWidth);
        positionTop = getRandomInt(0, 0.2 * windowHeight);
        positions.left = positionLeft + "px";
        positions.top = positionTop + "px";
        backgroundPosition = horizontalRatio
          ? // Then image was cut from top and bottom, so we compensate it with (windowWidth / 1.6 - windowHeight) / 2 term. Other terms are just compensation of top and left shifts
            `-${positionLeft}px -${(windowWidth / 1.6 - windowHeight) / 2 + positionTop}px`
          : // Then image was cut from left and right, so we additionally compensate it with 1.6 * windowHeight - windowWidth) / 2 term. Other terms are just compensation of top and left shifts
            `-${(1.6 * windowHeight - windowWidth) / 2 + positionLeft}px -${positionTop}px`;
        break;
      case 1:
        positionRight = getRandomInt(0, 0.2 * windowWidth);
        positionTop = getRandomInt(0, 0.2 * windowHeight);
        positions.right = positionRight + "px";
        positions.top = positionTop + "px";
        // See case 0 for explanation
        backgroundPosition = horizontalRatio ? `right -${positionRight}px top -${(windowWidth / 1.6 - windowHeight) / 2 + positionTop}px` : `right -${(1.6 * windowHeight - windowWidth) / 2 + positionRight}px top -${positionTop}px`;
        break;
      case 2:
        positionLeft = getRandomInt(0, 0.2 * windowWidth);
        positionBottom = getRandomInt(0, 0.2 * windowHeight);
        positions.left = positionLeft + "px";
        positions.bottom = positionBottom + "px";
        backgroundPosition = horizontalRatio ? `left -${positionLeft}px bottom -${(windowWidth / 1.6 - windowHeight) / 2 + positionBottom}px` : `left -${(1.6 * windowHeight - windowWidth) / 2 + positionLeft}px bottom -${positionBottom}px`;
        break;
      case 3:
        positionRight = getRandomInt(0, 0.2 * windowWidth);
        positionBottom = getRandomInt(0, 0.2 * windowHeight);
        positions.right = positionRight + "px";
        positions.bottom = positionBottom + "px";
        backgroundPosition = horizontalRatio ? `right -${positionRight}px bottom -${(windowWidth / 1.6 - windowHeight) / 2 + positionBottom}px` : `right -${(1.6 * windowHeight - windowWidth) / 2 + positionRight}px bottom -${positionBottom}px`;
    }

    this.$fragment.css({
      width: getRandomInt(20, 60) + "%",
      height: getRandomInt(40, 60) + "%",
      zIndex: getRandomInt(-4, 0),
      backgroundSize: horizontalRatio ? windowWidth + "px" : "auto " + windowHeight + "px",
      backgroundPosition: backgroundPosition,
      ...positions
    });

    function getRandomInt(min, max) {
      const minCeiled = Math.ceil(min);
      const maxFloored = Math.floor(max);
      return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }
  }
}
