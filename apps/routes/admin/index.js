const router = require('express').Router()

// Index
router
  .get('/', _controller('admin.indexController.index'))

// Signal
router
  .get('/signal', _controller('admin.signalController.index'))

router
  .get('/signal/add-signal', _controller('admin.signalController.addSignal'))
  .post('/signal/add-signal', _controller('admin.signalController.postAddSignal'))

router
  .get('/signal/edit-signal/:signalId', _controller('admin.signalController.editSignal'))
  .post('/signal/edit-signal/:signalId', _controller('admin.signalController.postEditSignal'))

router
  .get('/signal/delete-signal/:signalId', _controller('admin.signalController.deleteSignal'))

// Member
router
  .get('/member', _controller('admin.userController.member'))

router
  .get('/member/profile', _controller('admin.userController.memberProfile'))
  .post('/member/profile', _controller('admin.userController.editMemberProfile'))

router
  .get('/member/profile/:memberId', _controller('admin.userController.memberProfile'))
  .post('/member/profile/:memberId', _controller('admin.userController.editMemberProfile'))

router
  .get('/member/edit-member/:memberId', _controller('admin.userController.editMember'))
  .post('/member/edit-member/:memberId', _controller('admin.userController.postEditMember'))

router
  .get('/member/add-member', _controller('admin.userController.addMember'))
  .post('/member/add-member', _controller('admin.userController.postAddMember'))

router
  .get('/member/delete-member/:memberId', _controller('admin.userController.deleteMember'))

router
  .get('/test', _controller('admin.signalController.test'))

// // Time Sheet
// router
//   .get('/timesheet', _controller('admin.timesheetController.index'))

// router
//   .get('/timesheet/add-timesheet', _controller('admin.timesheetController.addTimesheet'))
//   .post('/timesheet/add-timesheet', _controller('admin.timesheetController.postAddTimesheet'))

// router
//   .get('/timesheet/edit-timesheet/:timesheetId', _controller('admin.timesheetController.editTimesheet'))
//   .post('/timesheet/edit-timesheet/:timesheetId', _controller('admin.timesheetController.postEditTimesheet'))

// router
//   .get('/timesheet/delete-timesheet/:timesheetId', _controller('admin.timesheetController.deleteTimesheet'))

// // Order
// router
//   .get('/order', _controller('admin.orderController.index'))

// router
//   .get('/order/add-order', _controller('admin.orderController.addOrder'))
//   .post('/order/add-order', _controller('admin.orderController.postAddOrder'))

// router
//   .get('/order/edit-order/:orderId', _controller('admin.orderController.editOrder'))
//   .post('/order/edit-order/:orderId', _controller('admin.orderController.postEditOrder'))

// router
//   .get('/order/delete-order/:orderId', _controller('admin.orderController.deleteOrder'))

// // Product
// router
//   .get('/product', _controller('admin.productController.index'))

// router
//   .get('/product/add-product', _controller('admin.productController.addProduct'))
//   .post('/product/add-product', _controller('admin.productController.postAddProduct'))

// router
//   .get('/product/edit-product/:productId', _controller('admin.productController.editProduct'))
//   .post('/product/edit-product/:productId', _controller('admin.productController.postEditProduct'))

// router
//   .get('/product/delete-product/:productId', _controller('admin.productController.deleteProduct'))

// // Member
// router
//   .get('/member', _controller('admin.userController.member'))

// router
//   .get('/member/profile', _controller('admin.userController.memberProfile'))
//   .post('/member/profile', _controller('admin.userController.editMemberProfile'))

// router
//   .get('/member/profile/:memberId', _controller('admin.userController.memberProfile'))
//   .post('/member/profile/:memberId', _controller('admin.userController.editMemberProfile'))

// Customer
router
  .get('/customer', _controller('admin.userController.customer'))
  .post('/customer/edit-customer')

router
  .get('/customer/edit-customer/:customerId', _controller('admin.userController.editCustomer'))
  .post('/customer/edit-customer/:customerId', _controller('admin.userController.postEditCustomer'))

router
  .get('/customer/add-customer', _controller('admin.userController.addCustomer'))
  .post('/customer/add-customer', _controller('admin.userController.postAddCustomer'))

router
  .get('/customer/delete-customer/:customerId', _controller('admin.userController.deleteCustomer'))

// // Todo-ist
// router
//   .get('/todo', _controller('admin.todoController.index'))

// Logout
router
  .get('/logout', _controller('admin.indexController.logOut'))

module.exports = router
