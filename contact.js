
const axios = require('axios');

let contactPost = ({wordSearch,catSearch}) => {
    let url = "https://api.divar.ir/v5/posts/" + txttocken + "/contact/"

    return axios.get(encodeURI(url))
        .then(resultReq => resultReq.data)

}

module.exports = contactPost;