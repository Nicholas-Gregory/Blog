const Post = require('../../models/Post');

module.exports = {
   postById: async id => (await Post.findAll({ where: { id: id } }))[0].get({ plain: true }),
   apiError: err => ({ error: true, message: err.message })
};