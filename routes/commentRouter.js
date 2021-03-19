const router = require('express').Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');

router.post('/comment',auth,commentController.createComment);

module.exports = router;