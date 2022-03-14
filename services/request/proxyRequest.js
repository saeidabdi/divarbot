const HttpsProxyAgent = require("https-proxy-agent");
const axios = require("axios");
let proxyList = [];
let baseUrl = 'https://api.divar.ir';

let proxyRequest = async ({path}) => {
    let proxy = await getBestProxy();
    console.log(proxy)
    let agent = new HttpsProxyAgent("1.153.45.236:4009");

    return axios.get(encodeURI(baseUrl + '' + path), {
        httpAgent: agent,
    })
        .then(resultReq => resultReq.data)
        .catch(e => e)
}

const getBestProxy = async () => {
    if (proxyList.length <= 0) {
        proxyList = await axios.get('https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt');
        proxyList = proxyList.data.replace(/\r\n/g, '\n').split('\n');
        proxyList.pop();
    }

    return proxyList.pop()
}

const getRequestInstance = (config) => {
    return axios.create({
        ...config,
    });
};

module.exports = proxyRequest;
