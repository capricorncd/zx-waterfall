/**
 * Created by Capricorncd.
 * Date: 2019/02/19 19:13
 * https://github.com/capricorncd
 */
import { loadImage, int, slice } from './helper'
// default options
const DEF_OPTIONS = {
  // HTMLElement, waterfall items's outer container
  container: null,
  // container's width, container are hidden when initialized
  // default get container offsetWidth when it's visible
  containerWidth: 0,
  // children item selector, eg. '.item-container'
  itemSelector: '',
  // item's spacing, unit px
  gutter: 20,
  // item's vertical spacing, default use gutter's value
  verticalGutter: 0,
  // item's width
  itemWidth: 300,
  // force item width
  forceItemWidth: false,
  // Horizontal align when forceItemWidth is true
  align: 'center',
  // auto setting container height
  computeContainerHeight: false
}

/**
 * ZxWaterfall
 */
class ZxWaterfall {
  /**
   * constructor
   * @param opts
   */
  constructor (opts) {
    opts = Object.assign({}, DEF_OPTIONS, opts)
    // check container
    if (!opts.container || opts.container.nodeType !== 1) {
      throw new TypeError(`Instancing parameter 'container' is not HTMLElement.`)
    }
    // check itemSelector
    if (!opts.itemSelector || typeof opts.itemSelector !== 'string') {
      throw new TypeError(`Instancing parameter 'itemSelector' is null or is't a string.`)
    }
    // check verticalGutter
    if (!opts.verticalGutter) {
      opts.verticalGutter = opts.gutter
    }
    // setTimeout
    this.timer = null
    // item number
    this.count = 0
    this.opts = opts
    this._init()
    // clone this.reset
    this._resetClone = this.reset.bind(this)
    window.addEventListener('resize', this._resetClone)
  }

  /**
   * initialization
   * @private
   */
  _init () {
    let opts = this.opts
    // container width
    let containerWidth = int(opts.containerWidth) || opts.container.offsetWidth
    // column number
    let columnNum = Math.floor(containerWidth / (opts.itemWidth + opts.gutter))
    // opts.itemWidth when opts.forceItemWidth = true
    // else use compute new width
    this.itemWidth = opts.forceItemWidth
      ? opts.itemWidth
      : (containerWidth - (columnNum + 1) * opts.gutter) / columnNum
    // column current height array
    this.columns = Array(columnNum)
    this.columns.fill(0, 0)
    // offset left when forceItemWidth=true
    this.offsetLeft = 0
    if (opts.forceItemWidth) {
      let residualSpaceWidth = containerWidth - (this.itemWidth + opts.gutter) * columnNum - opts.gutter
      switch (opts.align) {
        case 'center':
          this.offsetLeft = residualSpaceWidth / 2
          break
        case 'right':
          this.offsetLeft = residualSpaceWidth
          break
      }
    }
  }

  /**
   * set items position
   * @private
   */
  _setPosition () {
    let opts = this.opts
    // get new item elements
    let $childs = slice(opts.container.querySelectorAll(opts.itemSelector), this.count)
    // console.log(this.count, $childs)
    let len = $childs.length
    // reset this.count value
    this.count += len
    // handle new $item
    let i, $item
    for (i = 0; i < len; i++) {
      $item = $childs[i]
      if (!$item) continue
      $item.style.position = 'absolute'
      $item.style.width = this.itemWidth + 'px'
      $item.style.display = 'inline-block'
      // get columns min value
      let min = Math.min.apply(null, this.columns)
      let index = this.columns.findIndex(val => val === min)
      // set $item position
      $item.style.top = `${min + opts.verticalGutter}px`
      $item.style.left = `${this.offsetLeft + (this.itemWidth + opts.gutter) * index + opts.gutter}px`
      // reset waterfall current column height value
      let itemHeight = $item.offsetHeight
      this.columns[index] = min + itemHeight + opts.verticalGutter
      // update container new min height style
      if (opts.computeContainerHeight) opts.container.style.minHeight = Math.max.apply(null, this.columns) + opts.verticalGutter + 'px'
    }
  }

  /**
   * Called after the container's items has changed
   */
  update () {
    // reset postion, when new item element append to container, or remove
    this.timer = setTimeout(() => {
      this._setPosition()
    }, 0)
  }

  /**
   * reset
   */
  reset () {
    this.count = 0
    this._init()
    this._setPosition()
  }

  /**
   * preload media items
   * @param arr media source urls array
   * @returns {Promise<any>}
   */
  loadMedia (arr) {
    return new Promise(resolve => {
      if (Array.isArray(arr) && arr.length) {
        let len = arr.length
        let count = 0
        /* eslint-disable */
        arr.forEach(url => {
          loadImage(url, () => {
            count++
            if (len === count) resolve()
          })
        })
      } else {
        resolve()
      }
    })
  }

  /**
   * destroy
   * removeEventListener window resize
   */
  destroy () {
    window.removeEventListener('resize', this._resetClone)
    if (this.timer) clearTimeout(this.timer)
  }
}

export default ZxWaterfall
