/*!
 * zx-waterfall v0.0.1
 * https://github.com/capricorncd/zx-waterfall#readme
 * Copyright © 2019-present, Capricorncd
 * Released under the ISC License
 * Released on: 2019-02-20 00:50:51
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.ZxWaterfall = factory());
}(this, function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   * Created by Capricorncd.
   * Date: 2019/02/19 19:30
   * https://github.com/capricorncd
   */

  /**
   * preload image
   * @param url
   * @param handler
   */
  function loadImage(url, handler) {
    var $el = document.createElement('img');
    $el.src = url;
    $el.onload = handler;
    $el.onerror = handler;
    $el = null;
  }
  /**
   * to int
   * @param m
   * @returns {number}
   */

  function int(m) {
    var n = parseInt(m);
    return isNaN(n) ? 0 : n;
  }
  /**
   * convert pseudoArray to array
   * @param pseudoArray
   * @param index
   * @returns {T[]}
   */

  function slice(pseudoArray, index) {
    return Array.prototype.slice.call(pseudoArray, int(index));
  }

  var DEF_OPTIONS = {
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
    align: 'center'
    /**
     * ZxWaterfall
     */

  };

  var ZxWaterfall =
  /*#__PURE__*/
  function () {
    /**
     * constructor
     * @param opts
     */
    function ZxWaterfall(opts) {
      _classCallCheck(this, ZxWaterfall);

      opts = Object.assign({}, DEF_OPTIONS, opts); // check container

      if (!opts.container || opts.container.nodeType !== 1) {
        throw new TypeError("Instancing parameter 'container' is not HTMLElement.");
      } // check itemSelector


      if (!opts.itemSelector || typeof opts.itemSelector !== 'string') {
        throw new TypeError("Instancing parameter 'itemSelector' is null or is't a string.");
      } // check verticalGutter


      if (!opts.verticalGutter) {
        opts.verticalGutter = opts.gutter;
      } // setTimeout


      this.timer = null; // item number

      this.count = 0;
      this.opts = opts;

      this._init(); // clone this.reset


      this._resetClone = this.reset.bind(this);
      window.addEventListener('resize', this._resetClone);
    }
    /**
     * initialization
     * @private
     */


    _createClass(ZxWaterfall, [{
      key: "_init",
      value: function _init() {
        var opts = this.opts; // container width

        var containerWidth = int(opts.containerWidth) || opts.container.offsetWidth; // column number

        var columnNum = Math.floor(containerWidth / (opts.itemWidth + opts.gutter)); // opts.itemWidth when opts.forceItemWidth = true
        // else use compute new width

        this.itemWidth = opts.forceItemWidth ? opts.itemWidth : (containerWidth - (columnNum + 1) * opts.gutter) / columnNum; // column current height array

        this.columns = Array(columnNum);
        this.columns.fill(0, 0); // offset left when forceItemWidth=true

        this.offsetLeft = 0;

        if (opts.forceItemWidth) {
          var residualSpaceWidth = containerWidth - (this.itemWidth + opts.gutter) * columnNum - opts.gutter;

          switch (opts.align) {
            case 'center':
              this.offsetLeft = residualSpaceWidth / 2;
              break;

            case 'right':
              this.offsetLeft = residualSpaceWidth;
              break;
          }
        }
      }
      /**
       * set items position
       * @private
       */

    }, {
      key: "_setPosition",
      value: function _setPosition() {
        var _this = this;

        var opts = this.opts; // get new item elements

        var $childs = slice(opts.container.querySelectorAll(opts.itemSelector), this.count); // console.log(this.count, $childs)

        var len = $childs.length; // reset this.count value

        this.count += len; // handle new $item

        var i, $item;

        var _loop = function _loop() {
          $item = $childs[i];
          if (!$item) return "continue";
          $item.style.position = 'absolute';
          $item.style.width = _this.itemWidth + 'px';
          $item.style.display = 'inline-block'; // get columns min value

          var min = Math.min.apply(null, _this.columns);

          var index = _this.columns.findIndex(function (val) {
            return val === min;
          }); // set $item position


          $item.style.top = "".concat(min + opts.verticalGutter, "px");
          $item.style.left = "".concat(_this.offsetLeft + (_this.itemWidth + opts.gutter) * index + opts.gutter, "px"); // reset waterfall current column height value

          var itemHeight = $item.offsetHeight;
          _this.columns[index] = min + itemHeight + opts.verticalGutter; // update container new min height style
          // opts.container.style.minHeight = Math.max.apply(null, this.columns) + opts.verticalGutter + 'px'
        };

        for (i = 0; i < len; i++) {
          var _ret = _loop();

          if (_ret === "continue") continue;
        }
      }
      /**
       * container's items number change
       */

    }, {
      key: "change",
      value: function change() {
        var _this2 = this;

        // reset postion, when new item element append to container, or remove
        this.timer = setTimeout(function () {
          _this2._setPosition();
        }, 0);
      }
      /**
       * reset
       */

    }, {
      key: "reset",
      value: function reset() {
        this.count = 0;

        this._init();

        this._setPosition();
      }
      /**
       * preload media items
       * @param arr media source urls array
       * @returns {Promise<any>}
       */

    }, {
      key: "loadMedia",
      value: function loadMedia(arr) {
        return new Promise(function (resolve) {
          if (Array.isArray(arr) && arr.length) {
            var len = arr.length;
            var count = 0;
            /* eslint-disable */

            arr.forEach(function (url) {
              loadImage(url, function () {
                count++;
                if (len === count) resolve();
              });
            });
          } else {
            resolve();
          }
        });
      }
      /**
       * destroy
       * removeEventListener window resize
       */

    }, {
      key: "destroy",
      value: function destroy() {
        window.removeEventListener('resize', this._resetClone);
        if (this.timer) clearTimeout(this.timer);
      }
    }]);

    return ZxWaterfall;
  }();

  return ZxWaterfall;

}));
