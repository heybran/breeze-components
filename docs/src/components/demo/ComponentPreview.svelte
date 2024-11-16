<script>
  import { onMount, afterUpdate } from "svelte";
  if (!import.meta.env.SSR) {
    const components = [
      'alert',
      'button',
      'icon',
      'option',
      'select',
      'spinner',
      'switch',
      'text-field',
      'textarea',
      'tooltip',
      'form-layout',
      'password-field',
      'checkbox',
      'radio',
      'radio-group',
      'horizontal-layout',
      'vertical-layout',
      'carousel',
      'carousel-item',
      'divider',
      'qr-code',
      'email-field',
      'step',
    ];

    components.forEach(name => {
      import(`../../../../dist/${name}/index.js`);
    });
  }

  export let component;
  export let style;
  export let js;

  let container;

  onMount(() => {
    container.setAttribute('style', style);
    container.innerHTML = component;
    container.querySelector('breeze-select').setAttribute('style', style);
  });

  afterUpdate(() => {
    if (js) {
      const scriptTag = document.createElement('script');
      scriptTag.innerHTML = js;
      document.body.append(scriptTag);
    }
  });
</script>
<div bind:this={container} class="preview"></div>
<style>
  .preview {
    padding: 4rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    background-image: url("/grid_dot.svg");
    background-repeat: repeat;
    background-size: 1.5rem;
    border-radius: 0.33rem;
    border: 1px solid theme("colors.slate.200");
    resize: both;
    padding: 4rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    background-image: url(/grid_dot.svg);
    background-repeat: repeat;
    background-size: 1.5rem;
    border-radius: 0.33rem;
    border: 1px solid #e2e8f0;
    resize: both;
    margin-top: 1rem;
    box-shadow: 7px 7px #e2e8f0;
  }
</style>

<!-- <component-preview>
  <template shadowrootmode="open">
    <style>
      :host {
        margin-top: .5em;
        display: block;
      }
      .preview {
      padding: 4rem;
      display: flex;
      gap: 1rem;
      justify-content: center;
      align-items: center;
      background-image: url("/grid_dot.svg");
      background-repeat: repeat;
      background-size: 1.5rem;
      border-radius: 0.33rem;
      border: 1px solid theme("colors.slate.200");
      resize: both;
      padding: 4rem;
      display: flex;
      gap: 1rem;
      justify-content: center;
      align-items: center;
      background-image: url(/grid_dot.svg);
      background-repeat: repeat;
      background-size: 1.5rem;
      border-radius: 0.33rem;
      border: 1px solid #e2e8f0;
      resize: both;
      }
    </style>
    <div bind:this={container} class="preview"></div>
  </template>
</component-preview> -->
