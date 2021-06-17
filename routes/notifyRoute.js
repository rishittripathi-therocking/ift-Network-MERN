const router = require('express').Router();
const auth = require('../middleware/auth');
const notifyController = require('../controllers/notifyController');

router.post('/notify',auth, notifyController.createNotify);
router.delete('/notify/:id', auth, notifyController.removeNotify);
router.get('/notifies',auth, notifyController.getNotifies);
router.patch('/isReadNotify/:id', auth, notifyController.isReadNotify);
router.delete('/deleteAllNotify', auth, notifyController.deleteAllNotifications);

module.exports = router;