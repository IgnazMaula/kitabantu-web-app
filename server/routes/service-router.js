const express = require('express');

const serviceController = require('../controller/serviceController');

const router = express.Router();

router.get('/', serviceController.getAllService);

router.get('/:sid', serviceController.getServiceById);

module.exports = router;
