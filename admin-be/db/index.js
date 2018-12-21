const mongoose = require('mongoose')
const link = 'mongodb://127.0.0.1:27017/admin-demo'
mongoose.connect(
  link,
  { useNewUrlParser: true }
)
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log(`connect to ${link}`)
})

module.exports = mongoose
