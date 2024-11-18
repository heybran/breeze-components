---
layout: ../../layouts/MainLayout.astro
title: 'Step'
---

<style>
  div.preview {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 2rem;
  }
</style>
## Default Indicator Placement
<div class="preview">
  <cc-step step="1">
    <img src="/bird.jpg" role="presentation" slot="image">
    <p>
      Sip a small amount of water so it doesn't over flow the bottle.
    </p>
  </cc-step>
  <cc-step step="2">
    <img src="/bird.jpg" role="presentation" slot="image">
    <p>
      Sip a small amount of water so it doesn't over flow the bottle.
    </p>
  </cc-step>
  <cc-step step="3">
    <img src="/bird.jpg" role="presentation" slot="image">
    <p>
      Sip a small amount of water so it doesn't over flow the bottle.
    </p>
  </cc-step>
</div>

## Indicator Placement: `north-east`
<div class="preview">
  <cc-step step="1" indicator-placement="north-east">
    <img src="/bird.jpg" role="presentation" slot="image">
    <p>
      Sip a small amount of water so it doesn't over flow the bottle.
    </p>
  </cc-step>
  <cc-step step="2" indicator-placement="north-east">
    <img src="/bird.jpg" role="presentation" slot="image">
    <p>
      Sip a small amount of water so it doesn't over flow the bottle.
    </p>
  </cc-step>
  <cc-step step="3" indicator-placement="north-east">
    <img src="/bird.jpg" role="presentation" slot="image">
    <p>
      Sip a small amount of water so it doesn't over flow the bottle.
    </p>
  </cc-step>
</div>

## Indicator Placement: `south-east`
<div class="preview">
  <cc-step step="1" indicator-placement="south-east">
    <img src="/bird.jpg" role="presentation" slot="image">
    <p>
      Sip a small amount of water so it doesn't over flow the bottle.
    </p>
  </cc-step>
  <cc-step step="2" indicator-placement="south-east">
    <img src="/bird.jpg" role="presentation" slot="image">
    <p>
      Sip a small amount of water so it doesn't over flow the bottle.
    </p>
  </cc-step>
  <cc-step step="3" indicator-placement="south-east">
    <img src="/bird.jpg" role="presentation" slot="image">
    <p>
      Sip a small amount of water so it doesn't over flow the bottle.
    </p>
  </cc-step>
</div>

## Indicator Placement: `south-west`
<div class="preview">
  <cc-step step="1" indicator-placement="south-west">
    <img src="/bird.jpg" role="presentation" slot="image">
    <p>
      Sip a small amount of water so it doesn't over flow the bottle.
    </p>
  </cc-step>
  <cc-step step="2" indicator-placement="south-west">
    <img src="/bird.jpg" role="presentation" slot="image">
    <p>
      Sip a small amount of water so it doesn't over flow the bottle.
    </p>
  </cc-step>
  <cc-step step="3" indicator-placement="south-west">
    <img src="/bird.jpg" role="presentation" slot="image">
    <p>
      Sip a small amount of water so it doesn't over flow the bottle.
    </p>
  </cc-step>
</div>

```html
```
