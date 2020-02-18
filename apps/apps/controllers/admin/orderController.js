const orderModel = require('../../models/admin/orderModel')
const userModel = require('../../models/admin/userModel')
const signalModel = require('../../models/admin/signalModel')
// console.log(orderModel);
module.exports = {
  // Order
  index: async (req, res) => {
    // console.log(req.user);
    // console.log(orderModel);
    const listOrder = await orderModel.getAllOrder()
    // console.log(listOrder);
    res.render('admin/order', {
      data: {
        listOrder: listOrder
      }
    })
  },
  addOrder: async (req, res) => {
    const customerProfile = await userModel.getCustomerProfile()
    const productOrder = await signalModel.getOrderProduct()
    // console.log(productOrder);
    // console.log(customerProfile);
    res.render('admin/order/add-order', {
      data: {
        customerProfile: customerProfile,
        productOrder: productOrder
      }
    })
  },
  postAddOrder: (req, res) => {
    const { customerProfile, productOrder, orderLink, orderStatus, orderProductStatus, orderShipStatus } = req.body
    // console.log(req.user);
    // console.log(req.body);
    const data = {
      customerId: parseInt(customerProfile),
      productId: parseInt(productOrder),
      orderLink: orderLink,
      orderStatus: parseInt(orderStatus),
      orderProductStatus: parseInt(orderProductStatus),
      orderShipStatus: parseInt(orderShipStatus),
      memberId: req.user.memberId,
      orderDate: formatDate(new Date())
    }
    orderModel.addOrder(data)
    req.flash('success', 'Add new order successfully')
    res.redirect('/admin/order')
  },
  editOrder: async (req, res) => {
    const orderId = req.params.orderId
    const order = await orderModel.getOrder(orderId)
    const customerProfile = await userModel.getCustomerProfile()
    const productOrder = await signalModel.getOrderProduct()
    console.log(order)

    res.render('admin/order/edit-order', {
      data: {
        order: order,
        customerProfile: customerProfile,
        productOrder: productOrder
      }
    })
  },
  postEditOrder: (req, res) => {
    const orderId = req.params.orderId
    const { customerProfile, productOrder, orderLink, orderStatus, orderProductStatus, orderShipStatus } = req.body
    const data = {
      customerId: parseInt(customerProfile),
      productId: parseInt(productOrder),
      orderLink: orderLink,
      orderStatus: parseInt(orderStatus),
      orderProductStatus: parseInt(orderProductStatus),
      orderShipStatus: parseInt(orderShipStatus),
      memberId: req.user.memberId,
      orderDate: formatDate(new Date())
    }
    orderModel.editOrder(orderId, data)
    res.status(201).end()
  },
  deleteOrder: (req, res) => {
    const orderId = req.params.orderId
    orderModel.delOrder(orderId)
    res.redirect('/admin/order')
  }
}
