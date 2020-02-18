const router = require('express').Router()

// Index
router
  .get('/', _controller('site.indexController.index'))

// Register
router
  .get('/register', _controller('site.screensController.register'))
  .post('/register', _controller('site.screensController.registerPost'))

// Help Center
router
  .get('/help-center', _controller('site.screensController.helpcenter'))

// Alert
// router
//   .get('/alert', _controller('site.alertController.index'))
//   .post('/alert', _middleware('site.rawBody'), _controller('site.alertController.getAlert'))

module.exports = router
