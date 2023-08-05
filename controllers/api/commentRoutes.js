const router = require('express').Router();

const Comment = require('../../models/Comment');
const { apiError } = require('./utils');

// POST a comment
router.post('/', async (req, res) => {
    const commentData = req.body
    try {
        const newData = (await Comment.create(commentData)).get({ plain: true });

        res.status(201).json({ message: "POST /api/comments successful!", data: newData });
    } catch (err) {
        res.status(500).json(apiError(err));
    }
});

module.exports = router;