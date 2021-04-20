// Messages
const express = require('express');
const router = express.Router();

const ctrl = require('../controller/message.controller');

router.get('/', ctrl.fetchAllMessages);
router.get('/:id', ctrl.fetchMessage);
router.delete('/:id', ctrl.deleteMessage);

module.exports = router;
