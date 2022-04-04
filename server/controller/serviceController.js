const { v4: uuid } = require('uuid');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Service = require('../models/Service');
const User = require('../models/User');

const getAllService = async (req, res, next) => {
    let services;
    try {
        services = await Service.find({});
    } catch (error) {
        return next(new HttpError('Fetching services failed', 500));
    }
    res.json({ services: services.map((u) => u.toObject({ getters: true })) });
};

const getServiceById = async (req, res, next) => {
    const serviceId = req.params.sid;
    let service;
    try {
        service = await Service.findById(serviceId);
    } catch (error) {
        return next(new HttpError('Could not find service with that id', 500));
    }

    if (!service) {
        return next(new HttpError('Could not find service with that id', 404));
    } else {
        res.json({ service: service.toObject({ getters: true }) });
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

const createService = async (req, res, next) => {
    const { name, category, subCategory, price, unit, label, properties, description, serviceProvider } = req.body;
    const provider = JSON.parse(serviceProvider);
    let imageUpload;
    if (!req.file) {
        imageUpload = 'uploads/images/default-service.png';
    } else {
        imageUpload = req.file.destination + '/' + req.file.filename;
    }
    let prop = JSON.parse(properties);
    const createdService = new Service({
        name,
        category,
        subCategory,
        price,
        unit,
        label,
        properties: prop,
        description,
        serviceProvider: provider,
        image: imageUpload,
    });
    let sp;

    try {
        sp = await User.findById(provider);
    } catch (error) {
        return next(new HttpError('Create service failed, please try again later', 500));
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdService.save({ session: sess });
        await sp.services.push(createdService);
        await sp.save({ session: sess });
        await sess.commitTransaction();
    } catch (error) {
        console.log(error);
        return next(new HttpError('Create service failed, please try again later', 500));
    }

    res.status(201).json({ service: createdService.toObject({ getters: true }) });
};

const updateService = async (req, res, next) => {
    const { name, price, properties, description } = req.body;
    const serviceId = req.params.sid;
    let imageUpload;
    if (!req.file) {
        imageUpload = 'uploads/images/default-service.png';
    } else {
        imageUpload = req.file.destination + '/' + req.file.filename;
    }
    let prop = JSON.parse(properties);

    let service;

    try {
        service = await Service.findById(serviceId);
    } catch (error) {
        return next(new HttpError('Create service failed, please try again later', 500));
    }
    if (!req.file) {
        imageUpload = service.image;
    }

    service.name = name;
    service.price = price;
    service.properties = prop;
    service.description = description;
    service.image = imageUpload;

    try {
        await service.save();
    } catch (error) {
        return next('Something went wrong, could not update status', 500);
    }

    res.status(200).json({ service: service.toObject({ getters: true }) });
};

const updateServiceStatus = async (req, res, next) => {
    const { status } = req.body;
    const serviceId = req.params.sid;

    let service;
    try {
        service = await Service.findById(serviceId);
    } catch (error) {
        return next('Something went wrong, could not update status', 500);
    }

    service.status = status;

    try {
        await service.save();
    } catch (error) {
        return next('Something went wrong, could not update status', 500);
    }

    res.status(200).json({ service: service.toObject({ getters: true }) });
};

const deleteService = async (req, res, next) => {
    const serviceId = req.params.sid;

    let service;
    try {
        service = await Service.findById(serviceId).populate('serviceProvider');
    } catch (error) {
        return next('Something went wrong, could not delete service', 500);
    }

    if (!service) {
        return next('Something went wrong, could not delete service', 404);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await service.remove({ session: sess });
        service.serviceProvider.services.pull(service);
        service.serviceProvider.bookmarks.pull(service);
        await service.serviceProvider.save({ session: sess });
        await sess.commitTransaction();
    } catch (error) {
        return next('Something went wrong, could not delete service', 500);
    }

    res.status(200).json({ message: 'Service deleted' });
};

module.exports = {
    getAllService,
    getServiceById,
    getServiceByUserId,
    getPendingService,
    createService,
    updateService,
    updateServiceStatus,
    deleteService,
};
