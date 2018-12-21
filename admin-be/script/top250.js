const fs = require('fs-extra')
const movieModel = require('../model/movie')
const moment = require('moment')
fs.readJson('../json/top250.json')
  .then(data => {
    let res = data.subjects.map(item => {
      return {
        rating: item.rating.average,
        genres: item.genres,
        title: item.title,
        images: item.images.large,
        cTime: moment().format('YYYY-MM-DD HH:MM:SS')
      }
    })
    res.forEach(item => {
      new movieModel(item).save()
    })
  })
  .catch(err => {
    console.error(err)
  })
