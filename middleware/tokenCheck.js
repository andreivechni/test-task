const config = require('../config/config');
const PORT = process.env.PORT || 3000;


const redirectUrl = process.env.dev ? `${config.dev.redirectUri}:${PORT}` : `${config.production.redirectUri}`;

module.exports = function (req, res, next) {
    if(!config.token) {
        res.redirect(redirectUrl);
    } else {
        next();
    }
};