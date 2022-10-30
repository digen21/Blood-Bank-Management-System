const mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const paymentSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
    },

    fullname: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    town: {
        type: String,
    },
    mob: {
        type: Number,
    },

    // zip: {
    //     type: Number
    // },
    cardname: {
        type: String
    },
    cardnumber: {
        type: String
    },
    date: {
        type: String
    },
    cvv: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const paymentModel = new mongoose.model('payment', paymentSchema);

module.exports = paymentModel;