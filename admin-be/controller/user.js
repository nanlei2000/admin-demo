const userModel = require('../model/user')

exports.login = async (req, res) => {
  const { username, password } = req.body
  try {
    const result = await userModel.findOne({ username })
    if (!result) {
      await new userModel({ username, password }).save()
      res.json({ code: 200, msg: req.body })
    } else {
      res.json({ code: 201, msg: '用户已存在' })
    }
  } catch (e) {
    res.json({ code: 201, msg: e.message })
  }
}
