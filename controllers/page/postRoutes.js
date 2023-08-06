const router = require('express').Router();
const Post = require('../../models/Post');

router.get('/:id', async (req, res) => {
    const post = (await Post.findOne({ where: { id: req.params.id } })).get({ plain: true });

    res.render('post', post);
});

module.exports = router;