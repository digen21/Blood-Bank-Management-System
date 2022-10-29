
const mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


const bloodReqSchema = new mongoose.Schema({
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
    dob: {
        type: String,
        required: true
    },
    mob: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },
    age: {
        type: String,
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
    ml: {
        type: Number,
        required: true
    },

    address: {
        type: String,
        required: true
    },
    town: {
        type: String,
        required: true
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



const bloodReqModel = mongoose.mongoose.model('bloodReqModel', bloodReqSchema);

module.exports = bloodReqModel;


