/**
 * mongoose 代表damai数据库
 * ShowModel 代表 hot_shows集合
 * showDoc 代表一次表单数据产生的文档
 */
//
// ─── 连接damai数据库 ──────────────────────────────────────────────────────────────
//
const mongoose = require('mongoose')
//连接damai数据库
mongoose.connect(
  'mongodb://127.0.0.1:27017/damai',
  { useNewUrlParser: true }
)
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('数据库连接成功👌')
})
//
// ─── 实例化一个hot_shows Collection ──────────────────────────────────────────────────────────────────────────
//
const Schema = mongoose.Schema
const Hot_showSchema = new Schema({
  pic: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  ShowTime: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
})
//初始化 集合 集合名(存入后文档名首字母会变小写且单数的情况下会变复数)
const ShowModel = mongoose.model('Hot_shows', Hot_showSchema)

const dbFunc = {
  add: data => {
    let showDoc = new ShowModel(data) /* 生成一条文档 */
    return showDoc
      .save() /* save方法返回一个promise return出去就可以 async await了 */
      .then(res => res)
      .catch(err => {
        return false
      })
  },
  find: () => {
    return ShowModel.find({}).then(res => res) /*查询数据库  */
  },
  delete: id => {
    return ShowModel.findByIdAndRemove(id)
      .then(res => res)
      .catch(err => {
        console.log('err.msg :', err.msg)
        return false
      })
  },
}
module.exports = dbFunc
// =>dbFunc @router/api.js
