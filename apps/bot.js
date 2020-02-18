const Telegraf = require('telegraf')
// Trang Bot
// global._bot = new Telegraf('856883971:AAE4FbB4CmhX6RYhjlDWcBw8kpfx8y9iyZU')

// GupCapital Bot
// global._bot = new Telegraf('752173544:AAGhAlhSEclqc3xpP-rEEyWXzISsv8HKGNk')

// Minh Anh Bot
global._bot = new Telegraf('906464650:AAFdwCKHbfxXjkN4f_LldARbHVVb045LaLo')

const ForgeClient = require('forex-quotes').default
const client = new ForgeClient('ARd6BPCkZjEMlc18acL3ilmg73h3qHJT')

const moment = require('moment')
const fs = require('fs')

const Pageres = require('pageres')

const adminWhiteList = _config('app.adminWhiteList')
const memberWhiteList = _config('app.memberWhiteList')
const sourceSignal = _config('app.sourceSignal')

const collectionSignals = _config('database.collection.signals');

// Pageres
(async () => {
  client.getSymbols().then(response => {
    // return response;
    const res = response
    _bot.on('text', (ctx) => {
      const text = ctx.message.text
      let command, sym, interval
      if (text.includes('/')) {
        sym = text.split`-`[0]
        interval = text.split`-`[1] || 15
        if (sym.length === 7) {
          command = sym.substring(1).toUpperCase()
          if (res.includes(command)) {
            client.getQuotes(command).then(response => {
              const result = response[0]
              const template = `${result.symbol.substring(0, 3)}/${result.symbol.substring(3)} \nPrice: ${result.price}`;

              (async () => {
                await new Pageres({ delay: 0, filename: '/charts/chart' })
                  .src('https://s.tradingview.com/widgetembed/?interval=' + (interval + '').toUpperCase() + '&symbol=' + result.symbol, ['980x610'], { crop: true })
                  .dest(__basepath)
                  .run()

                await ctx.reply(template)
                await ctx.replyWithPhoto({ source: fs.createReadStream('./charts/chart.png') })
                // await ctx.reply("Screenshot at "+ moment(new Date()).utcOffset(420).format("YYYY-MM-DD HH:mm"));
              })()
            })
          } else {
            ctx.reply(
              `😅 Bạn đã nhập sai lệnh. 😅\nVui lòng nhập /help để được giúp đỡ`
            )
          }
        } else if (sym.length === 4) {
          command = res.filter(x => x.includes(sym.substring(1).toUpperCase() + 'USD'))
          // console.log(command);
          if (command[0] === undefined || command[0] === null) {
            ctx.reply(
              `😅 Bạn đã nhập sai lệnh. 😅\nVui lòng nhập /help để được giúp đỡ`
            )
          } else {
            client.getQuotes(command).then(response => {
              for (const i in response) {
                const result = response[i]
                const template = `${result.symbol.substring(0, 3)}/${result.symbol.substring(3)} \nPrice: ${result.price}`;

                (async () => {
                  await new Pageres({ delay: 0, filename: '/charts/chart' })
                    .src('https://s.tradingview.com/widgetembed/?interval=' + (interval + '').toUpperCase() + '&symbol=' + result.symbol, ['980x610'], { crop: true })
                    .dest(__basepath)
                    .run()

                  await ctx.reply(template)
                  await ctx.replyWithPhoto({ source: fs.createReadStream('./charts/chart.png') })
                  // await ctx.reply("Screenshot at "+ moment(new Date()).utcOffset(420).format("YYYY-MM-DD HH:mm"));
                })()
              }
            })
          }
        } else if (sym.includes('today') || sym.includes('tomorrow')) {
          // Nothing
        } else {
          ctx.reply(
            `😅 Bạn đã nhập sai lệnh. 😅\nVui lòng nhập /help để được giúp đỡ`
          )
        }
      } else {
        // Do Nothing
      }
    })
  })
})()

// Welcome Message
_bot.on('new_chat_members', ctx => {
  const newMembers = ctx.message.new_chat_members
  console.log(ctx.message.new_chat_members)
  for (const i in newMembers) {
    const first = newMembers[i].first_name || ''
    const last = newMembers[i].last_name || ''
    const name = first + ' ' + last
    const template =
      `Chào mừng ${name} đã đến với GUP Capital  🎉🎉
Nhập /help để nhận được sự giúp đỡ đặc biệt 😉
✅ Chúc bạn một ngày làm việc hiệu quả ✅`
    return ctx.reply(template)
  }
})

// Help Message
_bot.command('/help', ctx => {
  const template =
    `Xin chào GUPER 🎉🎉, dưới đây là hướng dẫn sử dụng cho bot GUP:

Để check giá của một cặp tiền tệ nào đó, nhập cú pháp /tên cặp , giá của cặp tiền đó sẽ hiện ra kèm theo chart 15 phút để anh em theo dõi.
  VD: /xauusd , /eurgbp.

Để đổi thời gian của chart, nhập cú pháp /(tên cặp)-(số phút).
  VD: /XAUUSD-60  sẽ hiện ra giá và chart của XAU theo khung 60 phút(1 giờ).
  VD: /XAUUSD-120  sẽ hiện ra giá và chart của XAU theo khung 120 phút(2 giờ).

Để xem các kèo trong channel, xin vui lòng nhập theo cú pháp dưới đây
  👉 /keo : Xem toàn bộ kèo Active và Inactive 👈
  👉 /keo-active: Xem toàn bộ kèo Active 👈
  👉 /keo-inactive: Xem toàn bộ kèo Inactive 👈

✅ Chúc anh em giao dịch thành công ✅`

  console.log(ctx.from.id)
  console.log(ctx.chat.id)
  return ctx.reply(template)
})

_bot.command('/helpadmin', ctx => {
  const template =
    `Xin chào GUPER Admin 🎉🎉, dưới đây là hướng dẫn sử dụng cho Bot GUP tại channel Admin:

  👉 */keo:* Xem toàn bộ kèo Active và Inactive 👈

  👉 */keo-active:* Xem toàn bộ kèo đang Active 👈

  👉 */keo-inactive:* Xem toàn bộ kèo Inactive 👈

  👉 */waitingkeo:* Xem toàn bộ kèo Waiting 👈

  👉 */xoakeo-tên kèo:* Xoá kèo (Xoá hoàn toàn kèo khỏi dữ liệu nên cần phải cẩn thận khi sử dụng kèo này -- chỉ 1 số admin được sử dụng lệnh này thôi)
  Ví dụ: */xoakeo-usdcad* hoặc */xoakeo-USDCAD* (chỉ xoá được những kèo xem ở lệnh /keo) 👈

  👉 */dungkeo-tên kèo:* Dừng 1 kèo đang ở trạng thái Active và Inactive -- Dùng khi muốn member cắt lệnh. Hoặc kèo này không khả thi thì dừng
  Sau khi dừng, nếu ở trạng thái active thì sẽ tính luôn số pips ăn hoặc mất dựa trên giá lúc Close so với TP và SL
  Ví dụ: */dungkeo-usdcad* hoặc */dungkeo-USDCAD* (chỉ dừng được những kèo xem ở lệnh /keo). Kèo này sẽ chuyển sang dạng archived để thống kê 👈

  👉 */luutru:* Xem toàn bộ kèo Archived (Đã được lưu trữ) -- Thường những kèo nào chạm TP, SL hoặc dùng lệnh /dungkeo sẽ được chuyển đến kèo Archived. Dùng để xem những kèo đã hoàn thành 👈

  👉 */setkeo tên kèo BUY/SELL-giá SL-giá TP1-giá TP2-giá TP3-giá:* Set kèo cho member
  Ví dụ: */setkeo XAUUSD BUY-1500 SL-1480 TP1-1520 TP2-1550 TP3-1600*
  Ví dụ: */setkeo EURJPY BUY-1500 SL-1480 TP1-1520 TP2-1550 TP3-1600* 
  Tương tự đối với BUY LIMIT/BUY STOP và SELL LIMIT/SELL STOP 
  Ví dụ: */setkeo XAUUSD BUYLIMIT-1500 SL-1480 TP1-1520 TP2-1550 TP3-1600*
  Ví dụ: */setkeo EURJPY BUYSTOP-1500 SL-1480 TP1-1520 TP2-1550 TP3-1600* 👈

  👉 */waiting tên kèo BUY/SELL-giá SL-giá TP1-giá TP2-giá TP3-giá:* Set kèo waiting
  Tương tự như */setkeo*
  Ví dụ: */waiting XAUUSD BUY-1500 SL-1480 TP1-1520 TP2-1550 TP3-1600*
  Ví dụ: */waiting EURJPY BUYSTOP-1500 SL-1480 TP1-1520 TP2-1550 TP3-1600* 👈

  👉 */sourcekeo tênkèo Source:* Note source cho từng kèo
  Command source kèo chuẩn là */sourcekeo tênkèo source*
  Ví dụ: /sourcekeo XAUUSD mcm
  Chỉ source được những kèo có trong command /keo. Các kèo # muốn source thì lên web admin 👈

  👉 */activekeo-tên kèo:* Active 1 kèo Inactive
  Ví dụ: */activekeo-usdcad* hoặc */activekeo-USDCAD* (chỉ active được những kèo xem ở lệnh /keo) 👈

  👉 */inactivekeo-tên kèo:* Inactive 1 kèo Active
  Ví dụ: */inactivekeo-usdcad* hoặc */inactivekeo-USDCAD* (chỉ inactive được những kèo xem ở lệnh /keo) 👈

  🎉 Website cho anh em check thống kê: http://35.241.119.78/admin hoặc http://gupcapital.com/login 🎉
  🎉 Acc: hathaigup/hathai 🎉

✅ Chúc anh em giao dịch thành công ✅`

  console.log(ctx.from.id)
  console.log(ctx.chat.id)
  return ctx.replyWithMarkdown(template)
})

_bot.command('start', ctx => {
  console.log(ctx.from.id)
  console.log(ctx.chat.id)
  return ctx.reply('Hey')
})

_bot.command('/keo', async ctx => {
  const text = ctx.message.text
  console.log(text)
  let data
  if (text === '/keo') {
    data = db.getDB().collection(collectionSignals).find({ 'value.status': { $ne: 4 }, 'value.archived': false })
  } else if (text === '/keo-active') {
    data = db.getDB().collection(collectionSignals).find({ 'value.status': 3, 'value.archived': false })
  } else if (text === '/keo-inactive') {
    data = db.getDB().collection(collectionSignals).find({ 'value.status': 1, 'value.archived': false })
  }
  if (data === undefined || data === null) {
    ctx.reply(
      `😅 Bạn đã nhập sai lệnh. 😅\nVui lòng nhập /help để được giúp đỡ`
    )
  } else {
    if (await data.count() > 0) {
      const userId = ctx.message.from.id
      const groupId = ctx.message.chat.id
      let signalType
      data.toArray((err, items) => {
        if (err) {
          console.log(err)
        } else {
          let template = 'Hiện tại đang có ' + items.length + ' kèo \n\n'
          if (memberWhiteList.includes('' + userId) && groupId.toString() !== _config('app.gupChannel')) {
            for (i in items) {
              if (items[i].value.type.toUpperCase().includes('BUY')) {
                signalType = 'BUY ' + items[i].value.type.toUpperCase().substring(3)
              } else if (items[i].value.type.toUpperCase().includes('SELL')) {
                signalType = 'SELL ' + items[i].value.type.toUpperCase().substring(4)
              }
              template += `${parseInt(i) + 1}. 🧨 ${signalType} ${items[i].name} at ${items[i].value.entry}
    ${items[i].value.time}
  
  Stop Loss: ${items[i].value.sl} 
  Take Profit 1: ${items[i].value.tp1} ${items[i].value.progress > 1 ? '✅' : ''}
  Take Profit 2: ${items[i].value.tp2} ${items[i].value.progress > 2 ? '✅' : ''}
  Take Profit 3: ${items[i].value.tp3} ${items[i].value.progress > 3 ? '✅' : ''}
  Status: ${items[i].value.status === 1 ? '🔴 Inactive' : '❇️ Active'}
  Source: ${items[i].value.source === undefined ? 'None' : items[i].value.source}
  Created By: ${items[i].value.createdBy} \n\n `
            }
            template += '\nCommand: /keo để check tất cả các kèo hoặc /keo-active để check các kèo đang hoạt động hoặc /keo-inactive để check các kèo sắp hoạt động 🤣🤣'
          } else {
            for (i in items) {
              if (items[i].value.type.toUpperCase().includes('BUY')) {
                signalType = 'BUY ' + items[i].value.type.toUpperCase().substring(3)
              } else if (items[i].value.type.toUpperCase().includes('SELL')) {
                signalType = 'SELL ' + items[i].value.type.toUpperCase().substring(4)
              }
              template += `${parseInt(i) + 1}. 🧨 ${signalType} ${items[i].name} at ${items[i].value.entry}
    ${items[i].value.time}
    
  Stop Loss: ${items[i].value.sl} 
  Take Profit 1: ${items[i].value.tp1} ${items[i].value.progress > 1 ? '✅' : ''}
  Take Profit 2: ${items[i].value.tp2} ${items[i].value.progress > 2 ? '✅' : ''}
  Take Profit 3: ${items[i].value.tp3} ${items[i].value.progress > 3 ? '✅' : ''}
  Status: ${items[i].value.status === 1 ? 'Inactive' : 'Active'} \n\n `
            }
            template += '\nCommand: /keo để check tất cả các kèo hoặc /keo-active để check các kèo đang hoạt động hoặc /keo-inactive để check các kèo sắp hoạt động 🤣🤣'
          }
          ctx.reply(template)
        }
      })
    } else {
      ctx.reply(
        `😢 Hiện tại không có kèo nào cho anh em 😢
  😢 Admin cho anh em kèo đi 😢`
      )
    }
  }
})

_bot.command('/xoakeo', ctx => {
  const text = ctx.message.text
  const userName = ctx.message.from.username

  if (text.includes('/xoakeo-')) {
    const name = text.split`-`[1].toUpperCase();

    (async () => {
      const data = db.getDB().collection(collectionSignals)
      if (await data.find({ name: name, 'value.archived': false }).count() > 0) {
        const userId = ctx.message.from.id
        const groupId = ctx.message.chat.id
        if (adminWhiteList.includes('' + userId) && groupId.toString() !== _config('app.gupChannel')) {
          data.findOneAndDelete({ name: name, 'value.archived': false })
          ctx.reply(
            `❌ @${userName} đã xoá thành công kèo ${name} ❌
⚠️ Ai đặt Alert kèo này trên TradingView thì chủ động vào xoá đi nhé`
          )
        } else {
          ctx.reply(
            `⚠️ Bạn không có quyền sử dụng command này. Xin thông cảm ⚠️`
          )
        }
      } else {
        ctx.reply(
          `😢 Làm gì có kèo ${name} mà xoá
👉 Command /keo để check các kèo hiện tại 👈
😢 Admin cho anh em kèo đi`
        )
      }
    })()
  } else {
    ctx.reply(
      `⚠️ Bạn đã nhập sai lệnh. Để xoá kèo, nhập /xoakeo-tên kèo`
    )
  }
})

_bot.command('/dungkeo', ctx => {
  const text = ctx.message.text
  const userName = ctx.message.from.username
  if (text.includes('/dungkeo-')) {
    const name = text.split`-`[1].toUpperCase();
    (async () => {
      client.getSymbols().then(response => {
        // return response;
        const res = response
        if (res.includes(name)) {
          client.getQuotes(name).then(async response => {
            const result = response[0]
            const currentPrice = result.price
            const data = db.getDB().collection(collectionSignals)
            if (await data.find({ name: name, 'value.archived': false }).count()) {
              const userId = ctx.message.from.id
              const groupId = ctx.message.chat.id
              let progressText
              let result
              if (memberWhiteList.includes('' + userId) && groupId.toString() !== _config('app.gupChannel')) {
                data
                  .find({ name: name, 'value.archived': false })
                  .toArray((err, items) => {
                    if (err) throw err
                    else {
                      const type = items[0].value.type.toUpperCase()
                      const entry = items[0].value.entry
                      const sl = items[0].value.sl
                      const tp1 = items[0].value.tp1
                      const tp2 = items[0].value.tp2
                      const tp3 = items[0].value.tp3
                      const status = items[0].value.status
                      const progress = items[0].value.progress
                      if (status === 1) {
                        progressText = `Kèo này chưa chạm entry nên là kèo hoà`
                        data.findOneAndUpdate(
                          { name: name, 'value.archived': false },
                          {
                            $set: {
                              'value.status': 2,
                              'value.archived': true,
                              'value.res': 2,
                              'value.progress': 5,
                              'value.close': currentPrice,
                              'value.timeend': new Date(moment(new Date()).utcOffset(420).format('YYYY-MM-DD HH:mm')).toISOString()
                            }
                          }
                        )
                      } else {
                        if (type.includes('BUY')) {
                          if (currentPrice > sl) {
                            if (currentPrice < entry) {
                              result = 0 - resultPips(name, currentPrice, entry)
                              progressText = `Kèo lose, profit: ${result}`
                              data.findOneAndUpdate(
                                { name: name, 'value.archived': false },
                                {
                                  $set: { 'value.status': 2, 'value.archived': true, 'value.res': 1, 'value.progress': 5, 'value.close': currentPrice }
                                }
                              )
                            } else {
                              if (progress === 1 || (progress === 2 && currentPrice > tp1) || (progress === 3 && currentPrice > tp2) || (progress === 4 && currentPrice > tp3)) {
                                result = resultPips(name, currentPrice, entry)
                              } else if (progress === 2 && currentPrice <= tp1) {
                                result = resultPips(name, tp1, entry)
                              } else if (progress === 3 && currentPrice <= tp2) {
                                result = resultPips(name, tp2, entry)
                              } else if (progress === 4 && currentPrice <= tp3) {
                                result = resultPips(name, tp3, entry)
                              }
                              progressText = `Kèo win, profit: +${result}`
                              data.findOneAndUpdate(
                                { name: name, 'value.archived': false },
                                {
                                  $set: {
                                    'value.status': 2,
                                    'value.archived': true,
                                    'value.res': 3,
                                    'value.progress': 5,
                                    'value.close': currentPrice,
                                    'value.timeend': new Date(moment(new Date()).utcOffset(420).format('YYYY-MM-DD HH:mm')).toISOString()
                                  }
                                }
                              )
                            }
                          } else {
                            result = 0 - resultPips(name, sl, entry)
                            progressText = `Kèo lose, profit: ${result}`
                            data.findOneAndUpdate(
                              { name: name, 'value.archived': false },
                              {
                                $set: {
                                  'value.status': 2,
                                  'value.archived': true,
                                  'value.res': 1,
                                  'value.progress': 5,
                                  'value.close': currentPrice,
                                  'value.timeend': new Date(moment(new Date()).utcOffset(420).format('YYYY-MM-DD HH:mm')).toISOString()
                                }
                              }
                            )
                          }
                        } else if (type.includes('SELL')) {
                          if (currentPrice < sl) {
                            if (currentPrice > entry) {
                              result = 0 - resultPips(name, currentPrice, entry)
                              progressText = `Kèo lose, profit: ${result}`
                              data.findOneAndUpdate(
                                { name: name, 'value.archived': false },
                                {
                                  $set: {
                                    'value.status': 2,
                                    'value.archived': true,
                                    'value.res': 1,
                                    'value.progress': 5,
                                    'value.close': currentPrice,
                                    'value.timeend': new Date(moment(new Date()).utcOffset(420).format('YYYY-MM-DD HH:mm')).toISOString()
                                  }
                                }
                              )
                            } else {
                              if (progress === 1 || (progress === 2 && currentPrice < tp1) || (progress === 3 && currentPrice < tp2) || (progress === 4 && currentPrice < tp3)) {
                                result = resultPips(name, currentPrice, entry)
                              } else if (progress === 2 && currentPrice >= tp1) {
                                result = resultPips(name, tp1, entry)
                              } else if (progress === 3 && currentPrice >= tp2) {
                                result = resultPips(name, tp2, entry)
                              } else if (progress === 4 && currentPrice >= tp3) {
                                result = resultPips(name, tp3, entry)
                              }
                              progressText = `Kèo win, profit: +${result}`
                              data.findOneAndUpdate(
                                { name: name, 'value.archived': false },
                                {
                                  $set: {
                                    'value.status': 2,
                                    'value.archived': true,
                                    'value.res': 3,
                                    'value.progress': 5,
                                    'value.close': currentPrice,
                                    'value.timeend': new Date(moment(new Date()).utcOffset(420).format('YYYY-MM-DD HH:mm')).toISOString()
                                  }
                                }
                              )
                            }
                          } else {
                            result = 0 - resultPips(name, sl, entry)
                            progressText = `Kèo lose, profit: ${result}`
                            data.findOneAndUpdate(
                              { name: name, 'value.archived': false },
                              {
                                $set: {
                                  'value.status': 2,
                                  'value.archived': true,
                                  'value.res': 1,
                                  'value.progress': 5,
                                  'value.close': currentPrice,
                                  'value.timeend': new Date(moment(new Date()).utcOffset(420).format('YYYY-MM-DD HH:mm')).toISOString()
                                }
                              }
                            )
                          }
                        } else {
                          console.log('Undefined Error')
                        }
                      }
                      ctx.reply(
                        `⚠️ @${userName} đã dừng thành công kèo ${name} ⚠️
${progressText}

⚠️ Ai đặt Alert kèo này trên TradingView thì chủ động vào xoá đi nhé`
                      )
                    }
                  })
              } else {
                ctx.reply(
                  `⚠️ Bạn không có quyền sử dụng command này. Xin thông cảm`
                )
              }
            }
          })
        }
      })
    })()
  } else {
    ctx.reply(
      `⚠️ Bạn đã nhập sai lệnh. Để dừng kèo, nhập /dungkeo-tên kèo`
    )
  }
})

_bot.command('/activekeo', ctx => {
  const text = ctx.message.text
  const userName = ctx.message.from.username
  if (text.includes('/activekeo-')) {
    const name = text.split`-`[1].toUpperCase().trim();

    (async () => {
      const data = db.getDB().collection(collectionSignals)
      if (await data.find({ name: name, 'value.archived': false, 'value.status': 1 }).count()) {
        const userId = ctx.message.from.id
        const groupId = ctx.message.chat.id
        if (memberWhiteList.includes('' + userId) && groupId.toString() !== _config('app.gupChannel')) {
          data.findOneAndUpdate(
            { name: name, 'value.archived': false, 'value.status': 1 },
            {
              $set: { 'value.status': 3 }
            }
          )

          ctx.reply(
            `✅ @${userName} đã active thành công kèo ${name} ✅`
          )
        } else {
          ctx.reply(
            `⚠️ Bạn không có quyền sử dụng command này. Xin thông cảm`
          )
        }
      }
    })()
  } else {
    ctx.reply(
      `⚠️ Bạn đã nhập sai lệnh. Để active kèo, nhập /active-tên kèo`
    )
  }
})

_bot.command('/inactivekeo', ctx => {
  const text = ctx.message.text
  const userName = ctx.message.from.username
  if (text.includes('/inactivekeo-')) {
    const name = text.split`-`[1].toUpperCase().trim();

    (async () => {
      const data = db.getDB().collection(collectionSignals)
      if (await data.find({ name: name, 'value.archived': false, 'value.status': 3 }).count()) {
        const userId = ctx.message.from.id
        const groupId = ctx.message.chat.id
        if (memberWhiteList.includes('' + userId) && groupId.toString() !== _config('app.gupChannel')) {
          data.findOneAndUpdate(
            { name: name, 'value.archived': false, 'value.status': 3 },
            {
              $set: { 'value.status': 1 }
            }
          )

          ctx.reply(
            `✅ @${userName} đã inactive thành công kèo ${name} ✅`
          )
        } else {
          ctx.reply(
            `⚠️ Bạn không có quyền sử dụng command này. Xin thông cảm`
          )
        }
      }
    })()
  } else {
    ctx.reply(
      `⚠️ Bạn đã nhập sai lệnh. Để inactive kèo, nhập /inactive-tên kèo`
    )
  }
})

_bot.command('/upgradekeo', ctx => {
  const text = ctx.message.text
  const userName = ctx.message.from.username
  if (text.includes('/upgradekeo-')) {
    const name = text.split`-`[1].toUpperCase().trim();

    (async () => {
      const data = db.getDB().collection(collectionSignals)
      if (await data.find({ name: name, 'value.archived': true, 'value.progress': 4, 'value.status': 2, 'value.res': 1 }).count()) {
        const userId = ctx.message.from.id
        const groupId = ctx.message.chat.id
        if (('' + userId) === '373181771' && groupId.toString() !== _config('app.gupChannel')) {
          data.findOneAndUpdate(
            { name: name, 'value.archived': true, 'value.progress': 4, 'value.status': 2, 'value.res': 1 },
            {
              $set: { 'value.status': 2, 'value.progress': 4, 'value.res': 3 }
            }
          )

          ctx.reply(
            `✅ @${userName} đã upgrade thành công kèo ${name} ✅`
          )
        } else {
          ctx.reply(
            `⚠️ Bạn không có quyền sử dụng command này. Xin thông cảm`
          )
        }
      }
    })()
  } else {
    ctx.reply(
      `⚠️ Bạn đã nhập sai lệnh. Để upgrade kèo, nhập /upgradekeo-tên kèo`
    )
  }
})

_bot.command('/luutru', ctx => {
  (async () => {
    const data = db.getDB().collection(collectionSignals).find({ 'value.archived': true })
    if (await data.count() > 0) {
      const userId = ctx.message.from.id
      const groupId = ctx.message.chat.id
      if (memberWhiteList.includes('' + userId) && groupId.toString() !== _config('app.gupChannel')) {
        data.toArray((err, items) => {
          if (err) {
            console.log(err)
          } else {
            let template = 'Hiện tại đang có ' + items.length + ' kèo đã hoàn thành \n\n'
            for (i in items) {
              template += `*${parseInt(i) + 1}. 🧨 ${items[i].value.type.toUpperCase()} ${items[i].name} at ${items[i].value.entry}*
  _${items[i].value.time}_

  Stop Loss: ${items[i].value.sl} 
  Take Profit 1: ${items[i].value.tp1} ${items[i].value.progress > 1 ? '✅' : ''}
  Take Profit 2: ${items[i].value.tp2} ${items[i].value.progress > 2 ? '✅' : ''}
  Take Profit 3: ${items[i].value.tp3} ${items[i].value.progress > 3 ? '✅' : ''}
  Status: ${items[i].value.status === 1 ? 'Inactive' : items[i].value.status === 3 ? 'Active' : 'Done'}
  Result: ${items[i].value.res === 3 ? '✅ Win' : items[i].value.res === 1 ? '❌ Lose' : '⚠️ Undefined'}
  Created By: _${items[i].value.createdBy}_ \n\n`
            }
            template += '\nCommand: /keo để check tất cả các kèo hoặc /keo-active để check các kèo đang hoạt động hoặc /keo-inactive để check các kèo sắp hoạt động 🤣🤣'
            ctx.replyWithMarkdown(template)
          }
        })
      } else {
        ctx.reply(
          `⚠️ Bạn không có quyền sử dụng command này. Xin thông cảm`
        )
      }
    } else {
      ctx.reply(
        `😢 Chưa hoàn thành đc cái kèo nào cả
  😢 Admin cho anh em kèo đi. Nghèo lắm r`
      )
    }
  })()
})

_bot.command('/admin', ctx => {
  const text = ctx.message
  const userId = ctx.from.id
  const userName = ctx.from.username
  const groupId = ctx.message.chat.id
  console.log(text)
  if (groupId.toString() === _config('app.adminChannel')) {
    if (!memberWhiteList.includes('' + userId)) {
      memberWhiteList.push(userId)
      ctx.reply(
        `✅ Add member @${userName} vào whitelist thành công ✅`
      )
    } else {
      ctx.reply(
        `❌ Đang ở trong whitelist r thì k cần command /admin nữa nhé @${userName} ❌`
      )
    }
  } else {
    ctx.reply(
      `⚠️ Bạn không có quyền sử dụng command này. Xin thông cảm`
    )
  }
})

_bot.command('/test', ctx => {
  const text = ctx.message
  const userId = ctx.from.id
  const userName = ctx.from.username
  const groupId = ctx.message.chat.id
  console.log(text)
  if (groupId.toString() === _config('app.adminChannel')) {
    const test = resultPips('XAUUSD', '1501.4', '1512.1')
    ctx.reply(
      `${test}`
    )
  } else {
    ctx.reply(
      `⚠️ Bạn không có quyền sử dụng command này. Xin thông cảm`
    )
  }
})

_bot.command('/setkeo', ctx => {
  const text = ctx.message.text
  const command = text.substring(8).split` `
  const username = ctx.message.from.username
  const userId = ctx.message.from.id
  const groupId = ctx.message.chat.id

  if (memberWhiteList.includes('' + userId) && groupId.toString() !== _config('app.gupChannel')) {
    if (command.length >= 4) {
      const name = command[0].toUpperCase()
      const type = command[1].split`-`[0].toLowerCase()
      const entry = command[1].split`-`[1]
      const sl = command[2].split`-`[1]
      const tp1 = command[3].split`-`[1]
      const tp2 = command.length === 4 ? '0' : command[4].split`-`[1]
      const tp3 = command.length === 4 ? '0' : command.length === 5 ? '0' : command[5].split`-`[1]
      const data = {
        name: name,
        value: {
          type: type,
          entry: entry,
          sl: sl,
          tp: tp1,
          tp1: tp1,
          tp2: tp2,
          tp3: tp3,
          progress: 1,
          time: new Date(moment(new Date()).utcOffset(420).format('YYYY-MM-DD HH:mm')).toISOString(),
          status: 1,
          res: 2,
          archived: false,
          createdBy: username || 'hathaigup'
        }
      };

      (async () => {
        if (await db.getDB().collection(collectionSignals).find({ name: name, 'value.archived': false }).count() > 0) {
          ctx.reply(
            `⚠️ Kèo ${name} đã set 1 lần rồi.\n@${username} không set lại nhé. Huỷ kèo ${name} cũ hoặc dừng hoặc là đợi kèo chốt mới được set lại ⚠️`
          )
          // }
        } else {
          db.getDB().collection(collectionSignals).insertOne(data)
          ctx.reply(
            `✅ Set kèo ${name} thành công. @${username} dạo này thông minh phết ✅
👉 Nhớ set Alert trên Trading View nhé 👈

Để xem các kèo đang active: /keo-active, xem các kèo inactive: /keo-inactive, xem tất cả kèo: /keo`)
          // }
        }
      })()
    } else {
      ctx.reply(
        `⚠️ Sai cú pháp r nhé @${username} ⚠️
👉 Command kèo chuẩn là /setkeo XAUUSD BUY-1500 SL-1480 TP1-1520 TP2-1550 TP3-1600 👈
👉 Chỉ thay đổi tên kèo, giá trị SL TP BUY/SELL thôi 👈`
      )
    }
  } else {
    ctx.reply(
      `⚠️ Bạn không có quyền sử dụng command này. Xin thông cảm ⚠️`
    )
  }
})

_bot.command('/waiting', ctx => {
  const text = ctx.message.text
  const command = text.substring(9).split` `
  const username = ctx.message.from.username
  const userId = ctx.message.from.id
  const groupId = ctx.message.chat.id

  if (memberWhiteList.includes('' + userId) && groupId.toString() !== _config('app.gupChannel')) {
    if (command.length >= 4) {
      const name = command[0].toUpperCase()
      const type = command[1].split`-`[0].toLowerCase()
      const entry = command[1].split`-`[1]
      const sl = command[2].split`-`[1]
      const tp1 = command[3].split`-`[1]
      const tp2 = command.length === 4 ? '0' : command[4].split`-`[1]
      const tp3 = command.length === 4 ? '0' : command.length === 5 ? '0' : command[5].split`-`[1]
      const data = {
        name: name,
        value: {
          type: type,
          entry: entry,
          sl: sl,
          tp: tp1,
          tp1: tp1,
          tp2: tp2,
          tp3: tp3,
          progress: 1,
          time: new Date(moment(new Date()).utcOffset(420).format('YYYY-MM-DD HH:mm')).toISOString(),
          status: 4,
          res: 2,
          archived: false,
          createdBy: username || 'hathaigup'
        }
      };

      (async () => {
        if (await db.getDB().collection(collectionSignals).find({ name: name, 'value.archived': false, 'value.status': 4 }).count() > 0) {
          ctx.reply(
            `⚠️ Kèo ${name} đã set 1 lần rồi.\n@${username} không set lại nhé. Huỷ kèo ${name} cũ hoặc dừng hoặc là đợi kèo chốt mới được set lại ⚠️`
          )
          // }
        } else {
          db.getDB().collection(collectionSignals).insertOne(data)
          ctx.reply(
            `✅ Set kèo ${name} ở trạng thái waiting thành công. @${username} dạo này thông minh phết ✅
👉 Khi nào active kèo thì nhớ set Alert trên Trading View nhé 👈

Để xem các kèo đang active: /keo-active, xem các kèo inactive: /keo-inactive, xem tất cả kèo: /keo, xem kèo waiting: /waitingkeo`)
          // }
        }
      })()
    } else {
      ctx.reply(
        `⚠️ Sai cú pháp r nhé @${username} ⚠️
👉 Command kèo chuẩn là /waiting XAUUSD BUY-1500 SL-1480 TP1-1520 TP2-1550 TP3-1600 👈
👉 Chỉ thay đổi tên kèo, giá trị SL TP BUY/SELL thôi 👈`
      )
    }
  } else {
    ctx.reply(
      `⚠️ Bạn không có quyền sử dụng command này. Xin thông cảm ⚠️`
    )
  }
})

_bot.command('/waitingkeo', async ctx => {
  const userId = ctx.message.from.id
  const groupId = ctx.message.chat.id

  if (memberWhiteList.includes('' + userId) && groupId.toString() !== _config('app.gupChannel')) {
    const data = db.getDB().collection(collectionSignals).find({ 'value.status': 4, 'value.archived': false })
    if (await data.count() > 0) {
      let signalType
      data.toArray((err, items) => {
        if (err) {
          console.log(err)
        } else {
          let template = 'Hiện tại đang có ' + items.length + ' kèo \n\n'
          for (i in items) {
            if (items[i].value.type.toUpperCase() === 'BUY') {
              signalType = 'BUY ' + items[i].value.type.toUpperCase().substring(3)
            } else if (items[i].value.type.toUpperCase() === 'SELL') {
              signalType = 'SELL ' + items[i].value.type.toUpperCase().substring(4)
            }
            template += `${parseInt(i) + 1}. 🧨 ${signalType} ${items[i].name} at ${items[i].value.entry}
  ${items[i].value.time}

  Stop Loss: ${items[i].value.sl} 
  Take Profit 1: ${items[i].value.tp1} ${items[i].value.progress > 1 ? '✅' : ''}
  Take Profit 2: ${items[i].value.tp2} ${items[i].value.progress > 2 ? '✅' : ''}
  Take Profit 3: ${items[i].value.tp3} ${items[i].value.progress > 3 ? '✅' : ''}
  Status: ⚠️ Waiting ⚠️
  Source: ${items[i].value.source === undefined ? 'None' : items[i].value.source}
  Created By: ${items[i].value.createdBy} \n\n `
          }
          template += '\nCommand: /keo để check tất cả các kèo hoặc /waitingkeo để check các kèo waiting hoặc /keo-active để check các kèo đang hoạt động hoặc /keo-inactive để check các kèo sắp hoạt động 🤣🤣'
          ctx.reply(template)
        }
      })
    } else {
      ctx.reply(
        `Hiện tại không có kèo waiting nào cho anh em`
      )
    }
  }
})

// _bot.command('/getchat', async ctx => {
//   console.log(await _bot.telegram.getChatMember('-1001444501600', '373181771'))
// })

_bot.command('/sourcekeo', ctx => {
  const text = ctx.message.text
  const command = text.substring(11).split` `
  const userId = ctx.message.from.id
  const groupId = ctx.message.chat.id
  const username = ctx.from.username

  if (memberWhiteList.includes('' + userId) && groupId.toString() !== _config('app.gupChannel')) {
    const name = command[0].toUpperCase()
    const source = command[1].trim().toLowerCase()
    if (command.length === 2) {
      if (sourceSignal.includes(source)) {
        (async () => {
          const data = db.getDB().collection(collectionSignals)
          if (await data.find({ name: name, 'value.archived': false }).count()) {
            data.findOneAndUpdate(
              { name: name, 'value.archived': false },
              {
                $set: { 'value.source': source }
              }
            )
            ctx.reply(
              `✅ @${username} đã note thành công kèo ${name} ✅`
            )
          }
        })()
      } else {
        let listSource = `List source hiện tại: \n`
        for (i in sourceSignal) {
          listSource += `${parseInt(i) + 1}. ${sourceSignal[i]} \n`
        }
        ctx.reply(
          `Channel này không có trong list source
${listSource}
@${username} note lại kèo nhé`
        )
      }
    } else {
      ctx.reply(
        `⚠️ Sai cú pháp r nhé @${username} ⚠️
👉 Command note kèo chuẩn là /sourcekeo tênkèo note 👈
👉 Ví dụ: /sourcekeo XAUUSD mcm 👈
👉 Chỉ note được những kèo có trong command /keo. Các kèo # muốn note thì lên web admin 👈`
      )
    }
  } else {
    ctx.reply(
      `⚠️ Bạn không có quyền sử dụng command này. Xin thông cảm ⚠️`
    )
  }
})

_bot.startPolling()

console.log('GupCapital-BotSite-Update')
console.log('Start Bot Application')
