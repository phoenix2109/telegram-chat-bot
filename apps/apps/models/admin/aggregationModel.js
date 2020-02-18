module.exports = {
  // For Member
  getAggregation: (collectionLocal, collectionForeign1, localField1, foreignField1, collectionForeign2, localField2, foreignField2) => {
    return db.getDB()
      .collection(collectionLocal)
      .aggregate([
        {
          $lookup: {
            from: collectionForeign1,
            localField: localField1,
            foreignField: foreignField1,
            as: 'userInfo'
          }
        },
        {
          $unwind: '$userInfo'
        },
        {
          $lookup: {
            from: collectionForeign2,
            localField: localField2,
            foreignField: foreignField2,
            as: 'sourceInfo'
          }
        }
      ]).toArray().then(results => {
        return results.map(items => {
          if (items.userInfo !== undefined || items.userInfo !== null) {
            delete items.userInfo.pass
          } else {
            items.userInfo = {}
          }

          if (items.sourceInfo === undefined || items.sourceInfo === null) {
            items.sourceInfo = {}
          }
          return items
        })
      }).catch(err => {
        if (err) throw err
      })
  },
  getMatchAggregation: (collectionLocal, collectionForeign1, localField1, foreignField1, collectionForeign2, localField2, foreignField2, matchProps) => {
    return db.getDB()
      .collection(collectionLocal)
      .aggregate([
        {
          $match: matchProps
        },
        {
          $lookup: {
            from: collectionForeign1,
            localField: localField1,
            foreignField: foreignField1,
            as: 'userInfo'
          }
        },
        {
          $unwind: '$userInfo'
        },
        {
          $lookup: {
            from: collectionForeign2,
            localField: localField2,
            foreignField: foreignField2,
            as: 'sourceInfo'
          }
        }
      ]).toArray().then(results => {
        return results.map(items => {
          if (items.userInfo !== undefined || items.userInfo !== null) {
            delete items.userInfo.pass
          } else {
            items.userInfo = {}
          }

          if (items.sourceInfo === undefined || items.sourceInfo === null) {
            items.sourceInfo = {}
          }
          return items
        })
      }).catch(err => {
        if (err) throw err
      })
  },
  getFilterDate: (collectionLocal, collectionForeign1, localField1, foreignField1, collectionForeign2, localField2, foreignField2, matchProps) => {
    return db.getDB()
      .collection(collectionLocal)
      .aggregate([
        {
          $match: matchProps
        },
        {
          $lookup: {
            from: collectionForeign1,
            localField: localField1,
            foreignField: foreignField1,
            as: 'userInfo'
          }
        },
        {
          $unwind: '$userInfo'
        },
        {
          $lookup: {
            from: collectionForeign2,
            localField: localField2,
            foreignField: foreignField2,
            as: 'sourceInfo'
          }
        }
      ]).toArray().then(results => {
        return results.map(items => {
          if (items.userInfo !== undefined || items.userInfo !== null) {
            delete items.userInfo.pass
          } else {
            items.userInfo = {}
          }

          if (items.sourceInfo === undefined || items.sourceInfo === null) {
            items.sourceInfo = {}
          }
          return items
        })
      }).catch(err => {
        if (err) throw err
      })
  }
}
