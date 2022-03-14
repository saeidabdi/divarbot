const proxyRequest = require('./requests/proxyRequest')

const getPost = (token) => {
    let path = '/v8/posts/'+token

    return proxyRequest({path})
        .then(data => data)
}

module.exports = getPost