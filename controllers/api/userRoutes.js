const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../../models/User');
const { apiError } = require('../../utils');

router.post('/', async (req, res) => {
    const user = req.body;
    const password = user.password;

    if (password.length < 8) {
        return res.status(500).json(apiError(new Error("Password must be at least 8 characters")));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const userData = (await User.create({
            userName: user.userName,
            email: user.email,
            password: hashedPassword
        })).get({ plain: true });

        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;

            res.status(200).json({ message: 'POST /api/user successful! Logged in!', data: userData});
        });        
    } catch (err) {
        res.status(500).json(apiError(err));
    }
});

router.post('/login', async (req, res) => {
    const byEmail = req.query.byEmail;
    
    try {
        let userData;
        if (byEmail) {
            userData = await User.findOne({ where: { email: req.body.email } });
        } else {
            userData = await User.findOne({ where: { userName: req.body.userName } });
        }

        if (!userData) return res.status(400).json(apiError(new Error('Incorrect username or email')));

        userData = userData.get({ plain: true });
        if (!bcrypt.compareSync(req.body.password, userData.password)) {
            return res.status(400).json(apiError(new Error('Incorrect password')));
        }

        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;

            res.status(200).json({ message: 'Logged in successfully!', data: userData});
        });
    } catch (err) {
        res.status(500).json(apiError(err));
    }
});

module.exports = router;