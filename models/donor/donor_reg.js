const mongoose = require('mongoose');


const donorSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    createdAt: {
		type: Date,
		default: Date.now
	}
});

const donorRegisterModel = new mongoose.model('donor_register', donorSchema);
module.exports = donorRegisterModel;