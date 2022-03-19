const User = require('../../db/model/user')


module.exports = async (req, res) => {
    let userData = req.query;

    if (!await User.findOne({mobile: req.query.mobile, notif_id: req.query.notif_id}))
        await new User({
            name: userData.name,
            mobile: userData.mobile,
            notif_id: userData.notif_id,
            config: [],
        }).save()



    res.send('ok insert new user with this option')
}