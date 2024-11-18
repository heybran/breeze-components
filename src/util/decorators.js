// @ts-check
import { defer, camelToKebab, isCustomElement } from "./helper.js";

/**
 * Decorator to define a custom element with the given `name`.
 *
 * The defined custom element will be registered when the element is initialized.
 *
 * @param {string} name The name of the custom element to define.
 * @returns {(_value: undefined, { addInitializer: any }) => void}
 */
export function define(name) {
  return (_value, { addInitializer }) => {
    addInitializer(function () {
      customElements.define(name, this);
    });
  };
}

/**
 * Decorator to define a property with the given `name` and `options`.
 *
 * The property will be added to the custom element when the element is initialized.
 *
 * @param {object} options
 * @param {import('./types.js').PropertyType} options.type The type of the property.
 * @param {(value: import('./types.js').PropertyValueType, host: HTMLElement) => void} [options.onChange] The callback function to call when the property is changed.
 * @param {string} [options.selector] The selector to use to query the property in the shadowRoot.
 *
 * @returns {(_value: undefined, { kind: string, name: string | symbol }) => import('./types.js').PropertyType}
 */
export function property(options) {
  const { type, onChange, selector } = options;
  /**
   * @param {undefined} _value
   * @param {{ kind: string, name: string | symbol }} options
   */
  return function (_value, { kind, name }) {
    name = camelToKebab(String(name));

    if (kind !== "field") return;

    return function (initialValue) {
      if (type === Boolean) {
        initialValue = this.hasAttribute(name);
      } else if (type === String) {
        initialValue = this.getAttribute(name) ?? "";
      } else if (type === HTMLElement) {
        /**
         * At this moment, this.shadowRoot.querySelector(selector) will return null.
         */
        // initialValue = this.shadowRoot.querySelector(selector);
      }

      /**
       * At this moment, if we're querying for DOM elements inside the shadowRoot,
       * they will be `null`, so we would need to hook this callback into the customElements.whenDefined().
       */
      // onChange?.(initialValue, this);

      const constructor = this.constructor;

      if (!constructor.observedAttributes) {
        constructor.observedAttributes = [];
      }

      // Add the property name to observedAttributes.
      if (!constructor.observedAttributes?.includes(name)) {
        constructor.observedAttributes.push(name);
      }

      // const originalAttributeChangedCallback = constructor.prototype.attributeChangedCallback;
      // if (!originalAttributeChangedCallback) {
      //   constructor.prototype.attributeChangedCallback = (attr, oldValue, newValue) => {
      //     this[attr] = newValue;
      //   };
      // }

      // whenDefined is executed after the initial attribute changed callback.
      customElements.whenDefined(this.constructor.tagName).then(() => {
        onChange?.(initialValue, this);

        Object.defineProperty(this, name, {
          get() {
            if (type === Boolean) {
              return this.hasAttribute(name);
            } else if (type === String) {
              return this.getAttribute(name) ?? "";
            } else if (type === HTMLElement) {
              return this.shadowRoot.querySelector(selector);
            }
          },
          set(value) {
            if (type === Boolean) {
              this.toggleAttribute(name, Boolean(value));
              onChange?.(value, this);
            } else if (type === String) {
              if (typeof value !== "string") {
                // TODO: check if it's development mode, then do a console.warn.
                // Or convert value to string with String(value)?
                return;
              }
              if (this.getAttribute(name) !== value) {
                this.setAttribute(name, value);
                return;
              }
              onChange?.(value, this);
            }
          },
          configurable: true,
          enumerable: true,
        });
      });

      return initialValue;
    };
  };
}
