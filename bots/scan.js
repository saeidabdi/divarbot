const search = require('../services/search');
const {tools, redisServer, notification} = require('../helper/helper')

const scan = async () => {
    let listScan = tools.getScanLis()
    if (listScan.length <= 0) {
        console.log('not exists case for scan')
        await tools.sleep(5000)
        scan();
    }
    console.log('listScan', listScan)
    for (var i = 0; i < listScan.length; i++) {
        let {word, cat} = listScan[i];
        console.log(word, cat)

        let searchData = await search({wordSearch: word, catSearch: cat})
        let lastPost = tools.getLastPost(searchData)

        let lastTokenKey = `lastTokenPost${cat}${word}`

        let lastTokenPost = await redisServer.get(lastTokenKey)

        console.log('lastTokenPost => ' + lastTokenKey, lastTokenPost);

        if (lastTokenPost != lastPost.token) {
            tools.sendNotif_2_users({word, cat, lastPost})
            await redisServer.set(lastTokenKey, lastPost.token)
        } else {
            console.log('Repetitious', lastPost.token)
        }
        await tools.sleep(1000)
    }

    await tools.sleep(5000)
    scan();
}



setTimeout(scan, 3000);