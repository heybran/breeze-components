import { resetMouse, sendKeys } from "@web/test-runner-commands";
import { aTimeout, expect, fixture, html, oneEvent } from "@open-wc/testing";
import sinon from "sinon";
import "../../../dist/dialog/index.js"; // Build the component first by running "npm run build".

describe("<cc-dialog>", () => {
  /** @type {sinon.SinonFakeTimers} */
  let clock = null;

  afterEach(async () => {
    clock?.restore();
    await resetMouse();
  });

  it("close state", async () => {
    const ce = await fixture(html`<cc-dialog>I am a dialog.</cc-dialog>`);
    expect(ce.open).to.be.false;
    expect(ce.hasAttribute("open")).to.be.false;
    expect(ce.dialog instanceof HTMLDialogElement).to.be.true;
    expect(ce.dialog.hasAttribute("open")).to.be.false;
    expect(ce.dialog.open).to.be.false;
  });

  it("open state", async () => {
    const ce = await fixture(html`<cc-dialog open>I am a dialog.</cc-dialog>`);
    expect(ce.open).to.be.true;
    expect(ce.hasAttribute("open")).to.be.true;
    expect(ce.dialog instanceof HTMLDialogElement).to.be.true;
    expect(ce.dialog.hasAttribute("open")).to.be.true;
    expect(ce.dialog.open).to.be.true;
  });

  it("show() works", async () => {
    const wrapper = await fixture(html`
      <div class="wrapper">
        <button type="button" onclick="this.nextElementSibling.show();">
          Show dialog
        </button>
        <cc-dialog>I am a dialog.</cc-dialog>
      </div>
    `);
    const button = wrapper.firstElementChild;
    const ce = wrapper.lastElementChild;
    button.click();
    expect(ce.open).to.be.true;
    expect(ce.hasAttribute("open")).to.be.true;
    await aTimeout(100);
    expect(ce.dialog instanceof HTMLDialogElement).to.be.true;
    expect(ce.dialog.hasAttribute("open")).to.be.true;
    expect(ce.dialog.open).to.be.true;
  });

  it("hide() works", async () => {
    const wrapper = await fixture(html`
      <div class="wrapper">
        <button type="button" onclick="this.nextElementSibling.hide();">
          Hide dialog
        </button>
        <cc-dialog open>I am a dialog.</cc-dialog>
      </div>
    `);
    const button = wrapper.firstElementChild;
    const ce = wrapper.querySelector("cc-dialog");
    button.click();
    await aTimeout(100);
    expect(ce.open).to.be.false;
    expect(ce.hasAttribute("open")).to.be.false;
    expect(ce.dialog.hasAttribute("open")).to.be.false;
    expect(ce.dialog.open).to.be.false;
  });

  it("label works", async () => {
    const label = "Add delivery address";
    const dialog = await fixture(html`
      <cc-dialog label="${label}">I am a dialog.</cc-dialog>
    `);
    expect(dialog.slot("title").textContent).to.equal(label);
  });

  it("close button works", async () => {
    const ce = await fixture(html` <cc-dialog>I am a dialog.</cc-dialog> `);
    ce.shadowRoot.querySelector('[part="close-button"]').click();
    await aTimeout(100);
    expect(ce.open).to.be.false;
    expect(ce.hasAttribute("open")).to.be.false;
    expect(ce.dialog.hasAttribute("open")).to.be.false;
    expect(ce.dialog.open).to.be.false;
  });

  it("esc key works", async () => {
    const ce = await fixture(
      html` <cc-dialog open>I am a dialog.</cc-dialog> `
    );
    await sendKeys({ press: "Escape" });
    await aTimeout(100);
    expect(ce.open).to.be.false;
    expect(ce.hasAttribute("open")).to.be.false;
    expect(ce.dialog.hasAttribute("open")).to.be.false;
    expect(ce.dialog.open).to.be.false;

    const wrapper = await fixture(html`
      <div class="wrapper">
        <button type="button" onclick="this.nextElementSibling.show();">
          Show dialog
        </button>
        <cc-dialog>I am a dialog.</cc-dialog>
      </div>
    `);
    const button = wrapper.firstElementChild;

    const ce2 = wrapper.lastElementChild;
    button.click();
    await sendKeys({ press: "Escape" });
    await aTimeout(100);
    expect(ce2.open).to.be.false;
    expect(ce2.hasAttribute("open")).to.be.false;
    expect(ce2.dialog.hasAttribute("open")).to.be.false;
    expect(ce2.dialog.open).to.be.false;

    // Focus has been set back to the trigger button.
    expect(document.activeElement).to.equal(button);
  });
});
