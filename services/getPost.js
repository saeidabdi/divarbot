const axios = require('axios');

const getPost = (token) => {
    return axios.get('https://api.divar.ir/v8/posts/'+token)//gYqwSNDv
        .then(response => response.data )
}

module.exports = getPost