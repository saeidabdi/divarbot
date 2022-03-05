const router = require('express').Router()

const addToScan = require('../index')

router.get('/add/:wordSearch/:catSearch',addToScan)
router.get('/ss',(req,res)=>{
  res.send('ssss')
})

module.exports = router