const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extends: true}));
let Port = 3000;
app.disable('x-powered-by')
require('./db/db'); // connect to database
// require('./bots/scan'); // start scan bot

app.use('/',
    require('./router/router')
);

app.listen(Port, () => console.log(`start server on ${Port}`))