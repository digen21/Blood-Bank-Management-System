const mongoose = require('mongoose');


const donorLoginSchema = new mongoose.Schema({
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

const donorLoginModel = new mongoose.model('donor_login', donorLoginSchema);
module.exports = donorLoginModel;