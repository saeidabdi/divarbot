const router = require('express').Router()

const addToScan = require('../index')
const addUser = require('../services/addUser')

router.get('/add/:wordSearch/:catSearch', addToScan)
router.get('/user/add', addUser)
router.get('/ss', (req, res) => {
    res.send('ssss')
})

module.exports = router