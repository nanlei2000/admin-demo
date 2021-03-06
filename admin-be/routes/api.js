const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const dbFunc = require('../model/db.js')

const hotShowMidd = {
  fileupload: (req, res, next) => {
    const storage = multer.diskStorage({
      destination: (req, res, cb) => {
        cb(null, path.resolve(__dirname, '../public/uploads'))
      },
      filename: (req, file, cb) => {
        let originName = file.originalname
        let dotInd = originName.lastIndexOf('.')
        let filename = file.fieldname + '_' + Date.now() + originName.substr(dotInd)
        req.filename = filename
        cb(null, filename)
      }
    })
    const upload = multer({ storage: storage }).single('pic')
    upload(req, res, err => {
      if (err) {
        console.error(err)
      } else {
        next()
      }
    })
  },
  dbSave: async (req, res, next) => {
    res.setHeader('Content-Type', 'applicatio/json;charset= utf8')
    req.body.pic = req.filename
    const result = await dbFunc.add(req.body)
    console.log('result :', result)
    if (result) {
      res.render('api', { ret: true, data: JSON.stringify({ msg: 'success' }) })
    } else {
      res.render('api', { ret: false, data: JSON.stringify({ msg: 'fail' }) })
    }
  },
  dbFind: async (req, res, next) => {
    res.setHeader('Content-Type', 'applicatio/json;charset= utf8')
    let result = await dbFunc.find()
    if (result) {
      res.render('api', { ret: true, data: JSON.stringify(result) })
    } else {
      res.render('api', { ret: false, data: JSON.stringify(result) })
    }
  },
  dbDelete: async (req, res, next) => {
    res.setHeader('Content-Type', 'applicatio/json;charset= utf8')
    let id = req.body.id
    let result = await dbFunc.delete(id)
    console.log('result :', result)
    if (result) {
      res.render('api', { ret: true, data: JSON.stringify({ msg: 'success' }) })
    } else {
      res.render('api', { ret: false, data: JSON.stringify({ msg: 'fail' }) })
    }
  }
}

router.post('/hot_show/add', hotShowMidd.fileupload, hotShowMidd.dbSave)
router.get('/hot_show/find', hotShowMidd.dbFind)
router.get('/hot_show/delete', hotShowMidd.dbDelete)

module.exports = router
// => apiRouter
