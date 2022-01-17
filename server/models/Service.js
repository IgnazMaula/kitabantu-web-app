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
    property: [{ type: String, required: false }],
    description: { type: String, required: false },
    image: {
        type: String,
        required: false,
        default: 'https://i.pinimg.com/originals/23/ec/f9/23ecf945d6f184b0bd3d6df1e905ea56.jpg',
    },
    serviceProvider: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    status: { type: String, required: true, default: 'Pending' },
    rating: [
        {
            score: Number,
            review: String,
        },
    ],
});

ServiceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Service', ServiceSchema);
