import $ from "jquery";

export default class SliderFragment {
  constructor($fragment, index, isActive) {
    this.$fragment = $fragment;
    this.index = index; // 0 - left top; 1 - right top, 2 - left-bottom, 3 - right bottom
    this.$window = $(window);

    isActive && this.calculateFragment();
    this.$window.on("resize", () => this.isActive && this.calculateFragment());
  }

  calculateFragment() {
    this.isActive = true;
    let windowWidth = this.$window.width();
    let windowHeight = this.$window.height();
    let horizontalRatio = windowWidth / windowHeight > 1.6; // 1.6 = 1920 / 1200 - background images dimentions
    const fragmentWidth = getRandomInt(.4 * windowWidth, .6 * windowWidth);
    const fragmentHeight = getRandomInt(.4 * windowHeight, .6 * windowHeight);
    let top, left;

    switch (this.index) {
      case 0:
        top = getRandomInt(0, 0.3 * (windowHeight - fragmentHeight));
        left = getRandomInt(0, 0.3 * (windowWidth - fragmentWidth));
        break;
      case 1:
        top = getRandomInt(0, 0.3 * (windowHeight - fragmentHeight));
        left = getRandomInt(0.7 * (windowWidth - fragmentWidth), windowWidth - fragmentWidth);
        break;
      case 2:
        top = getRandomInt(0.7 * (windowHeight - fragmentHeight), windowHeight - fragmentHeight);
        left = getRandomInt(0, 0.3 * (windowWidth - fragmentWidth));
        break;
      case 3:
        top = getRandomInt(0.7 * (windowHeight - fragmentHeight), windowHeight - fragmentHeight);
        left = getRandomInt(0.7 * (windowWidth - fragmentWidth), windowWidth - fragmentWidth);
    }

    this.$fragment.css({
      width: fragmentWidth + "px",
      height: fragmentHeight + "px",
      top,
      left,
      zIndex: getRandomInt(-4, 0),
      backgroundSize: horizontalRatio ? windowWidth + "px" : "auto " + windowHeight + "px",
      backgroundPosition: horizontalRatio
        ? // Then image was cut from top and bottom, so we compensate it with (windowWidth / 1.6 - windowHeight) / 2 term. Other terms are just compensation of top and left shifts
          `-${left}px -${(windowWidth / 1.6 - windowHeight) / 2 + top}px`
        : // Then image was cut from left and right, so we additionally compensate it with 1.6 * windowHeight - windowWidth) / 2 term. Other terms are just compensation of top and left shifts
          `-${(1.6 * windowHeight - windowWidth) / 2 + left}px -${top}px`,
      transform: `translate3D(0, 0, ${getRandomInt(25, 75)}px)`,
      boxShadow: "0 0 28px #000"
    });

    function getRandomInt(min, max) {
      const minCeiled = Math.ceil(min);
      const maxFloored = Math.floor(max);
      return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }
  }

  animateFragment() {
    
  }

  clearFragment() {
    this.$fragment.css({
      transform: "translate3d(0, 0, 0)",
      boxShadow: "none"
    });
    this.isActive = false;
  }
}
