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
export function loadImage (url, handler) {
  let $el = document.createElement('img')
  $el.src = url
  $el.onload = handler
  $el.onerror = handler
  $el = null
}

/**
 * to int
 * @param m
 * @returns {number}
 */
export function int (m) {
  let n = parseInt(m)
  return isNaN(n) ? 0 : n
}

/**
 * convert pseudoArray to array
 * @param pseudoArray
 * @param index
 * @returns {T[]}
 */
export function slice (pseudoArray, index) {
  return Array.prototype.slice.call(pseudoArray, int(index))
}
