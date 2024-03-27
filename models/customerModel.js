const mongoose = require('mongoose');
const { Schema } = mongoose;

const CustomerSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Customer = mongoose.model('customer', CustomerSchema);
module.exports = Customer