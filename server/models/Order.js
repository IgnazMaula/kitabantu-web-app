const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    service: { type: mongoose.Types.ObjectId, required: true, ref: 'Service' },
    client: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    provider: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    // serviceName: { type: String, required: true },
    // clientName: { type: String, required: true },
    // providerName: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    paymentType: { type: String, required: true },
    status: { type: String, required: false, default: 'Waiting for Provider Approval' },
    unit: { type: Number, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    details: { type: String, required: true },
    selectedService: [{ type: String, required: false }],
    clientLocation: { type: String, required: true },
    clientAddress: { type: String, required: true },
    clientNumber: { type: String, required: true },
    attachment: {
        type: String,
        required: false,
        default: '',
    },
    receipt: {
        type: String,
        required: false,
        default: '',
    },
    clientCompleted: { type: Boolean, default: false },
    providerCompleted: { type: Boolean, default: false },
    isReviewed: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },
    label1: { type: String, required: false },
    label2: { type: String, required: false },
    label3: { type: String, required: false },
    label4: { type: String, required: false },
    field1: { type: String, required: false },
    field2: { type: String, required: false },
    field3: { type: String, required: false },
    field4: { type: String, required: false },
});

OrderSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Order', OrderSchema);
