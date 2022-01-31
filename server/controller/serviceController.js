const { v4: uuid } = require('uuid');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Service = require('../models/Service');
const User = require('../models/User');

let services = [
    {
        id: '1',
        image: 'https://www.portdevco.com/wp-content/uploads/2020/06/1-PPI-Group-Bagikan-Support-Package-min.jpg',
        name: 'Jasa Cleaning Handal',
        rating: 4.7,
        serviceProvider: 'Service Corpo',
        location: 'Jakarta',
        category: 'House Chores',
        type: 'Group',
        providerId: 1,
    },
    {
        id: '2',
        image: 'https://cms.daihatsu.co.id/uploads/tipsandtrick/1606925279427.jpeg',
        name: 'Mekanik Untuk Segala Jenis Masalah Kendaraan Anda',
        rating: 4.2,
        serviceProvider: 'Mas Rizal',
        location: 'Surabaya',
        category: 'Vehicle Service',
        type: 'Individual',
        providerId: 2,
    },
    {
        id: '3',
        image: 'https://akhlisblog.files.wordpress.com/2013/03/img_20121028_080205.jpg',
        name: 'Instruktur Yoga Professional dan Berpengalaman',
        rating: 4.9,
        serviceProvider: 'Bu Yoga',
        location: 'Denpasar',
        category: 'Wellbeing',
        type: 'Individual',
        providerId: 1,
    },
    {
        id: '4',
        image: 'https://awsimages.detik.net.id/community/media/visual/2021/10/08/catering-pon-papua-2.jpeg?w=1200',
        name: 'Jasa Catering Bu Haji Mahmud Khas Sunda',
        rating: 4.2,
        serviceProvider: 'Bu Haji Mahmud',
        location: 'Surabaya',
        category: 'House Chores',
        type: 'Corporation',
        providerId: 2,
    },
    {
        id: '5',
        image: 'https://cdn.popmama.com/content-images/post/20190201/img-01022019-140032-800-x-420-pixel-230896231d7cc97a5d5f067392782519_600xauto.jpg',
        name: 'Babysitter Handal Untuk Menjaga Anak Anda',
        rating: 4.1,
        serviceProvider: 'WeCare UrChild',
        location: 'Jakarta',
        category: 'House Chores',
        type: 'Corporation',
        providerId: 1,
    },
    {
        id: '6',
        image: 'https://www.finansialku.com/wp-content/uploads/2018/03/Renovasi-Rumah-Sebelum-Dijual-2-Finansialku.jpg',
        name: 'Jasa Bangun dan Renovasi Rumah',
        rating: 4.8,
        serviceProvider: 'Kerja Rodi Crew',
        location: 'Jakarta',
        category: 'House Maintenance',
        type: 'Group',
        providerId: 1,
    },
    {
        id: '7',
        image: 'https://cdn-2.tstatic.net/wartakota/foto/bank/images/penjahit-baju-di-sentra-jahit-manggarai.jpg',
        name: 'Jahit dan Permark Baju dan Pakaian Lainnya',
        rating: 4.3,
        serviceProvider: 'Aryanto',
        location: 'Denpasar',
        category: 'Fashion & Styles',
        type: 'Individual',
        providerId: 1,
    },
    {
        id: '8',
        image: 'https://housingestate.id/wp-content/uploads/2014/04/Jasa-Pindah-Rumah.jpg',
        name: 'Jasa Pindahan Perabotan Rumah Kemana Saja',
        rating: 4.3,
        serviceProvider: 'Minggat Group',
        location: 'Jakarta',
        category: 'Transport & Shuttle',
        type: 'Corporation',
        providerId: 1,
    },
    {
        id: '9',
        image: 'https://cdn-2.tstatic.net/bogor/foto/bank/images/jasa-service-elektronik_20160107_180725.jpg',
        name: 'Service Aneka Perangkat Elektronik Rumah',
        rating: 4.3,
        serviceProvider: 'Agus Soleh',
        location: 'Denpasar',
        category: 'Household Items',
        type: 'Individual',
        providerId: 1,
    },
    {
        id: '10',
        image: 'https://lesprivatjogja.com/wp-content/uploads/2017/08/Les-Privat-PAUD-Jogja-Datang-Kerumah-terbaik-di-yogyakarta.-termurah-mulai-10rb-untuk-materi-calistung-gratis-biaya-transport.jpg',
        name: 'Les Privat Matematika & IPA untuk SD dan SMP',
        rating: 4.6,
        serviceProvider: 'Eka Andriani',
        location: 'Surabaya',
        category: 'Education & Work',
        type: 'Individual',
        providerId: 1,
    },
    {
        id: '11',
        image: 'https://4.bp.blogspot.com/-K2-dxS1cAoY/Wo2aQq7DiNI/AAAAAAAACA4/lGb9XkWGJLIVyOZ63UhGgc4BZWbb7z2JQCLcBGAs/s1600/jasa-pembuatan-taman-di-sawah-besar.jpg',
        name: 'Tukang Taman, Bersih-bersih, dan Perawatan Tanaman',
        rating: 4.3,
        serviceProvider: 'Arif Saputra',
        location: 'Surabaya',
        category: 'House Chores',
        type: 'Individual',
        providerId: 1,
    },
    {
        id: '12',
        image: 'https://cdn-2.tstatic.net/banjarmasin/foto/bank/images/kegiatan-pemeriksaan-kesehatan-hewan-senin-2772020.jpg',
        name: 'Perawatan & Cek Kesehatan Hewan Peliharaan',
        rating: 4.3,
        serviceProvider: 'Pet Care',
        location: 'Denpasar',
        category: 'Pets & Animals',
        type: 'Group',
        providerId: 1,
    },
];

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
    const { name, category, subCategory, price, unit, label, property, description, serviceProvider } = req.body;
    const createdService = new Service({
        name,
        category,
        subCategory,
        price,
        unit,
        label,
        property,
        description,
        serviceProvider,
    });

    let sp;

    try {
        sp = await User.findById(serviceProvider);
    } catch (error) {
        console.log('ad');
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
    const { name, price, property, description } = req.body;
    const serviceId = req.params.sid;

    let service;

    try {
        service = await Service.findById(serviceId);
    } catch (error) {
        return next(new HttpError('Create service failed, please try again later', 500));
    }

    service.name = name;
    service.price = price;
    service.property = property;
    service.description = description;

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

const deleteService = (req, res, next) => {
    const serviceId = req.params.sid;
    if (!services.find((s) => s.id === serviceId)) {
        throw new HttpError('Could not find a service for that id.', 404);
    }
    services = services.filter((s) => s.id !== serviceId);
    res.status(200).json({ message: 'Service Deleted' });
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
