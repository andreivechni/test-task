const router = require('express').Router();

router.get('/', async (req, res) => {

    res.redirect(oAuthUrl);

});

module.exports = router;