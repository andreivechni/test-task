const config = require('../config/config');

module.exports = function (req, res, next) {
    if(!config.token) {
        res.redirect('http://vast-springs-36717.herokuapp.com/')
    } else {
        next();
    }
};