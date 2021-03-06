const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 5 },
    name: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String, required: true },
    identityNumber: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    isActive: { type: Boolean, default: true },
    image: {
        type: String,
        required: false,
        default: 'uploads/images/default-profile.png',
    },
    // Properties of Service Client
    gender: { type: String, required: false, default: undefined },
    occupation: { type: String, required: false, default: undefined },
    // Properties of Service Provider
    userType: { type: String, required: false, default: undefined },
    description: { type: String, required: false, default: undefined },
    vaccinated: { type: Boolean, required: false, default: undefined },
    bank: { type: String, required: false, default: 'BANK' },
    accountNumber: { type: String, required: false, default: 'XXXXXXXXXXXX' },
    // Collections of Service Client
    orders: [{ type: mongoose.Types.ObjectId, required: false, ref: 'Order' }],
    bookmarks: [{ type: mongoose.Types.ObjectId, required: false, ref: 'Service' }],
    // Collections of Service Provider
    services: [{ type: mongoose.Types.ObjectId, required: false, ref: 'Service' }],
    ordersReceived: [{ type: mongoose.Types.ObjectId, required: false, ref: 'Order' }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
