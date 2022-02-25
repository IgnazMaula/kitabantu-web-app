const { v4: uuid } = require('uuid');

const HttpError = require('../models/http-error');
const User = require('../models/User');
const Service = require('../models/Service');

const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, '-password');
    } catch (error) {
        return next(new HttpError('Fetching users failed', 500));
    }
    res.json({ users: users.map((u) => u.toObject({ getters: true })) });
};

const getProviderAndClient = async (req, res, next) => {
    let users;
    try {
        users = await User.find({ role: ['Provider', 'Client'] });
    } catch (error) {
        return next(new HttpError('Fetching users failed', 500));
    }
    res.json({ users: users.map((u) => u.toObject({ getters: true })) });
};

const getUserById = async (req, res, next) => {
    const userId = req.params.uid;
    let user;
    try {
        user = await User.findById(userId);
    } catch (error) {
        return next(new HttpError('Could not find user with that id', 500));
    }

    if (!user) {
        return next(new HttpError('Could not find user with that id', 404));
    } else {
        res.json({ user: user.toObject({ getters: true }) });
    }
};

const signup = async (req, res, next) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     throw new HttpError('Invalid inputs passed, please check your data.', 422);
    // }
    const { email, password, name, location, identityNumber, phoneNumber, address, gender, occupation } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        return next(new HttpError('Signing up failed, please try again later', 500));
    }

    if (existingUser) {
        return next(new HttpError('The user email that you tried to register already exist, please login to your account!', 422));
    }

    const createdUser = new User({
        email,
        password,
        name,
        role: 'Client',
        location,
        identityNumber,
        phoneNumber,
        address,
        gender,
        occupation,
        orders: [],
        ratings: [],
        bookmarks: [],
    });

    try {
        await createdUser.save();
    } catch (error) {
        return next(new HttpError('Signing up failed, please try again later', 500));
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const register = async (req, res, next) => {
    const { email, password, name, location, identityNumber, phoneNumber, address, userType, description, vaccinated } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        return next(new HttpError('Signing up failed, please try again later', 500));
    }

    if (existingUser) {
        return next(new HttpError('The user email that you tried to register already exist, please login to your account!', 422));
    }

    const createdUser = new User({
        email,
        password,
        name,
        role: 'Provider',
        location,
        identityNumber,
        phoneNumber,
        address,
        userType,
        description,
        vaccinated,
        services: [],
    });

    try {
        await createdUser.save();
    } catch (error) {
        return next(new HttpError('Signing up failed, please try again later', 500));
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        return next(new HttpError('Login failed, please try again later', 500));
    }

    if (!existingUser || existingUser.password !== password) {
        return next(new HttpError('Failed to login, invalid credential', 401));
    }

    res.json({ message: 'Logged in!', user: existingUser.toObject({ getters: true }) });
};

const updateProvider = async (req, res, next) => {
    const { name, location, identityNumber, phoneNumber, address, userType, vaccinated, description } = req.body;
    const userId = req.params.uid;

    let user;
    try {
        user = await User.findById(userId);
    } catch (error) {
        return next('Something went wrong, could not update user', 500);
    }

    user.name = name;
    user.identityNumber = identityNumber;
    user.phoneNumber = phoneNumber;
    user.userType = userType;
    user.vaccinated = vaccinated;
    user.location = location;
    user.address = address;
    user.description = description;

    try {
        await user.save();
    } catch (error) {
        return next('Something went wrong, could not update user', 500);
    }

    res.status(200).json({ user: user.toObject({ getters: true }) });
};

const updateClient = async (req, res, next) => {
    const { name, location, identityNumber, phoneNumber, address, gender, occupation } = req.body;
    const userId = req.params.uid;

    let user;
    try {
        user = await User.findById(userId);
    } catch (error) {
        return next('Something went wrong, could not update user', 500);
    }

    user.name = name;
    user.identityNumber = identityNumber;
    user.phoneNumber = phoneNumber;
    user.gender = gender;
    user.occupation = occupation;
    user.location = location;
    user.address = address;

    try {
        await user.save();
    } catch (error) {
        return next('Something went wrong, could not update user', 500);
    }

    res.status(200).json({ user: user.toObject({ getters: true }) });
};

const updateProfilePicture = async (req, res, next) => {
    const userId = req.params.uid;

    let user;
    try {
        user = await User.findById(userId);
    } catch (error) {
        return next('Something went wrong, could not update user', 500);
    }

    user.image = req.file.destination + '/' + req.file.filename;

    try {
        await user.save();
    } catch (error) {
        return next('Something went wrong, could not update user', 500);
    }

    res.status(200).json({ user: user.toObject({ getters: true }) });
};

const updateUserActive = async (req, res, next) => {
    const { isActive } = req.body;
    const userId = req.params.uid;

    let user;
    try {
        user = await User.findById(userId);
    } catch (error) {
        return next('Something went wrong, could not update status', 500);
    }

    user.isActive = isActive;

    try {
        await user.save();
    } catch (error) {
        return next('Something went wrong, could not update status', 500);
    }

    res.status(200).json({ user: user.toObject({ getters: true }) });
};

const addBookmark = async (req, res, next) => {
    const { serviceId } = req.body;
    const userId = req.params.uid;

    let user;
    let service;

    try {
        user = await User.findById(userId);
    } catch {
        return next('Something went wrong, could not update bookmark', 500);
    }

    try {
        service = await Service.findById(serviceId);
    } catch {
        return next('Something went wrong, could not update bookmark', 500);
    }
    user.bookmarks.push(service);

    try {
        await user.save();
    } catch (error) {
        return next('Something went wrong, could not update bookmark', 500);
    }
};

const removeBookmark = async (req, res, next) => {
    const { serviceId } = req.body;
    const userId = req.params.uid;
    let user;
    let service;

    try {
        user = await User.findById(userId);
    } catch {
        return next('Something went wrong, could not update bookmark', 500);
    }

    try {
        service = await Service.findById(serviceId);
    } catch {
        return next('Something went wrong, could not update bookmark', 500);
    }

    for (var i = 0; i < user.bookmarks.length; i++) {
        if (user.bookmarks[i].toString() === service.id) {
            user.bookmarks.splice(i, 1);
        }
    }

    try {
        await user.save();
    } catch (error) {
        return next('Something went wrong, could not update bookmark', 500);
    }
};

// const deleteUser = (req, res, next) => {
//     const userId = req.params.uid;
//     users = users.filter((u) => u.id !== userId);
//     res.status(200).json({ message: 'Place Deleted' });
// };

module.exports = {
    getAllUser,
    getProviderAndClient,
    getUserById,
    signup,
    register,
    login,
    updateProvider,
    updateClient,
    updateProfilePicture,
    updateUserActive,
    addBookmark,
    removeBookmark,
};
