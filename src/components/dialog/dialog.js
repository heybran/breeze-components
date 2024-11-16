import css from "./dialog.css?inline";
import sharedCSS from "../../shared/shared.css?inline";
import html from "./dialog.html?raw";
import BaseElement from "../../shared/base-element.js";
import "../button/button.js";
import "../icon/icon.js";
import "../tooltip/tooltip.js";
import { define, property } from "../../util/decorators.js";

const tagName = "cc-dialog";

@define(tagName)
export default class CucumberDialog extends BaseElement {
  static tagName = tagName;

  @property({
    type: String,
    onChange: (value, host) => {
      if (host.isSlotAssigned("title")) {
        return;
      }
      host.slot("title").textContent = value;
    },
  })
  label;

  @property({ type: HTMLElement, selector: '[part="dialog"]' })
  dialog;

  connectedCallback() {
    this.render(html, css, sharedCSS);
  }

  show() {
    this.dialog.showModal();
    return this;
  }

  hide() {
    this.dialog.close();
    return this;
  }

  attributeChangedCallback(attr, _oldValue, newValue) {
    this[attr] = newValue;
  }
}
