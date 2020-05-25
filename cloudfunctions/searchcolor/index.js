// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const base = db.command
  try {
    return await db.collection('colorlist').where({
      name: db.RegExp({
        regexp: event.word,
        options: 'i',//不区分大小写
      })
    }).get()
  } catch (e) {
    console.log(e)
  }
}