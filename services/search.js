// const axios = require('axios');
// const HttpsProxyAgent = require('https-proxy-agent')
const proxyRequest = require('./request/proxyRequest')

let searchData = ({wordSearch, catSearch, city = 'tehran'}) => {
    let path = '';
    if (!wordSearch)
        path = '/v8/web-search/' + city + '/' + catSearch
    else
        path = '/v8/web-search/' + city + '/' + catSearch + '?q=' + wordSearch

    return proxyRequest({path})
        .then(data => data)

    // return axios.create({
    //     baseURL: encodeURI(url),
    //     method: 'GET',
    //     params: {httpAgent: agent}
    // });
    // return axios.get(encodeURI(url), {
    //     httpAgent: agent,
    //     // proxy: {
    //     //     host: "82.196.10.171",
    //     //     port: 61253,
    //     // },
    // })
    //     .then(resultReq => resultReq.data)
    // .catch(e => e)

}

// module.exports = searchData;
(async () => {
    let a = await searchData({
        wordSearch: 'پژو',
        catSearch: 'car',
        city: 'tehran'
    })
    console.log('aaa', a)
})()