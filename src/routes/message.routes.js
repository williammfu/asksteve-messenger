// Messages
const express = require('express');
/*eslint-disable */
const router = express.Router();
/*eslint-disable */
const ctrl = require('../controller/message.controller');

router.get('/', ctrl.fetchAllMessages);
router.get('/:id', ctrl.fetchMessage);
router.delete('/:id', ctrl.deleteMessage);

module.exports = router;
