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

    getLastPost = (searchData) => {
        let lastPost = searchData.widget_list[0].data;
        let i = 1;

        while (!lastPost.token) {
            lastPost = searchData.widget_list[i].data;
            i++;
        }

        return lastPost;
    }


    p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))

    string_2_number(str) {
        str = this.p2e(str)
        str = str.replace('٬','')
            .replace('تومان','');
        return +str;
    }

}

module.exports = Tools.getInstance();