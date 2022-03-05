const redisServer = require('./helper/redisServer')
const notification = require('./helper/notification')
const fs = require('fs')


// let wordSearch = 'مبل';
// let catSearch = 'furniture';
let RequestList = 'db/Requestlist.json'

const addToScan = (req, res) => {

    const {wordSearch, catSearch} = req.params;

    if (!fs.existsSync(RequestList))
        fs.writeFileSync(RequestList, '[]', null, 4);
    const List = JSON.parse(fs.readFileSync(RequestList));

    const findList = List.find(l => l.word === wordSearch && l.cat === catSearch);
    if (findList)
        return res.send(`exists ${wordSearch} in cat ${catSearch}`);
    List.push({
        word: wordSearch,
        cat: catSearch,
    })
    fs.writeFileSync(RequestList, JSON.stringify(List) , null, 4)

    return res.send(`insert new word : ${wordSearch} in cat : ${catSearch}`);

}

module.exports = addToScan;
