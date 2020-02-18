module.exports = {
  //* For Member
  getAllMember: (collectionMember) => {
    return db.getDB().collection(collectionMember).find({}, { pass: 0 }).toArray().then(results => {
      return results.map(items => {
        delete items.pass
        return items
      })
    }).catch(err => {
      if (err) throw err
    })
  },
  getMember: (collectionMember, memberId) => {
    return db.getDB().collection(collectionMember).find({ _id: _ObjectId(memberId) }).toArray().then(results => {
      return results.map(items => {
        delete items.pass
        return items
      })
    }).catch(err => {
      if (err) throw err
    })
  },
  editMember: (collectionMember, memberId, data) => {
    db.getDB().collection(collectionMember).findOneAndUpdate(
      { _id: _ObjectId(memberId) },
      {
        $set: data
      }
    )
  },
  addMember: (collectionMember, data) => {
    db.getDB().collection(collectionMember).insertOne(data)
  },
  deleteMember: (collectionMember, memberId) => {
    db.getDB().collection(collectionMember).findOneAndDelete({ _id: _ObjectId(memberId) })
  },
  getOldPassword: (collectionMember, memberId) => {
    db.getDB().collection(collectionMember).find({ _id: _ObjectId(memberId) }).toArray().then(results => {
      return results[0].pass
    }).catch(err => {
      if (err) throw err
    })
  },
  isEmailUnique: async (collectionMember, memberMail) => {
    return await db.getDB().collection(collectionMember).find({ email: memberMail }).count() === 0
  },
  isUsernameUnique: async (collectionMember, memberUsername) => {
    return await db.getDB().collection(collectionMember).find({ username: memberUsername }).count() === 0
  },
  changePassword: async (collectionMember, memberId, data) => {
    db.getDB().collection(collectionMember).findOneAndUpdate(
      { _id: _ObjectId(memberId) },
      {
        $set: data
      }
    )
  },
  //* For Customer
  getAllCustomer: (collectionCustomer) => {
    return db.getDB().collection(collectionCustomer).find({}, { pass: 0 }).toArray().then(results => {
      return results.map(items => {
        delete items.pass
        return items
      })
    }).catch(err => {
      if (err) throw err
    })
  },
  getCustomer: (collectionCustomer, customerId) => {
    return db.getDB().collection(collectionCustomer).find({ _id: _ObjectId(customerId) }).toArray().then(results => {
      return results.map(items => {
        delete items.pass
        return items
      })
    }).catch(err => {
      if (err) throw err
    })
  },
  editCustomer: (collectionCustomer, customerId, data) => {
    db.getDB().collection(collectionCustomer).findOneAndUpdate(
      { _id: _ObjectId(customerId) },
      {
        $set: data
      }
    )
  },
  addCustomer: (collectionCustomer, data) => {
    db.getDB().collection(collectionCustomer).insertOne(data)
  },
  deleteCustomer: (collectionCustomer, customerId) => {
    db.getDB().collection(collectionCustomer).findOneAndDelete({ _id: _ObjectId(customerId) })
  }
}
