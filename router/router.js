const router = require('express').Router()

const findBest = require('../index')

router.get('/add/:wordSearch/:catSearch',findBest)
router.get('/ss',(req,res)=>{
  res.send('ssss')
})

module.exports = router