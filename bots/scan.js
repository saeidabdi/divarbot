const search = require('../services/search');
const RequestList = 'db/Requestlist.json';
const {tools, redisServer, notification} = require('../helper/helper')

const scan = async () => {
    let listScan = tools.getScanLis()
    if (listScan.length <= 0) {
        console.log('not exists case for scan')
        await tools.sleep(5000)
        scan();
    }
    console.log('listScan',listScan)
    for (var i = 0; i < listScan.length; i++) {
        let {word, cat} = listScan[i];
        console.log(word, cat)

        let searchData = await search({wordSearch: word, catSearch: cat})
        let lastPost = searchData.widget_list[0].data;
        let lastTokenKey = `lastTokenPost${cat}${word}`

        let lastTokenPost = await redisServer.get(lastTokenKey)

        console.log('lastTokenPost => ' + lastTokenKey, lastTokenPost);

        if (lastTokenPost != lastPost.token) {
            let title = 'توجه پست جدید در دسته ' + cat + ' و کلمه ی ' + word + ' با عنوان : ' + lastPost.title;
            let text = 'توضیحات : ' + lastPost.description + '\n';
            text += 'لینک : https://divar.ir/v/' + lastPost.token
            notification({id: 'jSaSmpsmT', text, title, action: 'https://divar.ir/v/' + lastPost.token});
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