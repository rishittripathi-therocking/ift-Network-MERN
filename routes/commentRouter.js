const router = require('express').Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');

router.post('/comment',auth,commentController.createComment);
router.patch('/comment/:id',auth,commentController.updateComment);
router.patch('/comment/:id/like',auth,commentController.likeComment);
router.patch('/comment/:id/unlike',auth,commentController.unlikeComment);
router.delete('/comment/:id/delete',auth,commentController.deleteComment);

module.exports = router;