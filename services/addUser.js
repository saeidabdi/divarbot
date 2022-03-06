const fs = require("fs");
const UsersList = 'db/users.json'


module.exports = async (req, res) => {


    let {word, cat, name, mobile, id} = req.query;

    if (!fs.existsSync(UsersList))
        fs.writeFileSync(UsersList, '[]', null, 4);
    const List = JSON.parse(fs.readFileSync(UsersList));

    const findList = List.find(l => l.word === word && l.cat === cat && l.name === name && l.mobile === mobile && l.id === id);
    if (findList)
        return res.send(`exists this user with this option`);

    List.push({
        word: word,
        cat: cat,
        name: name,
        mobile: mobile,
        id: id,
    })
    fs.writeFileSync(UsersList, JSON.stringify(List), null, 4)

    res.send('ok insert new user with this option')
}