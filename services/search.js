const axios = require('axios');

let searchData = ({wordSearch, catSearch, city = 'tehran'}) => {
    let url;
    if (!wordSearch)
        url = 'https://api.divar.ir/v8/web-search/' + city + '/' + catSearch
    else
        url = 'https://api.divar.ir/v8/web-search/' + city + '/' + catSearch + '?q=' + wordSearch

    return axios.get(encodeURI(url))
        .then(resultReq => resultReq.data)

}

module.exports = searchData;