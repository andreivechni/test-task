const config = require('../config/config');

const rp = require('request-promise-native');

const router = require('express').Router();


router.get('/', async (req, res) => {

    let authorizedUser;
    try {
        authorizedUser = await rp(`https://api.vk.com/method/users.get?user_id=${config.token.user_id}&fields=photo_200_orig&access_token=${config.token.access_token}&v=${config.apiV}`);
        authorizedUser = JSON.parse(authorizedUser);
    }
    catch (e) {
        console.log(e);
        res.send(e.message);
        return;
    }


    let friends;
    try {
        friends = await rp(`https://api.vk.com/method/friends.get?user_id=${config.token.user_id}&order=random&count=5&fields=nickname,photo_200_orig&access_token=${config.token.access_token}&v=${config.apiV}`);
        friends = JSON.parse(friends);
    }
    catch (e) {
        res.send(e.message);
        return;
    }

    let data = {
        user: authorizedUser.response[0],
        friends: friends.response.items
    };

    console.log(data);

    let friendsFullNames = [];
    for (i of friends.response.items) {
        friendsFullNames.push(`${i.first_name} ${i.last_name}`);
    }

    res.render('index', {user: `${data.user.first_name} ${data.user.last_name}`, userPic: `${data.user.photo_200_orig}`, friends: data.friends });
});

module.exports = router;