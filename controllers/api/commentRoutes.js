const router = require('express').Router();

const Comment = require('../../models/Comment');
const { apiError } = require('./utils');

// POST a comment
router.post('/', async (req, res) => {
    const commentData = req.body
    try {
        await Comment.create(commentData);

        res.status(201).json({ message: "POST /api/comments successful!", data: commentData });
    } catch (err) {
        res.status(500).json(apiError(err));
    }
});

module.exports = router;