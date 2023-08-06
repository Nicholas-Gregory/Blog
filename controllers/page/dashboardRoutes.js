const router = require('express').Router();
const { auth } = require('../../utils');

router.get('/', auth, (req, res) => {
    res.render('dashboard');
});

module.exports = router;