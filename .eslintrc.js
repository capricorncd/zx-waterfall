/**
 * Created by Capricorncd.
 * Date: 2019/02/19 20:18
 * https://github.com/capricorncd
 */
module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: 'eslint:recommended',
  globals: {
    Promise: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
}
