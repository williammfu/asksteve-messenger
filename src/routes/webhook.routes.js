// Webhook
<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const ctrl = require('../controller/webhook.controller');

router.get('/', ctrl.simpleFetch);
router.post('/', ctrl.sendRequest);

module.exports = router;
=======
const express = require('express')
const router = express.Router()

const ctrl = require('../controller/webhook.controller')

router.get('/', ctrl.simpleFetch)
router.post('/', ctrl.sendRequest)

module.exports = router
>>>>>>> 12899b94ccc243c1b4dab8c3095b8eac57220026
