const router = require('express').Router();

const { Post, Comment, User } = require('../../models');
const { postById, apiError } = require('./utils');

// GET all posts in JSON
router.get('/', async (req, res) => {
    try {
        const raw = await Post.findAll();

        res.status(200).json({ message: "GET /api/posts successfull!", data: raw.map(post => post.get({ plain: true })) });
    } catch (err) {
        res.status(500).json({ error: true, message: err.message });
    }
});

// GET a single post
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const includeComments = req.query.includeComments;
    const includeAuthors = req.query.includeAuthors;

    if (!includeComments && !includeAuthors) {
        try {
            res.status(200).json({ message: "GET /api/posts successfull!", data: await postById(id) });
        } catch (err) {
            res.status(500).json(apiError(err));
        }
    } else {
        try {
            const includes = [];
            if (includeComments) includes.push({ model: Comment });
            if (includeAuthors) includes.push({ model: User });

            const postData = await Post.findAll({
                where: { id: id },
                include: includes
            });

            res.status(200).json({ message: "GET /api/posts successfull!", data: postData[0].get({ plain: true }) });
        } catch (err) {
            res.status(500).json(apiError(err));
        }
    }
});

// POST a post
router.post('/', async (req, res) => {
    const postData = req.body;
    try {
        const newData = (await Post.create(postData)).get({ plain: true });

        res.status(201).json({ message: "POST /api/posts successfull!", data: newData });
    } catch (err) {
        res.status(500).json(apiError(err));
    }
});

// PUT to update a post
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Post.update(req.body, { where: { id: id } });
        const newPost = await postById(id);
        
        res.status(200).json({ message: "PUT /api/posts successfull!", data: newPost });
    } catch (err) {
        res.status(500).json(apiError(err));
    }
});

//DELETE a post
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedPost = await postById(id);
        await Post.destroy({ where: { id: id } });

        res.status(200).json({ message: "DELETE /api/posts successfull!", data: deletedPost });
    } catch (err) {
        res.status(500).json(apiError(err));
    }
})

module.exports = router;