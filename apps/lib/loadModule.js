const path = require('path')
const fs = require('fs')

const loadModule = (dir, data, source = {}) => {
  if (Array.isArray(data)) {
    data.forEach(file => {
      loadModule(dir, file, source)
    })
  }
  if (!Array.isArray(data)) {
    if (typeof data === 'string') {
      const filePath = path.join(dir, data + '.js')
      if (fs.existsSync(filePath)) {
        source[data] = require(filePath)
      }
    }
    if (typeof data === 'object') {
      for (const key in data) {
        const newDir = path.join(dir, key)
        source[key] = {}
        loadModule(newDir, data[key], source[key])
      }
    }
  }
  return source
}

module.exports = loadModule
