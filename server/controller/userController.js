const { v4: uuid } = require('uuid');

const HttpError = require('../models/http-error');
const User = require('../models/User');

let users = [
    {
        id: '1',
        image: 'https://pm1.narvii.com/6878/701bf7222e8056959e330192a0396edfff213752r1-1080-1030v2_hq.jpg',
        email: 'ignazmaula@gmail.com',
        password: 'abc123',
        firstName: 'Ignaz',
        lastName: 'Maula',
        role: 'Provider',
        dateOfBirth: null,
        location: 'Bali',
        services: [{ serviceId: 1 }, { serviceId: 2 }],
        orders: [],
        bookmarks: [],
        ratings: [],
    },
    {
        id: '2',
        image: 'https://i.pinimg.com/originals/e4/11/34/e41134a306b35c44600f08127ee407b0.jpg',
        email: 'hecker@gmail.com',
        password: 'abc123',
        firstName: 'Pablo',
        lastName: 'Escobar',
        role: 'Provider',
        dateOfBirth: null,
        location: 'Bali',
        services: [
            {
                serviceId: 1,
            },
            {
                serviceId: 2,
            },
        ],
        orders: [],
        bookmarks: [],
        ratings: [],
    },
];

const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, '-password');
    } catch (error) {
        return next(new HttpError('Fetching users failed', 500));
    }
    res.json({ users: users.map((u) => u.toObject({ getters: true })) });
};

const getUserById = (req, res, next) => {
    const userId = req.params.uid;
    const user = users.find((u) => {
        return u.id === userId;
    });
    if (!user) {
        next(new HttpError('Could not find user with that id', 404));
    } else {
        res.json({ user });
    }
};

const signup = async (req, res, next) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     throw new HttpError('Invalid inputs passed, please check your data.', 422);
    // }
    const { email, password, name, location, gender, occupation } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        return next(new HttpError('Signing up failed, please try again later', 500));
    }

    if (existingUser) {
        return next(new HttpError('User already exist, please Log in', 422));
    }

    const createdUser = new User({
        email,
        password,
        name,
        role: 'Client',
        location,
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
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     throw new HttpError('Invalid inputs passed, please check your data.', 422);
    // }
    const { email, password, name, location, userType, description, vaccinated } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        return next(new HttpError('Signing up failed, please try again later', 500));
    }

    if (existingUser) {
        return next(new HttpError('User already exist, please Log in', 422));
    }

    const createdUser = new User({
        email,
        password,
        name,
        role: 'Provider',
        location,
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

    res.json({ message: 'Logged in!' });
};

const updateUser = (req, res, next) => {
    const { firstName, lastName } = req.body;
    const userId = req.params.uid;
    const user = { ...users.find((u) => u.id === userId) };
    const userIndex = users.findIndex((u) => u.id === userId);

    user.firstName = firstName;
    user.lastName = lastName;

    users[userIndex] = user;
    res.status(200).json({ user });
};

const deleteUser = (req, res, next) => {
    const userId = req.params.uid;
    users = users.filter((u) => u.id !== userId);
    res.status(200).json({ message: 'Place Deleted' });
};

module.exports = {
    getAllUser,
    getUserById,
    signup,
    register,
    login,
    updateUser,
    deleteUser,
};
