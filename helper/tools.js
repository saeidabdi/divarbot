const fs = require('fs')
const RequestList = './db/Requestlist.json'
const UserList = './db/users.json'

class Tools {
    static getInstance() {
        if (!Tools.instance)
            Tools.instance = new Tools
        return Tools.instance;
    }

    getScanLis() {
        return JSON.parse(fs.readFileSync(RequestList));
    }

    getUsersFilter({word, cat}) {
        let allUser = JSON.parse(fs.readFileSync(UserList))
        return allUser.filter(user => user.word === word && user.cat === cat);
    }

    sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

}

module.exports = Tools.getInstance();