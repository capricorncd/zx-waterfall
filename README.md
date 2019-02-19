# zx-waterfall

> waterfall

## Getting Started

Install `zx-waterfall` using `npm`

```
npm i --save zx-waterfall
```

ES6+

```javascript
import ZxWaterfall from 'zx-waterfall'

const waterfall = new ZxWaterfall({
  // HTMLElement, waterfall items's outer container
  container: document.getElementById('zxWaterfall'),
  // children item selector, eg. '.item-container'
  itemSelector: '.item-wrapper',
  // item's spacing, unit px
  gutter: 20,
  // item's width
  itemWidth: 300
})
// reset
waterfall.reset()
// loaMedias
waterfall.loadMedia(['http://xx.com/aaa.jpg'])
// change
waterfall.change()
```

browser

```html
<script src="path/zx-waterfall.min.js"></script>
```

demo

https://capricorncd.github.io/zx-waterfall/dist/index.html

## Notice

* `container` 's style must be `style.position=relative|absolute|fixed`

## options

* container: `HTMLElement`

  HTMLElement, waterfall items's outer container.

* containerWidth: `Number`

  container's width, use by container are hidden when initialize.

  default get container offsetWidth when it's visible.


* itemSelector: `String`

  children item selector, eg. '.item-container'.

* gutter: `Number`

  item's spacing, unit px. default `20`.

* verticalGutter: `Number`

  item's vertical spacing, default use gutter's value.

* itemWidth: `Number`

  item's width, default `300`.

* forceItemWidth: `Boolean`

  force item width, default `false`.

* align: `String`

  Horizontal align when forceItemWidth is true.

## Copyright and license

Code and documentation copyright 2019. capricorncd. Code released under the ISC License.
