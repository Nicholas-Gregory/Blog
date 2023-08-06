const router = require('express').Router();
const { Post, User } = require('../../models');

const getAllPosts = async () => (await Post.findAll({ include: [{ model: User }] })).map(data => data.get({ plain: true }));

router.get('/', async (req, res) => {
    const posts = (await getAllPosts()).map(post => ({
        id: post.id,
        title: post.title,
        contents: post.contents,
        creatorName: post.user.userName,
        creatorId: post.creatorId,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
    }));

    res.render('home', { posts });
})

module.exports = router;