const mongoose = require('../db/index')
const Schema = mongoose.Schema
const movieSchema = new Schema({
  rating: {
    type: String,
    required: true
  },
  genres: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  images: {
    type: String,
    required: true
  },
  cTime: {
    type: String,
    required: true
  },
  uTime: {
    type: String,
    default: ''
  }
})
const movieModel = mongoose.model('Movie', movieSchema)

module.exports = movieModel

// {
//   "_id" : ObjectId("5c1c902024321b8488cd721a"),
//   "genres" : [
//       "剧情",
//       "传记",
//       "运动"
//   ],
//   "uTime" : "",
//   "rating" : "9.1",
//   "title" : "摔跤吧！爸爸",
//   "images" : "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2457983084.webp",
//   "cTime" : "2018-12-21 15:12:97",
//   "__v" : 0
// }
