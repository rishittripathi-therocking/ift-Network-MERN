const router = require('express').Router();
const auth = require('../middleware/auth');
const notifyController = require('../controllers/notifyController');

router.post('/notify',auth, notifyController.createNotify);
router.delete('/notify/:id', auth, notifyController.removeNotify);

module.exports = router;