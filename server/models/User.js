const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    location: { type: String, required: true },
    // Properties of Service Client
    gender: { type: String, required: false },
    // Properties of Service Provider
    description: { type: String, required: false },
    userType: { type: String, required: false },

    services: [{ type: String }],

    orders: [{ type: String }],
    ratings: [{ type: String }],
    bookmarks: [{ type: String }],
});

module.exports = mongoose.model('User', userSchema);
