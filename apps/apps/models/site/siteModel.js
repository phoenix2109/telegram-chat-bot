
module.exports = {
  addCustomer: async (collectionCustomers, data) => {
    db.getDB().collection(collectionCustomers).insertOne(data)
  },
  editCustomer: (collectionCustomers, customerId, data) => {
    db.getDB().collection(collectionCustomers).findOneAndUpdate(
      { _id: _ObjectId(customerId) },
      {
        $set: data
      }
    )
  },
  deleteCustomer: (collectionCustomers, customerId) => {
    db.getDB().collection(collectionCustomers).findOneAndDelete({ _id: _ObjectId(customerId) })
  }
}
