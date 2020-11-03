// imports
const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Routes
router.get('/', messageCtrl.findAllMessages);
router.get('/:id', messageCtrl.findOneMessage);
router.post('/', multer, messageCtrl.createMessage);
router.put('/:id', multer, messageCtrl.modifyMessage);
router.delete('/:id', messageCtrl.deleteMessage);

module.exports = router;