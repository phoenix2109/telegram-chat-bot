const moment = require('moment')
const signalModel = require('../../models/admin/signalModel')
const aggregationModel = require('../../models/admin/aggregationModel')

module.exports = {
  index: async (req, res) => {
    const query = req.query
    // console.log(query)
    let listSignal
    if (query.signal) {
      listSignal = await aggregationModel.getMatchAggregation(
        _config('database.collection.signals'),
        _config('database.collection.users'),
        'value.createdBy',
        'username',
        _config('database.collection.sources'),
        'value.source',
        'tag',
        { name: query.signal.toUpperCase() }
      )
    } else if (query.source) {
      listSignal = await aggregationModel.getMatchAggregation(
        _config('database.collection.signals'),
        _config('database.collection.users'),
        'value.createdBy',
        'username',
        _config('database.collection.sources'),
        'value.source',
        'tag',
        { 'value.source': query.source.toLowerCase() }
      )
    } else if (query['start-date'] && query['end-date']) {
      let startDate = moment(new Date(query['start-date']).setHours(0, 0, 0, 0)).toISOString()
      let endDate = moment(new Date(query['end-date']).setHours(23, 59, 59, 999)).toISOString()

      // console.log(startDate, endDate)

      listSignal = await aggregationModel.getMatchAggregation(
        _config('database.collection.signals'),
        _config('database.collection.users'),
        'value.createdBy',
        'username',
        _config('database.collection.sources'),
        'value.source',
        'tag',
        {
          'value.time': {
            $gte: startDate,
            $lt: endDate
          }
        }
      )
      // console.log(listSignal)
    } else {
      listSignal = await aggregationModel.getAggregation(
        _config('database.collection.signals'),
        _config('database.collection.users'),
        'value.createdBy',
        'username',
        _config('database.collection.sources'),
        'value.source',
        'tag'
      )
    }

    // console.log(listSignal)
    const resultPips = req.app.locals.resultPips
    const resultProfits = req.app.locals.resultProfits
    const diffTime = req.app.locals.diffTime
    const signalWin = listSignal.filter(x => x.value.res === 3).length
    const signalCompleted = listSignal.filter(x => x.value.status === 2).length
    const signalProfit = []
    if (listSignal.length) {
      for (x in listSignal) {
        switch (listSignal[x].value.res) {
          case 1:
            switch (listSignal[x].value.progress) {
              case 5:
                signalProfit.push((0 - resultPips(listSignal[x].name, listSignal[x].value.entry, listSignal[x].value.close)).toFixed(2))
                break
              default:
                signalProfit.push((0 - resultPips(listSignal[x].name, listSignal[x].value.entry, listSignal[x].value.sl)).toFixed(2))
            }
            break
          case 3:
            switch (listSignal[x].value.progress) {
              case 2:
                signalProfit.push(resultPips(listSignal[x].name, listSignal[x].value.entry, listSignal[x].value.tp1))
                break
              case 3:
                signalProfit.push(resultPips(listSignal[x].name, listSignal[x].value.entry, listSignal[x].value.tp2))
                break
              case 4:
                signalProfit.push(resultPips(listSignal[x].name, listSignal[x].value.entry, listSignal[x].value.tp3))
                break
              case 5:
                signalProfit.push(resultPips(listSignal[x].name, listSignal[x].value.entry, listSignal[x].value.close))
                break
              default:
                signalProfit.push(0)
            }
            break
          default:
            signalProfit.push(0)
        }
      }
    } else {
      signalProfit.push(0)
    }

    // console.log(signalProfit)
    // console.log(listSignal)
    res.render('admin/signal', {
      data: {
        listSignal: listSignal,
        resultPips: resultPips,
        resultProfits: resultProfits,
        diffTime: diffTime,
        signal: {
          signalName: 'Signal',
          signalWin: signalWin,
          signalCompleted: signalCompleted,
          signalProfit: signalProfit || [0]
        },
        date: {
          startDate: query['start-date'] || moment().startOf('year'),
          endDate: query['end-date'] || moment().endOf('year')
        }
      }
    })
  },
  addSignal: async (req, res) => {
    const listSource = await signalModel.getAllSignal(_config('database.collection.sources'))
    res.render('admin/signal/add-signal', {
      data: {
        listSource: listSource
      }
    })
  },
  postAddSignal: async (req, res) => {
    const { signalName, signalType, signalEntry, signalSL, signalTP1, signalTP2, signalTP3, signalStatus, signalProgress, signalResult, signalNote, signalSource } = req.body
    // console.log(req.body)
    const data = {
      name: signalName.toUpperCase(),
      value: {
        type: signalType,
        entry: signalEntry,
        sl: signalSL,
        tp: signalTP1,
        tp1: signalTP1,
        tp2: signalTP2 || 0,
        tp3: signalTP3 || 0,
        progress: parseInt(signalProgress) || 1,
        time: moment(new Date()).utcOffset(420).format('YYYY-MM-DD HH:mm'),
        status: parseInt(signalStatus),
        res: parseInt(signalResult),
        archived: parseInt(signalStatus) === 2,
        note: signalNote,
        source: signalSource,
        createdBy: req.user.username
      }
    }
    // console.log(data)
    if (await db.getDB().collection(_config('database.collection.signals')).find({ name: data.name, 'value.archived': false }).count() > 0 && data.value.archived === false) {
      req.flash('error', `Signal ${data.name} is existed. Please do not add duplicate signals`)
    } else {
      signalModel.addSignal(_config('database.collection.signals'), data)
      req.flash('success', `Add new signal ${data.name} successfully`)
    }
    res.redirect('/admin/signal')
  },
  editSignal: async (req, res) => {
    const signalId = req.params.signalId
    // console.log(signalId)
    const signalInfo = await signalModel.getSignal(_config('database.collection.signals'), signalId)
    const listSource = await signalModel.getAllSignal(_config('database.collection.sources'))
    // console.log(signalInfo)
    res.render('admin/signal/edit-signal', {
      data: {
        signalInfo: signalInfo,
        listSource: listSource
      }
    })
  },
  postEditSignal: async (req, res) => {
    const signalId = req.params.signalId
    const { signalType, signalEntry, signalSL, signalTP1, signalTP2, signalTP3, signalClose, signalTimeEnd, signalStatus, signalProgress, signalResult, signalNote, signalSource } = req.body
    // console.log(req.body)
    const data = {
      'value.entry': signalEntry,
      'value.type': signalType,
      'value.sl': signalSL,
      'value.tp': signalTP1,
      'value.tp1': signalTP1,
      'value.tp2': signalTP2,
      'value.tp3': signalTP3,
      'value.close': signalClose,
      'value.status': parseInt(signalStatus),
      'value.progress': parseInt(signalProgress),
      'value.res': parseInt(signalResult),
      'value.archived': parseInt(signalStatus) === 2,
      'value.note': signalNote === '' || signalNote === undefined ? 'No Note' : signalNote,
      'value.source': signalSource,
      'value.timeend': parseInt(signalStatus) === 2 ? new Date(moment(new Date()).utcOffset(420).format('YYYY-MM-DD HH:mm')).toISOString() : signalTimeEnd
    }
    signalModel.editSignal(_config('database.collection.signals'), signalId, data)
    req.flash('success', `Edit signal successfully`)
    // console.log(signalId)
    // console.log(req.body)
    res.redirect('/admin/signal')
  },
  deleteSignal: async (req, res) => {
    const signalId = req.params.signalId
    signalModel.deleteSignal(_config('database.collection.signals'), signalId)
    req.flash('success', 'Delete signal successfully')
    res.redirect('/admin/signal')
  },
  test: async (req, res) => {
    // signalModel.deleteSignal(_config('database.collection.signals'), signalId)
    // req.flash('success', 'Delete signal successfully')

    const signals = await db.getDB()
      .collection(_config('database.collection.signals'))
      .find({})
      .toArray()
      .then(items => {
        for (i in items) {
          delete items[i]._id
        }
        return items
      })
      .catch(err => {
        if (err) throw err
      })
    // console.log(signals)
    console.log(moment('2019-10-09T15:28:00.000Z').format('YYYY-MM-DD HH:mm'))
    // console.log(moment(new Date()).utcOffset(420))
    // console.log(new Date(moment(new Date()).utcOffset(420).format('YYYY-MM-DD HH:mm')).toISOString())
    // console.log(moment(new Date()).utcOffset(420).toISOString())
    // console.log(moment(new Date()).utcOffset(420).format('YYYY-MM-DD HH:mm').toISOString())
    res.json(signals)
  }
}
