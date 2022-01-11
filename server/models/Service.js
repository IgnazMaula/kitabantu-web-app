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
        default: 'https://library.kissclipart.com/20180906/wtq/kissclipart-user-profile-clipart-user-profile-computer-icons-15b5c3086edf7512.png',
    },
    status: { type: String, required: true, default: 'Pending' },
    serviceProvider: { type: String, required: false, default: undefined },
});

ServiceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Service', ServiceSchema);
