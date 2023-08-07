const router = require('express').Router();

const { Post, Comment, User } = require('../../models');
const { postById, apiError, auth } = require('../../utils/utils');

// POST a post
router.post('/', auth, async (req, res) => {
    const postData = req.body;
    postData.creatorId = req.session.userId;

    try {
        const newData = (await Post.create(postData)).get({ plain: true });

        res.status(201).json({ message: "POST /api/posts successful!", data: newData });
    } catch (err) {
        res.status(500).json(apiError(err));
    }
});

// PUT to update a post
router.put('/:id', auth, async (req, res) => {
    const id = req.params.id;

    try {
        await Post.update(req.body, { where: { id: id } });
        const newPost = await postById(id);
        
        res.status(200).json({ message: "PUT /api/posts successful!", data: newPost });
    } catch (err) {
        res.status(500).json(apiError(err));
    }
});

//DELETE a post
router.delete('/:id', auth, async (req, res) => {
    const id = req.params.id;
    try {
        const deletedPost = await postById(id);
        await Post.destroy({ where: { id: id } });

        res.status(200).json({ message: "DELETE /api/posts successful!", data: deletedPost });
    } catch (err) {
        res.status(500).json(apiError(err));
    }
})

module.exports = router;