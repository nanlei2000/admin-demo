const mongoose = require('mongoose')
mongoose.connect(
  'mongodb://127.0.0.1:27017/damai',
  { useNewUrlParser: true }
)
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('数据库连接成功👌')
})

module.exports = mongoose
