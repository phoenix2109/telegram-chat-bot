// const productModel = require('../../models/site')
const moment = require('moment')
const siteModel = require('../../models/site/siteModel')

module.exports = {
  register: async (req, res) => {
    res.render('site/screens/register', {
      data: {

      }
    })
  },
  registerPost: async (req, res) => {
    const { account, name, phone, email, deposit } = req.body
    // console.log(req.body)
    const data = {
      account: account,
      name: name,
      phone: phone,
      email: email,
      status: 0,
      note: '',
      deposit: +deposit || 0,
      createAt: new Date(moment(new Date()).utcOffset(420).format('YYYY-MM-DD HH:mm')).toISOString(),
      modifyAt: ''
    }
    // console.log(data)
    siteModel.addCustomer(_config('database.collection.customer'), data)
    res.redirect('/')
  },
  helpcenter: async (req, res) => {
    res.render('site/screens/register', {
      data: {

      }
    })
  }
}
