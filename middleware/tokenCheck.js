const config = require('../config/config');

module.exports = function (req, res, next) {
    if(!config.token) {
        res.redirect('http://localhost:3000/auth')
    } else {
        next();
    }
};