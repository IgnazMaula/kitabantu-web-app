const express = require('express');

const fileUpload = require('../middleware/file-upload');
const checkAuth = require('../middleware/check-auth');
const OrderController = require('../controller/OrderController');

const router = express.Router();

router.get('/', OrderController.getAllOrders);

// router.get('/pending', OrderController.getPendingService);

router.get('/:oid', OrderController.getOrderById);

router.get('/provider/:uid', OrderController.getOrderByProviderId);

router.get('/client/:uid', OrderController.getOrderByClientId);

router.get('/provider/:uid/review', OrderController.getReviewByProviderId);

router.get('/client/:uid/review', OrderController.getReviewByClientId);

// router.delete('/:sid', OrderController.deleteService);

// router.get('/user/:uid', OrderController.getServiceByUserId);

router.post('/create-order', fileUpload.single('image'), OrderController.createOrder);

// router.patch('/edit-service/:sid', fileUpload.single('image'), OrderController.updateService);

router.patch('/manage-status/:oid', OrderController.updateOrderStatus);

router.patch('/:oid/payment', fileUpload.single('image'), OrderController.processPayment);

router.patch('/:oid/review', OrderController.postReview);

//router.use(checkAuth);

module.exports = router;
