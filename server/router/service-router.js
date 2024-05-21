const express = require('express');
const services = require('../Controller/service-controller');
const router = express.Router();

router.route('/services').get(services);

module.exports = router;