const router = require('express').Router();

router.get('/', async (req, res) => {

    res.redirect('vk.com');

});

module.exports = router;