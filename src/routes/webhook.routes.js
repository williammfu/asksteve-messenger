// Webhook
const express = require('express');
const router = new express.Router();
const ctrl = require('../controller/webhook.controller');

router.get('/', ctrl.simpleFetch);
router.post('/', ctrl.sendRequest);

module.exports = router;
