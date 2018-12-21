const mongoose = require('../db/index')
const Schema = mongoose.Schema
const Hot_showSchema = new Schema({
  pic: {
    type: String,
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  ShowTime: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
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
  }
}
module.exports = dbFunc
// =>dbFunc @router/api.js
