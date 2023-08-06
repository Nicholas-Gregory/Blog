const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

const { apiError } = require('../../utils')

router.get('/:id', async (req, res) => {
    try {
        const post = (await Post.findOne({ 
            where: { 
                id: req.params.id 
            }, 
            include: [{ model: Comment, include: [User] }, { model: User }] 
        })).get({ plain: true });

        res.render('post', { post , loggedIn: req.session.loggedIn, userId: req.session.userId });
    } catch (err) {
        res.status(500).send(apiError(err));
    } 
});

module.exports = router;