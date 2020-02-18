const fs = require('fs')
const path = require('path')

const walkSync = dir => {
  const files = fs.readdirSync(dir)
  const filelist = []
  files.forEach(file => {
    if (fs.statSync(path.join(dir, file)).isFile()) {
      filelist.push(file.replace('.js', ''))
    }
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      const files = walkSync(path.join(dir, file))
      const obj = {}
      obj[file] = files
      filelist.push(obj)
    }
  })

  return filelist
}

module.exports = walkSync
