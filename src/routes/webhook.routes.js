// Webhook
const express = require('express');
const router = express.Router();

const ctrl = require('../controller/webhook.controller');

router.get('/', ctrl.simpleFetch);
router.post('/', ctrl.sendRequest);

module.exports = router;
