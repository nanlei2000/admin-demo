const express = require('express')
const router = express.Router()
const j = JSON.stringify
const userModel = require('../model/user')

const login = async (req, res) => {
  const { username, password } = req.body
  try {
    const result = await userModel.findOne({ username })
    if (!result) {
      await new userModel({ username, password }).save()
      res.render('api', { code: 200, data: j({ msg: req.body }) })
    } else {
      res.render('api', { code: 200, data: j({ msg: '用户已存在' }) })
    }
  } catch (e) {
    res.render('api', { code: 201, data: j({ msg: e.message }) })
  }
}

router.post('/login', login)
module.exports = router
