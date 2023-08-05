const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../../models/User');
const { apiError } = require('../../utils');

router.post('/', async (req, res) => {
    const user = req.body;
    const hashedPassword = await bcrypt.hash(user.password, 10);

    try {
        User.create({
            userName: user.userName,
            email: user.email,
            password: hashedPassword
        });

        res.json({ message: 'POST /api/user successful!' });
    } catch (err) {
        res.status(500).json(apiError(err));
    }
});

router.post('/login', async (req, res) => {

});

module.exports = router;