const fs = require('fs');
const search = require('./search');
const redisServer = require('./helper/redisServer')


let wordSearch = 'مبل';
let catSearch = 'furniture';
let redisPort = 6379;


setInterval
(async () => {

    let searchData = await search({wordSearch, catSearch})
    let lastPost = searchData.widget_list[0].data;
    let lastTokenKey = `lastTokenPost${catSearch}`

    let lastTokenPost = await redisServer.get(lastTokenKey)

    if (lastTokenPost && lastTokenPost != lastPost.token)
        console.log('a new post with tiel :', lastPost.title)
    else {
        console.log('Repetitious', lastPost.title)
        await redisServer.set(lastTokenPost, lastPost.token)
    }

    // fs.writeFileSync('./log/searchData.json', JSON.stringify(searchData, null, 2))
}, 5000)