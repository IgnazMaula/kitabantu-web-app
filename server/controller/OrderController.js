const { v4: uuid } = require('uuid');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Order = require('../models/Order');
const Service = require('../models/Service');
const User = require('../models/User');

const getAllOrders = async (req, res, next) => {
    let order;
    try {
        order = await Order.find({});
    } catch (error) {
        return next(new HttpError('Fetching order failed', 500));
    }
    res.json({ orders: order.map((u) => u.toObject({ getters: true })) });
};

const getOrderById = async (req, res, next) => {
    const orderId = req.params.oid;
    let order;
    try {
        order = await Order.findById(orderId);
    } catch (error) {
        return next(new HttpError('Could not find order with that id', 500));
    }

    if (!order) {
        return next(new HttpError('Could not find order with that id', 404));
    } else {
        res.json({ order: order.toObject({ getters: true }) });
    }
};

const getOrderByProviderId = async (req, res, next) => {
    const providerId = req.params.uid;
    let order;
    try {
        order = await Order.find({ provider: providerId });
    } catch (error) {
        return next(new HttpError('Could not find order with that provider id', 500));
    }

    if (!order) {
        return next(new HttpError('Could not find order with that provider id', 404));
    } else {
        res.json({ orders: order.map((u) => u.toObject({ getters: true })) });
    }
};

const getOrderByClientId = async (req, res, next) => {
    const clientId = req.params.uid;
    let order;
    try {
        order = await Order.find({ client: clientId });
    } catch (error) {
        return next(new HttpError('Could not find order with that client id', 500));
    }

    if (!order) {
        return next(new HttpError('Could not find order with that client id', 404));
    } else {
        res.json({ orders: order.map((u) => u.toObject({ getters: true })) });
    }
};

const getReviewByServiceId = async (req, res, next) => {
    const serviceId = req.params.sid;
    let order;
    try {
        order = await Order.find({ service: serviceId, isReviewed: true });
    } catch (error) {
        return next(new HttpError('Could not find order with that provider id', 500));
    }

    if (!order) {
        return next(new HttpError('Could not find order with that provider id', 404));
    } else {
        res.json({ orders: order.map((u) => u.toObject({ getters: true })) });
    }
};

const getReviewByClientId = async (req, res, next) => {
    const clientId = req.params.uid;
    let order;
    try {
        order = await Order.find({ client: clientId, isReviewed: true });
    } catch (error) {
        return next(new HttpError('Could not find order with that client id', 500));
    }

    if (!order) {
        return next(new HttpError('Could not find order with that client id', 404));
    } else {
        res.json({ orders: order.map((u) => u.toObject({ getters: true })) });
    }
};
const createOrder = async (req, res, next) => {
    const {
        service,
        client,
        provider,
        totalPrice,
        paymentType,
        unit,
        date,
        time,
        details,
        selectedService,
        clientLocation,
        clientAddress,
        clientNumber,
        label1,
        label2,
        label3,
        label4,
        field1,
        field2,
        field3,
        field4,
    } = req.body;
    selectedServiceArr = JSON.parse(selectedService);
    let imageUpload;
    if (!req.file) {
        imageUpload = '';
    } else {
        imageUpload = req.file.destination + '/' + req.file.filename;
    }
    const createdOrder = new Order({
        service,
        client,
        provider,
        totalPrice,
        paymentType,
        unit,
        date,
        time,
        details,
        selectedService: selectedServiceArr,
        clientLocation,
        clientAddress,
        clientNumber,
        attachment: imageUpload,
        label1,
        label2,
        label3,
        label4,
        field1,
        field2,
        field3,
        field4,
    });
    let sp;
    let sc;
    try {
        sp = await User.findById(provider);
    } catch (error) {
        return next(new HttpError('Create order failed, please try again later', 500));
    }
    try {
        sc = await User.findById(client);
    } catch (error) {
        return next(new HttpError('Create order failed, please try again later', 500));
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdOrder.save({ session: sess });
        await sp.ordersReceived.push(createdOrder);
        await sc.orders.push(createdOrder);
        await sp.save({ session: sess });
        await sc.save({ session: sess });
        await sess.commitTransaction();
    } catch (error) {
        console.log(error);
        return next(new HttpError('Create order failed, please try again later', 500));
    }

    res.status(201).json({ order: createdOrder.toObject({ getters: true }) });
};

const processPayment = async (req, res, next) => {
    const orderId = req.params.oid;
    let imageUpload;
    if (!req.file) {
        imageUpload = '';
    } else {
        imageUpload = req.file.destination + '/' + req.file.filename;
    }
    let order;
    try {
        order = await Order.findById(orderId);
    } catch (error) {
        return next('Something went wrong, could not update status', 500);
    }

    order.receipt = imageUpload;
    order.isPaid = true;
    order.status = 'Service Incoming';

    try {
        await order.save();
    } catch (error) {
        return next('Something went wrong, could not update status', 500);
    }

    res.status(200).json({ order: order.toObject({ getters: true }) });
};

const updateOrderStatus = async (req, res, next) => {
    const { status } = req.body;
    const orderId = req.params.oid;

    let order;
    try {
        order = await Order.findById(orderId);
    } catch (error) {
        return next('Something went wrong, could not update status', 500);
    }

    order.status = status;

    try {
        await order.save();
    } catch (error) {
        return next('Something went wrong, could not update status', 500);
    }

    res.status(200).json({ order: order.toObject({ getters: true }) });
};

const postReview = async (req, res, next) => {
    const { rating, review } = req.body;
    const orderId = req.params.oid;

    let order;
    try {
        order = await Order.findById(orderId);
    } catch (error) {
        return next('Something went wrong, could not update status', 500);
    }

    order.rating = rating;
    order.review = review;
    order.isReviewed = true;

    try {
        await order.save();
    } catch (error) {
        return next('Something went wrong, could not update status', 500);
    }

    res.status(200).json({ order: order.toObject({ getters: true }) });
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    getOrderByProviderId,
    getOrderByClientId,
    getReviewByServiceId,
    getReviewByClientId,
    updateOrderStatus,
    processPayment,
    postReview,
};
