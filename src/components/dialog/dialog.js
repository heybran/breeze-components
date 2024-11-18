import css from "./dialog.css?inline";
import sharedCSS from "../../shared/shared.css?inline";
import html from "./dialog.html?raw";
import BaseElement from "../../shared/base-element.js";
import "../button/button.js";
import "../icon/icon.js";
import "../tooltip/tooltip.js";
import "../visually-hidden/visually-hidden.js";
import { define, property } from "../../util/decorators.js";

const tagName = "cc-dialog";

@define(tagName)
export default class CucumberDialog extends BaseElement {
  static tagName = tagName;

  @property({
    type: String,
    whenDefined: (value, host) => {
      if (host.isSlotAssigned("title")) {
        return;
      }
      host.slot("title").textContent = value;
    },
  })
  label;

  @property({
    type: HTMLElement,
    selector: '[part="dialog"]',
    readonly: true,
    whenDefined: (dialog, host) => {
      dialog.addEventListener("close", () => {
        host.open = false;
      });
    },
  })
  dialog;

  @property({
    type: Boolean,
    whenChanged: async (open, host) => {
      await customElements.whenDefined(host.constructor.tagName);
      if (!!open) {
        if (host.dialog?.open) {
          return;
        }
        host.dialog.showModal();
      } else {
        if (!host.dialog.open) {
          return;
        }
        host.dialog.close();
      }
    },
    whenDefined: (open, host) => {
      if (!!open) {
        host.dialog.showModal();
      }
    },
  })
  open = false;

  connectedCallback() {
    this.render(html, css, sharedCSS);
  }

  show() {
    this.setAttribute("open", "");
    return this;
  }

  hide() {
    this.removeAttribute("open");
    return this;
  }

  static observedAttributes = ["label", "open"];

  attributeChangedCallback(attr) {
    super.attributeChangedCallback(attr);
  }
}
