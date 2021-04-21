// Webhook
const express = require('express');
/*eslint-disable */
const router = express.Router();
/*eslint-disable */
const ctrl = require('../controller/webhook.controller');

router.get('/', ctrl.simpleFetch);
router.post('/', ctrl.sendRequest);

module.exports = router;
