const proxyRequest = require('./requests/proxyRequest')

let searchData = ({wordSearch, catSearch, city = 'tehran'}) => {
    let path = '';
    if (!wordSearch)
        path = '/v8/web-search/' + city + '/' + catSearch
    else
        path = '/v8/web-search/' + city + '/' + catSearch + '?q=' + wordSearch

    return proxyRequest({path})
        .then(data => data)

}

module.exports = searchData;
// (async () => {
//     let a = await searchData({
//         wordSearch: 'پژو',
//         catSearch: 'car',
//         city: 'tehran'
//     })
//     console.log('aaa', a)
// })()