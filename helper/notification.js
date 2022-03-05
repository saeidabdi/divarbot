const https = require('https');

function pushNotif({id, text, title, action}) {
    https.get('https://wirepusher.com/send?id=' + id + '&title=' + title + '&type=divar&message=' + text + '&action=' + action, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            console.log(JSON.parse(data).explanation);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}
https://wirepusher.com/send?id=jSaSmpsmT&title=TestTitle&message=TestBody&type=YourCustomType

module.exports = pushNotif