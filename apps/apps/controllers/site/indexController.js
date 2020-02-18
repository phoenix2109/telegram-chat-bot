// const productModel = require('../../models/site')

module.exports = {
  index: async (req, res) => {
    res.render('site/', {
      data: {
      }
    })
  }
}
