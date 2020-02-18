// const _ = require('lodash')
module.exports = (name, globalObject) => {
  try {
    const obj = global[globalObject]
    var value = _.get(obj, name)
  } catch (err) {
    return null
  }
  return typeof value !== 'undefined' ? value : null
}
