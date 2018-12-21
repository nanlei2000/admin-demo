const mongoose = require('../db/index')
const Schema = mongoose.Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})
//初始化 集合 集合名(存入后文档名首字母会变小写且单数的情况下会变复数)
const userModel = mongoose.model('User', userSchema)

module.exports = userModel
