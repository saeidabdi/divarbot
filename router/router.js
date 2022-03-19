const router = require('express').Router()

const addToScan = require('../services/controller')
const addUser = require('../services/controller/addUser')
const addConfig = require('../services/controller/addConfig')

router.get('/request/add', addToScan)
router.get('/user/add', addUser)
router.get('/config/add', addConfig)

module.exports = router