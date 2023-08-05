const router = require('express').Router();

const User = require('../../models/User');
const { apiError } = require('../../utils');

// // GET a single user by their email address
// router.get('/:email', async (req, res) => {
//     try {
//         const user = (await User.findAll({ where: { email: req.params.email } }))[0].get({ plain: true });
//     } catch (err) {
//         res.status(500).json(apiError(err));
//     }
// });

// // GET a single user by their username
// router.get('/:username', (req, res) => {

// })

router.post('/', async (req, res) => {

})

module.exports = router;