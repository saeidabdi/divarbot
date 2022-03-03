const search = require('./search');
const redisServer = require('./helper/redisServer')
const notification = require('./helper/notification')


// let wordSearch = 'مبل';
// let catSearch = 'furniture';

const findBest = (req, res) => {

    const {wordSearch,catSearch} = req.params;

    setInterval
        (async () => {

            let searchData = await search({ wordSearch, catSearch })
            let lastPost = searchData.widget_list[0].data;
            let lastTokenKey = `lastTokenPost${catSearch}`

            let lastTokenPost = await redisServer.get(lastTokenKey)

            console.log('lastTokenPost', lastTokenPost);

            if (lastTokenPost && lastTokenPost != lastPost.token) {
                let title = 'توجه پست جدید در دسته ' + catSearch + ' و کلمه ی ' + wordSearch + ' با عنوان : ' + lastPost.title;
                let text = 'توضیحات : ' + lastPost.description + '\n';
                text += 'لینک : https://divar.ir/v/' + lastPost.token
                notification('jSaSmpsmT', text, title, 'https://divar.ir/v/' + lastPost.token);
                await redisServer.set(lastTokenKey, lastPost.token)
            } else {
                console.log('Repetitious', lastPost.token)
            }

            // fs.writeFileSync('./log/searchData.json', JSON.stringify(searchData, null, 2))
        }, 5000)
}

module.exports = findBest;
