# 瀑布流

## 使用说明

使用`npm`安装`zx-waterfall`

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
waterfall.loadMedia(['http://xx.com/aaa.jpg']).then(_ => {
  // change
  waterfall.change()
})
```

browser

```html
<script src="path/zx-waterfall.min.js"></script>
```

## demo

https://capricorncd.github.io/zx-waterfall/dist/index.html

## 注意

* `container` 's style must be `style.position=relative|absolute|fixed`

## 参数options

* container: `HTMLElement`

  瀑布流外容器.

* containerWidth: `Number`

  瀑布流宽度，如果初始化时外容器未隐藏状态则需使用该参数.

  默认获取外容器宽度.


* itemSelector: `String`

  子元素选择器，比如 样式名'.item-container'.

* gutter: `Number`

  元素间的间隔.

* verticalGutter: `Number`

  元素间垂直方向间隔，默认使用gutter值.

* itemWidth: `Number`

  元素宽度, 默认 `300`, 会根据容器宽度自动调整.

* forceItemWidth: `Boolean`

  强制元素宽度，即使用itemWidth作为宽度值，默认 `false`.

* align: `String`, Optional value `left|center|right`

  强制宽度时，元素显示靠边位置，默认 `center`.

## 方法

* reset()

  重置瀑布流初始值

* loadMeida(array)

  预加载列表数据中的image媒体元素.

  array: `['http://a.com/1.jpg', 'http://a.com/2.jpg']`

  @return promise

* change()

  列表数据改变后后，通知瀑布流更新元素位置.
