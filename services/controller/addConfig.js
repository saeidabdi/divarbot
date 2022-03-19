const User = require('../../db/model/user')


module.exports = async (req, res) => {
    let configData = req.query;

    let user = await User.findOne({mobile:configData.mobile})
    let config = user.config;
    config.push(req.query)
    if (user)
        await user.update({
            config: config,
        });



    res.send('ok insert new user with this option')
}