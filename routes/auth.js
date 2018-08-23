const rp = require('request-promise-native');

const router = require('express').Router();

const config = require('../config/config');

const redirect_uri = process.env.dev ? `${config.dev.redirectUri}:3000` : `${config.production.redirectUri}`;

const defaultOauthUrl = `https://oauth.vk.com`;
const oAuthUrl = `${defaultOauthUrl}/authorize?client_id=${config.appId}&display=page&redirect_uri=${redirect_uri}/code&scope=friends&response_type=code&v=5.80`;
const getTokenUrl = `${defaultOauthUrl}/access_token?client_id=${config.appId}&client_secret=${config.appProtectedKey}&redirect_uri=${redirect_uri}/code&code=`;

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

    res.redirect(`${redirect_uri}/hello`);

});

module.exports = router;
