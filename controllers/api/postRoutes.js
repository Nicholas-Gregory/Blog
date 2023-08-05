const router = require('express').Router();
const Post = require('../../models/Post');

const postById = async id => (await Post.findAll({ where: { id: id } }))[0].get({ plain: true });

const apiError = err => ({ error: true, message: err.message });

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
            if (includeComments) includes.push({ model: 'comment' });
            if (includeAuthors) includes.push({ model: 'user' });

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
    try {
        await Post.create(req.body);

        res.status(201).json({ message: "POST /api/posts successfull!", data: req.body });
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