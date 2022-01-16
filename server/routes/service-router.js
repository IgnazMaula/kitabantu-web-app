const express = require('express');

const serviceController = require('../controller/serviceController');

const router = express.Router();

router.get('/', serviceController.getAllService);

router.get('/:sid', serviceController.getServiceById);

router.get('/user/:uid', serviceController.getServiceByUserId);

router.post('/create-service', serviceController.createService);

router.patch('/:sid', serviceController.updateService);

router.delete('/:sid', serviceController.deleteService);

module.exports = router;
