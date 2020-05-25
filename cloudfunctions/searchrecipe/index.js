// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const base = db.command
  try {
    return await db.collection('cardata').where(base.or([
      {
        band: db.RegExp({
          regexp: event.carband,
          options: 'i', //不区分大小写
        })
      },
      {
        innum: db.RegExp({
          regexp: event.colornum,
          options: 'i', //不区分大小写
        })
      }
    ])
    ).get({
      success: function (res) {
        console.log(res)
      }
    })
  } catch (e) {
    console.log(e)
  }
}