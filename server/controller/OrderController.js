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

const getServiceByUserId = async (req, res, next) => {
    const userId = req.params.uid;
    let services;
    try {
        services = await Service.find({ serviceProvider: userId });
    } catch (error) {
        return next(new HttpError('Fetching places failed', 500));
    }

    if (!services) {
        return next(new HttpError('Could not find service with that id' + services, 404));
    } else {
        res.json({ services: services.map((service) => service.toObject({ getters: true })) });
    }
};

const getPendingService = async (req, res, next) => {
    let services;
    try {
        services = await Service.find({ status: 'Pending' });
    } catch (error) {
        return next(new HttpError('Fetching services failed', 500));
    }
    res.json({ services: services.map((u) => u.toObject({ getters: true })) });
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
    } = req.body;
    selectedServiceArr = JSON.parse(selectedService);
    let imageUpload;
    if (!req.file) {
        // imageUpload = 'uploads/images/default-service.png';
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

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
};
