const userModel = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs-extra')
const resolve = require('path').resolve

exports.login = async (req, res) => {
  const { username, password } = req.body
  try {
    const result = await userModel.findOne({ username })
    if (!result) {
      res.json({ code: 201, msg: '用户不存在' })
    } else {
      const isSame = await bcrypt.compare(password, result.password)
      if (isSame) {
        const cert = await fs.readFile(resolve(__dirname, '../key/private.key'))
        const token = await jwt.sign({ username }, cert)
        res.json({ code: 200, msg: token })
      } else {
        res.json({ code: 201, msg: '用户名或密码错误' })
      }
    }
  } catch (e) {
    res.json({ code: 201, msg: e.message })
  }
}
exports.signup = async (req, res) => {
  const { username, password } = req.body
  // TODO:参数验证
  try {
    const result = await userModel.findOne({ username })
    if (!result) {
      const salt = await bcrypt.genSalt(8)
      const hashPwd = await bcrypt.hash(password, salt)
      await new userModel({ username, password: hashPwd }).save()
      res.json({ code: 200, msg: '' })
    } else {
      res.json({ code: 201, msg: '用户已存在' })
    }
  } catch (e) {
    res.json({ code: 201, msg: e.message })
  }
}
