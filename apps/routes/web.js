const router = require('express').Router()
const loginController = require('../apps/controllers/admin/loginController')
const path = require('path')

router.use('/', require('./site'))

router
  .route('/login')
  .get(_middleware('checkLogin'), loginController.index)
  .post(loginController.login)

router.use('/admin', _middleware(['checkLogout', 'checkLevel']), require(path.join(__dirname, 'admin', 'index')))

router.use('/admin', require(path.join(__dirname, 'admin', 'index')))

module.exports = router
