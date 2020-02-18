const multer = require('multer')

const storageProduct = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __basepath + '/public/images/product')
  },
  filename: function (req, file, cb) {
    const ogName = file.originalname
    // cb(null, ogName.substring(0,ogName.lastIndexOf('.')) + '-' + Date.now() + ogName.substring(ogName.lastIndexOf('.') ))
    cb(null, ogName)
  }
})

const storageAvatar = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __basepath + '/public/images/avatar')
  },
  filename: function (req, file, cb) {
    const ogName = file.originalname
    const newName = ogName.substring(0, ogName.lastIndexOf('.')) + '-' + Date.now() + ogName.substring(ogName.lastIndexOf('.'))
    cb(null, newName)
  }
})

const previewAvatar = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __basepath + '/public/images/avatar')
  }
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
})

global.uploadImage = multer({ storage: storageProduct })
global.uploadAvatar = multer({ storage: storageAvatar })
global.previewAvatar = multer({ storage: previewAvatar })
