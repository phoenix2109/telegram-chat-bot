
module.exports = {
  addSignal: async (collectionSignals, data) => {
    db.getDB().collection(collectionSignals).insertOne(data)
  },
  editSignal: (collectionSignals, signalId, data) => {
    db.getDB().collection(collectionSignals).findOneAndUpdate(
      { _id: _ObjectId(signalId) },
      {
        $set: data
      }
    )
  },
  deleteSignal: (collectionSignals, signalId) => {
    db.getDB().collection(collectionSignals).findOneAndDelete({ _id: _ObjectId(signalId) })
  },
  getSignal: (collectionSignals, signalId) => {
    return db.getDB().collection(collectionSignals).find({ _id: _ObjectId(signalId) }).toArray().then(results => {
      return results
    }).catch(err => {
      if (err) throw err
    })
  },
  getAllSignal: (collectionSignals) => {
    return db.getDB().collection(collectionSignals).find({}).toArray().then(results => {
      return results
    }).catch(err => {
      if (err) throw err
    })
  },
  getAllSource: (collectionSources) => {
    return db.getDB().collection(collectionSources).find({}).toArray().then(results => {
      return results
    }).catch(err => {
      if (err) throw err
    })
  },
  getSource: (collectionSources, tagSource) => {
    return db.getDB().collection(collectionSources).find({ tag: tagSource }).toArray().then(results => {
      return results[0]
    }).catch(err => {
      if (err) throw err
    })
  }
}
