const express = require('express');

const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');
const OrderController = require('../controller/OrderController');

const router = express.Router();

router.get('/', OrderController.getAllOrders);

// router.get('/pending', OrderController.getPendingService);

router.get('/:oid', OrderController.getOrderById);

// router.delete('/:sid', OrderController.deleteService);

// router.get('/user/:uid', OrderController.getServiceByUserId);

router.post('/create-order', fileUpload.single('image'), OrderController.createOrder);

// router.patch('/edit-service/:sid', fileUpload.single('image'), OrderController.updateService);

// router.patch('/manage-status/:sid', OrderController.updateServiceStatus);

//router.use(checkAuth);

module.exports = router;
