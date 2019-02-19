/**
 * Created by Capricorncd.
 * Date: 2019/02/19 11:08
 * https://github.com/capricorncd
 */
import pkg from '../package.json'

function dd (n) {
  let str = n + ''
  return str[1] ? n : '0' + n
}

function formatDate () {
  const date = new Date()
  return `${date.getFullYear()}-${dd(date.getMonth() + 1)}-${dd(date.getDate())} ${dd(date.getHours())}:${dd(date.getMinutes())}:${dd(date.getSeconds())}`
}

export default `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.homepage}
 * Copyright © 2019-present, ${pkg.author}
 * Released under the ${pkg.license} License
 * Released on: ${formatDate()}
 */`
