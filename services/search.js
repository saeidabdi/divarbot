
const axios = require('axios');

let searchData = ({wordSearch,catSearch}) => {
    let url = 'https://api.divar.ir/v8/web-search/tehran/'+catSearch+'?q='+wordSearch

    return axios.get(encodeURI(url))
        .then(resultReq => resultReq.data)

}

module.exports = searchData;