const { v4: uuid } = require('uuid');

const HttpError = require('../models/http-error');

let users = [
    {
        id: '1',
        image: 'https://pm1.narvii.com/6878/701bf7222e8056959e330192a0396edfff213752r1-1080-1030v2_hq.jpg',
        email: 'ignazmaula@gmail.com',
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

const getAllUser = (req, res, next) => {
    res.status(200).json({ users });
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

const createUser = (req, res, next) => {
    const { username, firstName, lastName, role } = req.body;
    const user = {
        id: uuid(),
        username,
        firstName,
        lastName,
        role,
    };
    users.push(user);
    res.status(201).json({ user });
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
    createUser,
    updateUser,
    deleteUser,
};
