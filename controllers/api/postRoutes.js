const router = require('express').Router();
const Post = require('../../models/Post');

// GET all posts in JSON
router.get('/', async (req, res) => {
    try {
        const raw = await Post.findAll();
        res.status(200).json({ message: "GET /api/posts successfull!", data: raw.map(post => post.get({ plain: true })) });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
});

// POST a post
router.post('/', async (req, res) => {
    try {
        await Post.create(req.body);
        res.status(201).json({ message: "POST /api/posts successfull!", data: req.body });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
})

module.exports = router;