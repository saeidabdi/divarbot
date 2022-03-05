const fs = require('fs')
const RequestList = './db/Requestlist.json'

class Tools {
    static getInstance() {
        if (!Tools.instance)
            Tools.instance = new Tools
        return Tools.instance;
    }

    getScanLis() {
        return JSON.parse(fs.readFileSync(RequestList));
    }

    sleep = (ms) => new Promise(resolve => setTimeout(resolve,ms))

}

module.exports = Tools.getInstance();