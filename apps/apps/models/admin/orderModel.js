// const connection = require('../../../lib/connect');
module.exports = {
  // For Order
  addOrder: (data) => {
    connection.query('INSERT INTO orders SET ?', data, (error, results, fields) => {
      if (error) throw error
    })
  },
  editOrder: (id, fields) => {
    connection.query('UPDATE orders SET ? WHERE orderId = ?', [fields, id], (error, results, fields) => {
      if (error) throw error
    })
  },
  delOrder: (orderId) => {
    connection.query('DELETE FROM orders WHERE orderId = ? ', orderId, (error, results, fields) => {
      if (error) throw error
    })
  },
  // SELECT orders.*, product.productId, product.productName, product.prd_price FROM `orders`, product where product.productId=orders.orders_prdid
  getAllOrder: () => {
    const promise = new Promise((rs, rj) => {
      connection.query(
        // `SELECT orders.*, product.productName AS product_name, product.productImage AS product_image, product.price AS product_price, customer.customerAvatar AS customer_avatar, customer.customerMail as customer_mail, member.memberAvatar AS member_avatar
        // FROM orders, product, customer, member
        // WHERE product.productId = orders.product_id AND customer.customerId = orders.customerId AND member.memberId = orders.createdby`,
        `SELECT * FROM (SELECT * FROM (
                    SELECT * FROM orders LEFT JOIN (
                        SELECT product.productId as p_productId, product.productName as productName, product.productImage as productImage, product.productPrice as productPrice FROM product) as listProduct on orders.productId = listProduct.p_productId ) as productOrder LEFT JOIN (
                            SELECT customer.customerId as c_customerId, customer.customerMail as customerMail, customer.customerAvatar as customerAvatar, customer.customerLevel as customerLevel FROM customer) as listCustomer on productOrder.customerId = listCustomer.c_customerId) as customerProductOrder LEFT JOIN (
                                SELECT member.memberId as m_memberId, member.memberName as memberName, member.memberAvatar as memberAvatar FROM member) as listMember on customerProductOrder.memberId = listMember.m_memberId`,
        (error, results, fields) => {
          rs(results)
        }

      )
    })
    return promise
  },
  getCustomerOrder: (customerId) => {
    const promise = new Promise((rs, rj) => {
      connection.query(
        `SELECT * FROM (
                    SELECT * FROM orders where customerId = ?) as listOrder LEFT JOIN (
                        SELECT product.productId as p_productId, product.productName as productName, product.productImage as productImage, product.productPrice as productPrice from product) as listProduct on listOrder.productId = listProduct.p_productId`, customerId, (error, results, fields) => {
          rs(results)
        })
    })
    return promise
  },
  getOrder: (orderId) => {
    const promise = new Promise((rs, rj) => {
      connection.query('SELECT * FROM orders WHERE orderId = ?', orderId, (error, results, fields) => {
        rs(results)
      })
    })
    return promise
  }
}
