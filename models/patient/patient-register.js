const mongoose = require('mongoose');


const patientSchema = new mongoose.Schema({
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

const patientModel = new mongoose.model('patient-register', patientSchema);
module.exports = patientModel;