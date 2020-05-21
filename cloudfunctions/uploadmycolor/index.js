// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const base = db.command
  var obj = event.color
  var userid = event.id
  // var filedvalue2 = event.data2
  try {
    return await db.collection('userlist').where({
      _openid:userid
    }).update({
      data: {
        mycolor: base.push(obj)
      }
    })
  } catch (e) {
    console.log(e)
  }
}