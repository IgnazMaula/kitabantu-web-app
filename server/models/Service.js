const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    price: { type: String, required: true },
    unit: { type: String, required: true },
    label: { type: String, required: true },
    properties: [{ type: String, required: false }],
    description: { type: String, required: false },
    image: {
        type: String,
        required: false,
        default: 'uploads/images/default-service.png',
    },
    serviceProvider: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    status: { type: String, required: true, default: 'Pending' },
    ratings: [
        {
            score: Number,
            review: String,
        },
    ],
});

ServiceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Service', ServiceSchema);
