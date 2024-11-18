import BaseElement from "../../shared/base-element";
import css from "./index.css?inline";
import html from "./index.html?raw";

export default class Step extends BaseElement {
  static tagName = 'cc-step';
  static define() {
    customElements.define(Step.tagName, Step);
  }

  constructor() {
    super();
    this.render(html, css);
  }

  get imageElem() {
    return this.getAssignedElementsFor(this.getSlot('image'))[0];
  }

  connectedCallback() {
    this.shadowRoot.querySelector('[part=indicator]')
      .textContent = this.getAttribute('step');

    this.imageRadius = Number(window.getComputedStyle(this.imageElem).getPropertyValue('width')
      .replace('px', '')) / 2;
    // Distance from center point to top right corner.
    console.log(this.imageRadius * this.imageRadius / 2); // 根号即是边长。
    this._triangleLength = 35.35;
    this.style.setProperty('--triangle-length', `${this._triangleLength}px`);
  }
}

Step.define();
