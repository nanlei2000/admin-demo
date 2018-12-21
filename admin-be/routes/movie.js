const express = require('express')
const router = express.Router()
const movieController = require('../controller/movie')

router.get('/list', movieController.list)
module.exports = router
