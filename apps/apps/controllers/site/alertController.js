const moment = require('moment')
const collectionSignals = _config('database.collection.signals')
const collectionUsers = _config('database.collection.users')
const collectionSources = _config('database.collection.sources')
const signalModel = require('../../models/admin/signalModel')
const bcrypt = require('bcrypt')

module.exports = {
  index: async (req, res) => {

  },
  getAlert: async (req, res) => {
    const action = req.query.action
    console.log(action)
    if (action === 'delete') {
      // db.getDB().collection(collectionSignals).deleteMany({})
      // db.getDB().collection(collectionSources).deleteMany({})
      // db.getDB().collection(collectionSignals).findOneAndDelete({ 'value.status': 4 })
      res.status(200).send('Delete Successfully')
    } else if (action === 'update') {
      // db.getDB().collection(collectionSignals).insertMany([
      //   {
      //     name: 'USDJPY',
      //     value:
      //     {
      //       type: 'sell',
      //       entry: '107.488',
      //       sl: '107.932',
      //       tp: '107.288',
      //       tp1: '107.288',
      //       tp2: '107.050',
      //       tp3: '106.800',
      //       progress: 3,
      //       time: '2019-09-16T15:59:07.000Z',
      //       status: 2,
      //       res: 3,
      //       archived: true,
      //       source: 'dinhchien',
      //       createdBy: 'hathaigup',
      //       close: '0',
      //       note: 'No Note',
      //       timeend: '2019-09-30 18:50'
      //     }
      //   },
      //   {
      //     name: 'GBPUSD',
      //     value:
      //     {
      //       type: 'buy',
      //       entry: '1.25033',
      //       sl: '1.24620',
      //       tp: '1.25300',
      //       tp1: '1.25300',
      //       tp2: '1.25620',
      //       tp3: '1.26200',
      //       progress: 5,
      //       time: '2019-09-16T16:00:21.000Z',
      //       status: 2,
      //       res: 3,
      //       archived: true,
      //       source: 'proforex',
      //       createdBy: 'hathaigup',
      //       close: '1.25520',
      //       note: 'No Note',
      //       timeend: '2019-09-26 17:30'
      //     }
      //   },
      //   {
      //     name: 'EURNZD',
      //     value:
      //     {
      //       type: 'buy',
      //       entry: '1.73889',
      //       sl: '1.73182',
      //       tp: '1.74080',
      //       tp1: '1.74080',
      //       tp2: '1.74500',
      //       tp3: '1.75230',
      //       progress: 1,
      //       time: '2019-09-16T16:01:57.000Z',
      //       status: 2,
      //       res: 2,
      //       archived: true,
      //       createdBy: 'hathaigup',
      //       close: '0',
      //       note: 'No Note',
      //       source: '',
      //       timeend: '2019-09-16 16:50'
      //     }
      //   }, {
      //     name: 'AUDUSD',
      //     value:
      //     {
      //       type: 'buy',
      //       entry: '0.6880',
      //       sl: '0.68318',
      //       tp: '0.69050',
      //       tp1: '0.69050',
      //       tp2: '0.69400',
      //       tp3: '0.69950',
      //       progress: 1,
      //       time: '2019-09-16T16:17:50.000Z',
      //       status: 2,
      //       res: 1,
      //       archived: true,
      //       createdBy: 'hathaigup',
      //       close: '0',
      //       note: 'No Note',
      //       source: 'ht',
      //       timeend: '2019-09-16 16:25'
      //     }
      //   },
      //   {
      //     name: 'GBPCHF',
      //     value:
      //     {
      //       type: 'buy',
      //       entry: '1.2323',
      //       sl: '1.22542',
      //       tp: '1.23430',
      //       tp1: '1.23430',
      //       tp2: '1.23650',
      //       tp3: '1.24200',
      //       progress: 1,
      //       time: '2019-09-16T17:18:28.000Z',
      //       status: 2,
      //       res: 2,
      //       archived: true,
      //       createdBy: 'hathaigup'
      //     }
      //   },
      //   {
      //     name: 'GBPCHF',
      //     value:
      //     {
      //       type: 'buy',
      //       entry: '1.2323',
      //       sl: '1.22542',
      //       tp: '1.23430',
      //       tp1: '1.23430',
      //       tp2: '1.23650',
      //       tp3: '1.24200',
      //       progress: 1,
      //       time: '2019-09-16T17:46:48.000Z',
      //       status: 2,
      //       res: 3,
      //       archived: true,
      //       createdBy: 'hadoan0811'
      //     }
      //   },
      //   {
      //     name: 'GBPCHF',
      //     value:
      //     {
      //       type: 'buy',
      //       entry: '1.2323',
      //       sl: '1.22542',
      //       tp: '1.23650',
      //       tp1: '1.23430',
      //       tp2: '1.23650',
      //       tp3: '1.24200',
      //       progress: 2,
      //       time: '2019-09-16T18:02:10.000Z',
      //       status: 2,
      //       res: 3,
      //       archived: true,
      //       createdBy: 'hadoan0811'
      //     }
      //   }, {
      //     name: 'GBPCHF',
      //     value:
      //     {
      //       type: 'buy',
      //       entry: '1.2323',
      //       sl: '1.22542',
      //       tp: '1.24200',
      //       tp1: '1.23430',
      //       tp2: '1.23650',
      //       tp3: '1.24200',
      //       progress: 3,
      //       time: '2019-09-16T20:59:37.000Z',
      //       status: 2,
      //       res: 2,
      //       archived: true,
      //       createdBy: 'hadoan0811'
      //     }
      //   },
      //   {
      //     name: 'EURNZD',
      //     value:
      //     {
      //       type: 'buy',
      //       entry: '1.73889',
      //       sl: '1.73182',
      //       tp: '1.74080',
      //       tp1: '1.74080',
      //       tp2: '1.74500',
      //       tp3: '1.75230',
      //       progress: 2,
      //       time: '2019-09-17T12:49:11.000Z',
      //       status: 2,
      //       res: 3,
      //       archived: true,
      //       createdBy: 'boiboiii',
      //       close: '0',
      //       note: 'No Note',
      //       source: ''
      //     }
      //   },
      //   {
      //     name: 'GBPCAD',
      //     value:
      //     {
      //       type: 'buy',
      //       entry: '1.64330',
      //       sl: '1.63612',
      //       tp: '1.64620',
      //       tp1: '1.64620',
      //       tp2: '1.64950',
      //       tp3: '1.656',
      //       progress: 4,
      //       time: '2019-09-17T16:32:35.000Z',
      //       status: 2,
      //       res: 3,
      //       archived: true,
      //       createdBy: 'boiboiii'
      //     }
      //   },
      //   {
      //     name: 'EURGBP',
      //     value:
      //     {
      //       type: 'sell',
      //       entry: '0.88385',
      //       sl: '0.88943',
      //       tp: '0.88100',
      //       tp1: '0.88100',
      //       tp2: '0.87700',
      //       tp3: '0.87300',
      //       progress: 1,
      //       time: '2019-09-18T14:38:30.000Z',
      //       status: 1,
      //       res: 2,
      //       archived: false,
      //       createdBy: 'dug_nguyen'
      //     }
      //   }
      // ])
      res.status(200).send('Update Successfully')
    } else if (action === 'test') {
      // console.log(moment(new Date().setHours(0, 0, 0, 0)).toISOString())
      // console.log(moment(new Date().setHours(23, 59, 59, 999)).toISOString())
      const signals = db.getDB().collection(collectionSignals).find(
        {
          // 'value.time': {
          //   $gte: moment(new Date('2019-09-17').setHours(0, 0, 0, 0)).toISOString(),
          //   $lt: moment(new Date('2019-09-17').setHours(23, 59, 59, 999)).toISOString()
          // }
        }
      ).toArray().then(items => {
        return items
      }).catch(err => {
        if (err) throw err
      })
      console.log(signals[0])
      // const result = db.getDB().collection(collectionSignals).aggregate([
      //   {
      //     $dateFromString: {
      //       dateString: 'value.time'
      //     }
      //   }
      // ]).toArray().then(items => {
      //   return items
      // }).catch(err => {
      //   if (err) throw err
      // })
      // console.log(await signals)
      // console.log(await result)
      // console.log(await db.getDB().collection(collectionSignals).find({ 'value.type': 'BUY' }).count())
      // console.log(await db.getDB().collection(collectionSignals).find({ 'value.type': 'SELL' }).count())
      // console.log(await resultProfits(30, ['ht', 0.1]))
      res.status(200).send('Test Successfully')
    } else {
      const mess = req.body
      // Assign Value
      let [name, type, value] = mess.trim().split` `
      const data = db.getDB().collection(collectionSignals)

      name = name.toUpperCase()

      // Check Condition
      const dbCurrent = await data.find({ name: name, 'value.archived': false }).count()
      const dbActive = await data.find({ name: name, 'value.status': 3, 'value.archived': false }).count()
      const dbProgress1 = await data.find({ name: name, 'value.status': 3, 'value.progress': 1, 'value.archived': false }).count()
      const dbProgress2 = await data.find({ name: name, 'value.status': 3, 'value.progress': 2, 'value.archived': false }).count()
      const dbProgress3 = await data.find({ name: name, 'value.status': 3, 'value.progress': 3, 'value.archived': false }).count()
      const dbInActive = await data.find({ name: name, 'value.status': 1, 'value.archived': false }).count()

      // Template
      let template
      let adminTemplate

      if (type.toUpperCase() === 'TP' || type.toUpperCase() === 'SL') {
        let typeText, typeIcon, result, progress
        if (type.toUpperCase() === 'TP') {
          typeText = 'Take Profit'
          typeIcon = '✅'
          result = 3
        } else {
          typeText = 'Stop Loss'
          typeIcon = '❌'
          template =
            `${typeIcon} ${name} đã chạm mốc ${typeText}: ${value} ${typeIcon}
Xin chia buồn cùng các anh em đã theo kèo này 😭😭`
          result = 1
        }

        if (dbActive) {
          if (type.toUpperCase() === 'SL') {
            adminTemplate =
              `${typeIcon} ${name} đã chạm mốc ${typeText}: ${value} ${typeIcon}
Kèo này sẽ được chuyển sang dạng archived
👉 Nếu muốn tiếp tục theo kèo này, xin vui lòng set lại kèo trên Bot và TradingView 👈`

            data.findOneAndUpdate(
              { name: name, 'value.status': 3, 'value.archived': false },
              {
                $set: {
                  'value.status': 2,
                  'value.archived': true,
                  'value.res': result,
                  'value.progress': 0,
                  'value.timeend': new Date(moment(new Date()).utcOffset(420).format('YYYY-MM-DD HH:mm')).toISOString()
                }
              }
            )

            if (dbProgress2 || dbProgress3) {
              _bot.telegram.sendMessage(_config('app.adminChannel'), adminTemplate)
              _bot.telegram.sendMessage(_config('app.followChannel'), adminTemplate)
            } else {
              _bot.telegram.sendMessage(_config('app.gupChannel'), template)
              _bot.telegram.sendMessage(_config('app.adminChannel'), adminTemplate)
              _bot.telegram.sendMessage(_config('app.followChannel'), adminTemplate)
            }
          } else {
            let progressText
            if (dbProgress1) {
              progress = 1
              progressText = `Mốc ${typeText} 2 sẽ được kích hoạt \n👉 Nếu muốn nâng mức Stop Loss cho kèo, xin vui lòng set lại alert trên TradingView 👈`
              template =
                `${typeIcon} ${name} đã chạm mốc ${typeText} 1: ${value} ${typeIcon}
Anh em nên kéo SL lên mức Entry để đảm bảo an toàn
Xin chúc mừng tất cả anh em đã theo kèo này 😘😘`
            } else if (dbProgress2) {
              progress = 2
              progressText = `Mốc ${typeText} 3 sẽ được kích hoạt \n👉 Nếu muốn nâng mức Stop Loss cho kèo, xin vui lòng set lại alert trên TradingView 👈`
              template =
                `${typeIcon} ${name} đã chạm mốc ${typeText} 2: ${value} ${typeIcon}
Anh em nên kéo SL lên mức TP1 để đảm bảo an toàn
Xin chúc mừng tất cả anh em đã theo kèo này 😘😘`
            } else if (dbProgress3) {
              progress = 3
              progressText = `✅ Xin chúc mừng, kèo ${name} đã chạm cả 3 mốc Take Profit.\nChúc mừng anh em đã theo kèo này ✅`
              template =
                `${typeIcon} ${name} đã chạm mốc ${typeText} 3: ${value} ${typeIcon}
✅ Xin chúc mừng, kèo ${name} đã chạm cả 3 mốc Take Profit ✅
🎉 Chúc mừng anh em đã theo kèo này 🎉 😘😘`
            }

            data.findOneAndUpdate(
              { name: name, 'value.status': 3, 'value.progress': progress, 'value.archived': false },
              {
                $set: {
                  'value.progress': parseInt(progress + 1),
                  'value.archived': progress === 3,
                  'value.status': progress === 3 ? 2 : 3,
                  'value.res': progress === 3 ? 3 : 2,
                  'value.timeend': new Date(moment(new Date()).utcOffset(420).format('YYYY-MM-DD HH:mm')).toISOString()
                }
              }
            )

            adminTemplate =
              `${typeIcon} ${name} đã chạm mốc ${typeText} ${progress}: ${value} ${typeIcon}
Kèo này sẽ được chuyển sang dạng archived
${progressText}`

            _bot.telegram.sendMessage(_config('app.gupChannel'), template)
            _bot.telegram.sendMessage(_config('app.adminChannel'), adminTemplate)
            _bot.telegram.sendMessage(_config('app.followChannel'), adminTemplate)
          }
        } else if (dbInActive) {
          adminTemplate =
            `😡 ${name} đã chạm mốc ${typeText}: ${value} 😡
Mỗi tội nó méo thèm chạm Entry mà chạm thẳng ${typeText} mới tài :)).
👉 Vào TradingView và Bot Telegram set lại kèo đi 👈`

          data.findOneAndUpdate(
            { name: name, 'value.status': 1, 'value.archived': false },
            {
              $set: {
                'value.status': 2,
                'value.archived': true,
                'value.res': 2,
                'value.timeend': new Date(moment(new Date()).utcOffset(420).format('YYYY-MM-DD HH:mm')).toISOString()
              }
            }
          )

          _bot.telegram.sendMessage(_config('app.adminChannel'), adminTemplate)
          _bot.telegram.sendMessage(_config('app.followChannel'), adminTemplate)
        } else {
          if (!dbCurrent) {
            adminTemplate =
              `😡 ${name} đã chạm mốc ${typeText}: ${value} 😡
Nhưng kèo này chưa được setup nên chưa có dữ liệu.
👉 Thằng nào chưa set up kèo này trên Telegram đấy. Tự kiểm điểm lại nhé 👈`

            _bot.telegram.sendMessage(_config('app.adminChannel'), adminTemplate)
            _bot.telegram.sendMessage(_config('app.followChannel'), adminTemplate)
          }
        }
      } else if (type.toUpperCase().includes('BUY') || type.toUpperCase().includes('SELL')) {
        let typeText

        if (type.toUpperCase() === 'BUY') {
          typeText = 'BUY'
        } else {
          typeText = 'SELL'
        }

        if (dbInActive) {
          adminTemplate =
            `👌 Đã đến điểm ${typeText} ${name} với giá hiện tại ${value} 👌
👉 Kèo đã chạm Entry thành công, chuyển status sang active 👈`
          template =
            `👌 Đã đến điểm ${typeText} ${name} với giá hiện tại ${value} 👌
👉 Anh em nào theo kèo này chú ý !!! 👈`

          data.findOneAndUpdate(
            { name: name, 'value.status': 1, 'value.archived': false },
            {
              $set: { 'value.status': 3 }
            }
          )

          _bot.telegram.sendMessage(_config('app.gupChannel'), template)
          _bot.telegram.sendMessage(_config('app.adminChannel'), adminTemplate)
          _bot.telegram.sendMessage(_config('app.followChannel'), adminTemplate)
        } else if (dbActive) {
          adminTemplate =
            `😡 Đã đến điểm BUY ${name} với giá hiện tại ${value} 😡
Kèo này set Alert trên TradingView r lại còn set lại lần 2 làm gì thế`

          _bot.telegram.sendMessage(_config('app.adminChannel'), adminTemplate)
          _bot.telegram.sendMessage(_config('app.followChannel'), adminTemplate)
        } else if (!dbCurrent) {
          adminTemplate =
            `😡 Đã đến điểm BUY ${name} với giá hiện tại ${value} 😡
Nhưng mỗi tội thằng nào tắc trách chưa set kèo này trên Telegram đấy.`

          _bot.telegram.sendMessage(_config('app.adminChannel'), adminTemplate)
          _bot.telegram.sendMessage(_config('app.followChannel'), adminTemplate)
        }
      } else if (type.toUpperCase() === 'CLOSE') {
        data.findOneAndUpdate(
          { name: name, 'value.status': 3, 'value.archived': false },
          {
            $set: {
              'value.archived': true,
              'value.status': 2,
              'value.res': 3,
              'value.progress': 5,
              'value.close': value,
              'value.timeend': new Date(moment(new Date()).utcOffset(420).format('YYYY-MM-DD HH:mm')).toISOString()
            }
          }
        )
        template =
          `⚠️ ${name} đã chạm mốc close: ${value} ⚠️
Xin chia buồn cùng anh em đã không cắt sớm kèo này`

        adminTemplate =
          `⚠️ ${name} đã chạm mốc close: ${value} ⚠️
Kèo này sẽ được chuyển sang dạng archived
Xin chia buồn cùng anh em đã không cắt sớm kèo này`

        _bot.telegram.sendMessage(_config('app.gupChannel'), template)
        _bot.telegram.sendMessage(_config('app.adminChannel'), adminTemplate)
        _bot.telegram.sendMessage(_config('app.followChannel'), adminTemplate)
      } else if (type.toUpperCase() === 'DRAW') {
        if (dbProgress1) {
          data.findOneAndUpdate(
            { name: name, 'value.status': 3, 'value.archived': false },
            {
              $set: {
                'value.archived': true,
                'value.status': 2,
                'value.res': 4,
                'value.timeend': new Date(moment(new Date()).utcOffset(420).format('YYYY-MM-DD HH:mm')).toISOString()
              }
            }
          )
          template =
            `⚠️ ${name} đã chạm mốc draw: ${value} ⚠️
Kèo hoà, xin chia buồn cùng anh em đã không cắt sớm kèo này`

          adminTemplate =
            `⚠️ ${name} đã chạm mốc draw: ${value} ⚠️
Kèo này sẽ được chuyển sang dạng archived
Kèo hoà, xin chia buồn cùng anh em đã không cắt sớm kèo này`
        } else if (dbProgress2) {
          data.findOneAndUpdate(
            { name: name, 'value.status': 3, 'value.archived': false },
            {
              $set: {
                'value.archived': true,
                'value.status': 2,
                'value.res': 3,
                'value.timeend': new Date(moment(new Date()).utcOffset(420).format('YYYY-MM-DD HH:mm')).toISOString()
              }
            }
          )
          template =
            `⚠️ ${name} đã chạm mốc draw: ${value} ⚠️
Kèo win TP1, xin chia buồn cùng anh em đã không cắt sớm kèo này`

          adminTemplate =
            `⚠️ ${name} đã chạm mốc draw: ${value} ⚠️
Kèo này sẽ được chuyển sang dạng archived
Kèo win TP1, xin chia buồn cùng anh em đã không cắt sớm kèo này`
        }
        _bot.telegram.sendMessage(_config('app.gupChannel'), template)
        _bot.telegram.sendMessage(_config('app.adminChannel'), adminTemplate)
        _bot.telegram.sendMessage(_config('app.followChannel'), adminTemplate)
      }
      res.status(200).send('Update Successfully')
    }
  }
}
