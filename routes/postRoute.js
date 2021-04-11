const router = require('express').Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');

router.route('/posts')
    .post(auth, postController.createPost)
    .get(auth, postController.getPosts)

router.route('/posts/:id')
    .patch(auth,postController.updatePosts)
    .get(auth, postController.getPost)
    .delete(auth,postController.deletePost);

router.get('/all/posts',auth,postController.getAllPost);
router.get('/all/posts/:id',auth,postController.getUserPost);

router.patch('/post/:id/like',auth,postController.likePost);
router.patch('/post/:id/unlike',auth,postController.unlikePost);
router.patch('/savePost/:id',auth, postController.savePost);
router.patch('/unsavePost/:id',auth, postController.unsavePost);

module.exports = router;