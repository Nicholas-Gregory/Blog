const router = require('express').Router();
const { auth, apiError } = require('../../utils/utils');

const { User, Post } = require('../../models');

router.get('/', auth, async (req, res) => {
    try {
        const posts = (await User.findByPk(req.session.userId, {
            include: [{ model: Post }]
        })).get({ plain: true }).posts;

        res.render('dashboard', { posts });
    } catch (err) {
        res.status(500).json(apiError(err));
    }
});

router.get('/edit/:id', auth, async (req, res) => {
    try {  
        const post = (await Post.findByPk(req.params.id)).get({ plain: true });

        res.render('edit', { post });
    } catch (err) {
        res.status(500).json(apiError(err));
    }
})

module.exports = router;