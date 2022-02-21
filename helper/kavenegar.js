const Kavenegar = require('kavenegar');
require('dotenv').config();

let api = Kavenegar.KavenegarApi({
    apikey: process.env.KAVENAGAR_API_KEY
});
const sendSms = async ({mobile, category, tokenPost}) => {

    await api.VerifyLookup({
        receptor: mobile || "09028545707",
        token: category,
        token2: tokenPost,
        template: "verify"
    }, function (response, status) {

        console.log(response);
        console.log(status);
        return 'ss';
    })
}

module.exports = sendSms
