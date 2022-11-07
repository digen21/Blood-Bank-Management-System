const express = require("express");
const app = express();
const adminRouter = express.Router();
const path = require("path");
const bodyParser = require("body-parser");

// Models
const donor = require("../models/donor/donation");



const adminController = require('../controller/Admin/adminController');




//Session
const isAuth = require('../middleware/auth');

app.set("view engine", "ejs");

// adminRouter.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

const admin = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
}


//Accessing donor_login.ejs
adminRouter.get('/admin_login', (req, res) => { res.render('./adminpanel/admin_login') })
adminRouter.post("/admin_login", adminController.adminLogin);


//Getting All The BloodGroup Totals(Perfectly)  
adminRouter.get("/admin_dash", adminController.getBloodGroup);

adminRouter.get('/donordata', adminController.getDonorData);

adminRouter.get('/patientdata', adminController.getPatientData);



//Done
adminRouter.post('/approve', adminController.approve);

//Done
adminRouter.post('/reject', adminController.reject);

//Done
adminRouter.post('/papprove', adminController.patientApprove);

//Done
adminRouter.post('/preject', adminController.patientReject);



adminRouter.post("/a_logout", adminController.adminLogout);

// res.render('./adminpanel/admin_panel');

module.exports = adminRouter;
