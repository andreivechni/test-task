const rp = require('request-promise-native');

const router = require('express').Router();

const config = require('../config/config');

const defaultOauthUrl = `https://oauth.vk.com`;
const oAuthUrl = `${defaultOauthUrl}/authorize?client_id=${config.appId}&display=page&redirect_uri=${config.redirectUri}&scope=friends&response_type=code&v=5.80`;
const getTokenUrl = `${defaultOauthUrl}/access_token?client_id=${config.appId}&client_secret=${config.appProtectedKey}&redirect_uri=${config.redirectUri}&code=`;

router.get('/', async (req, res) => {

    res.redirect(oAuthUrl);

});

router.get('/code', async (req, res) => {

    let token;
    try {
        token = await rp(getTokenUrl + req.query.code);
    }
    catch (e) {
        res.send(e.message);
        return;
    }
    token = JSON.parse(token);
    config.token = token;

    res.redirect('http://vast-springs-36717.herokuapp.com/hello');

});

module.exports = router;
