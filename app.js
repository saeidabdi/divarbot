const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extends: true }));
app.disable('x-powered-by')

require('./bots/scan');

app.use('/',
  require('./router/router')
);

app.listen(3000,console.log('start server'))