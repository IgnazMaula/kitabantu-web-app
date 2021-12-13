const express = require('express');

const serviceController = require('../controller/serviceController');

const router = express.Router();

router.get('/', serviceController.getAllService);

router.get('/:sid', serviceController.getServiceById);

router.post('/', serviceController.createService);

router.patch('/:sid', serviceController.updateService);

router.delete('/:sid', serviceController.deleteService);

module.exports = router;
