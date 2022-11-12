const mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const donationSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        required: true,
    },


    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    mob: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    bloodgroup: {
        type: String,
        required: true
    },
    disease: {
        type: String,
        required: true
    },
    ml:
        { type: Number },

    address: {
        type: String,
        required: true
    },
    town: {
        type: String,
        required: true
    },
    lastdonated: {
        type: String,
        required: true
    },
    donationdate: {
        type: Date,

    },
    image: {
        data: Buffer,
        contentType: String
    },

    status: {
        type: "string",
        enum: ["approved", "pending", "rejected"],
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const donationModel = new mongoose.model('donationModel', donationSchema);

module.exports = donationModel;