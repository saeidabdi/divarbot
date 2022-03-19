const mongoose = require("mongoose");

const schema = mongoose.Schema({
    word: String,
    cat: String,
    city: String
})
let requestList = mongoose.model('requestList', schema)

module.exports = requestList