const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: String,
    mobile: String,
    notif_id: String,
    config: [Object]
})
let user = mongoose.model('user', schema)

module.exports = user