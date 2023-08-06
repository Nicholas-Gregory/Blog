const router = require('express').Router();
const Post = require('../../models/Post');

const getAllPosts = async () => (await Post.findAll()).map(data => data.get({ plain: true }));

router.get('/', async (req, res) => {
    const posts = await getAllPosts();

    res.render('home', { posts });
})

module.exports = router;