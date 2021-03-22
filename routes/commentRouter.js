const router = require('express').Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');

router.post('/comment',auth,commentController.createComment);
router.patch('/comment/:id',auth,commentController.updateComment);

module.exports = router;