const search = require('../services/search');
const {tools, redisServer, notification} = require('../helper/helper')
const getPost = require('../services/getPost')

const scan = async () => {
    let listScan = tools.getScanLis()
    if (listScan.length <= 0) {
        console.log('not exists case for scan')
        await tools.sleep(5000)
        scan();
    }

    for (var i = 0; i < listScan.length; i++) {
        let {word, cat, city} = listScan[i];

        let searchData = await search({wordSearch: word, catSearch: cat, city: city})
        try{
            var lastPost = tools.getLastPost(searchData)
        }catch (e){
            break;
        }

        let lastTokenKey = `lastTokenPost${cat}${city}${word}`

        let lastTokenPost = await redisServer.get(lastTokenKey)

        console.log('lastTokenPost => ' + lastTokenKey, lastTokenPost);

        if (lastTokenPost != lastPost.token) {
            sendNotif_2_users({word, cat, lastPost})
            await redisServer.set(lastTokenKey, lastPost.token)
        } else {
            console.log('Repetitious', lastPost.token)
        }
        await tools.sleep(1000)
    }

    await tools.sleep(5000)
    scan();
}


sendNotif_2_users = async (filters) => {
    let {cat, lastPost} = filters;
    let users = tools.getUsersFilter(filters)

    let title = 'فرصت جدید خرید : ' + lastPost.title;
    let text = 'توضیحات : ' + lastPost.description + '\n';
    text += 'لینک : https://divar.ir/v/' + lastPost.token;
    let post = await getPost(lastPost.token)

    users.forEach(user => {
        if (user.strategy) {
            let filter = require('../services/strategy/' + user.strategy)
            let result = filter({
                    post: post,
                    config: user.config
                }
            )
            if (result)
                notification({id: user.id, text, title, action: 'https://divar.ir/v/' + lastPost.token});
        }
    })

}


setTimeout(scan, 3000);