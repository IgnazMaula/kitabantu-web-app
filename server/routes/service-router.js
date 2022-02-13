const express = require('express');

const fileUpload = require('../middleware/file-upload');
const serviceController = require('../controller/serviceController');

const router = express.Router();

router.get('/', serviceController.getAllService);

router.get('/pending', serviceController.getPendingService);

router.get('/:sid', serviceController.getServiceById);

router.get('/user/:uid', serviceController.getServiceByUserId);

router.post('/create-service', fileUpload.single('image'), serviceController.createService);

router.patch('/edit-service/:sid', fileUpload.single('image'), serviceController.updateService);

router.patch('/manage-status/:sid', serviceController.updateServiceStatus);

// router.delete('/:sid', serviceController.deleteService);

module.exports = router;
