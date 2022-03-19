const mongoose = require('mongoose')

const server = process.env.MONGODB_SERVER || 'localhost'
const port = process.env.MONGODB_PORT || 27017
const database = process.env.MONGODB_DBNAME || 'divar'
const username = process.env.MONGODB_USERNAME
const password = encodeURIComponent(process.env.MONGODB_PASSWORD)
const authSource = process.env.MONGODB_AUTHSOURCE

/* database connect */
let connection = ''
if (username && password)
    connection = `mongodb://${username}:${password}@${server}:${port}/${database}?authSource=${authSource}`
else
    connection = `mongodb://${server}:${port}/${database}`

const CONNECTION_SETTINGS = {
    // useFindAndModify: false,
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}

mongoose.Promise = global.Promise

mongoose.connect(connection, CONNECTION_SETTINGS)

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));


db.once('open', async function () {
    console.log("Database connected");
});

