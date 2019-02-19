/**
 * Created by Capricorncd.
 * Date: 2019/02/19 10:14
 * https://github.com/capricorncd
 */
import path from 'path'
import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'
import { eslint } from 'rollup-plugin-eslint'
import pkg from '../package.json'
import banner from './banner'

// `npm run build` -> `production` is 'true'
// `npm run dev` -> `production` is undefined
const isProduction = !process.env.ROLLUP_WATCH

// browser-friendly UMD build
// https://github.com/rollup/rollup-starter-lib/blob/master/rollup.config.js
export default {
  input: path.resolve(__dirname, '../src/index.js'),
  output: {
    file: isProduction ? pkg.main : pkg.main.replace('min.', ''),
    format: 'umd',
    name: 'ZxWaterfall',
    banner: banner
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    // so Rollup can find `ms`
    nodeResolve(),
    // so Rollup can convert `ms` to an ES module
    commonjs(),
    // eslint
    eslint(),
    // minify, but only in production
    // https://www.npmjs.com/package/rollup-plugin-uglify
    isProduction && uglify({
      // 去掉所有的console.log()
      // compress: {
      //   drop_console: true
      // },
      output: {
        // 保留*!开头的注释
        comments: /^!/
      }
    })
  ]
}
