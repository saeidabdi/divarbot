const RequestList = require('../../db/model/requestList')

const addToScan = async (req, res) => {
    const {word, cat, city} = req.query;
    if (!await RequestList.findOne(req.query))
        await new RequestList(req.query).save()

    return res.send(`insert new word : ${word} in cat : ${cat} and on city: ${city}`);

}

module.exports = addToScan;
