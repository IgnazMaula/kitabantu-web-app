const HttpError = require('../models/http-error');

const users = [
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
    res.json({ users: users });
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

exports.getAllUser = getAllUser;
exports.getUserById = getUserById;
