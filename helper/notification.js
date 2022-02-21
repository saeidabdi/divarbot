function pushNotif(id, text) {
    https.get('https://wirepusher.com/send?id=' + id + '&title=Signal&type=telegram&message=' + encodeURIComponent(text), (resp) => {
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

module.exports = pushNotif