const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 5 },
    name: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String, required: true },
    image: {
        type: String,
        required: false,
        default: 'https://library.kissclipart.com/20180906/wtq/kissclipart-user-profile-clipart-user-profile-computer-icons-15b5c3086edf7512.png',
    },
    // Properties of Service Client
    gender: { type: String, required: false, default: undefined },
    occupation: { type: String, required: false, default: undefined },
    // Properties of Service Provider
    description: { type: String, required: false, default: undefined },
    userType: { type: String, required: false, default: undefined },
    vaccinated: { type: Boolean, required: false, default: undefined },

    services: [{ type: String }],

    orders: [{ type: String }],
    ratings: [{ type: String }],
    bookmarks: [{ type: String }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
