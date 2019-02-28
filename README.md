# zx-waterfall

> waterfall

[中文文档](./docs/cn.md)

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
waterfall.loadMedia(['http://xx.com/aaa.jpg', '...']).then(_ => {
  // update
  waterfall.update()
})
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

* align: `String`, Optional value `left|center|right`

  Horizontal align when forceItemWidth is true, default `center`.


* container: `HTMLElement`

  HTMLElement, waterfall items's outer container.


* containerWidth: `Number`

  container's width, use by container are hidden when initialize.

  default get container offsetWidth when it's visible.


* computeContainerHeight: `Boolean`

  Compute container height and setting when updated. default `false`.


* gutter: `Number`

  item's spacing, unit px. default `20`.


* itemWidth: `Number`

  item's width, default `300`.


* itemSelector: `String`

  children item selector, eg. '.item-container'.


* forceItemWidth: `Boolean`

  force item width, default `false`.


* verticalGutter: `Number`

  item's vertical spacing, default use gutter's value.

## methods

* reset()

  reset initialize

* loadMeida(array)

  preload meidas(image) form list data.

  array: `['http://a.com/1.jpg', 'http://a.com/2.jpg']`

  @return promise

* update()

  List data has been changed to update the position of waterfall elements.

* destroy()

  removeEventListener window resize, clearTimeout.

## Copyright and license

Code and documentation copyright 2019. capricorncd. Code released under the ISC License.
