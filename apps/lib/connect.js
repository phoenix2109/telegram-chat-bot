const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const dbname = _config('database.dbname')
const url = `${_config('database.host')}://${_config('database.user')}:${_config('database.pass')}@127.0.0.1:${_config('database.port')}`
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const state = {
  db: null
}

const connect = cb => {
  if (state.db) {
    cb()
  } else {
    MongoClient.connect(url, mongoOptions, (err, client) => {
      if (err) {
        cb(err)
      } else {
        state.db = client.db(dbname)
        cb()
      }
    })
  }
}

const getPrimaryKey = _id => {
  return ObjectID(_id)
}

const getDB = () => {
  return state.db
}

module.exports = { getDB, connect, getPrimaryKey }
