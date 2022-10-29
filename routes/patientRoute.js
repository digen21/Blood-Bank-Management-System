const express = require("express");
const app = express();
const patientRouter = express.Router();
const path = require("path");
const bodyParser = require("body-parser");

const patientController = require("../controller/Patient/patientController");

//Session
const isAuth = require("../middleware/auth");

patientRouter.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));

patientRouter.get("/patient_register", (req, res) => { res.render("./patientpanel/patient_reg"); });

patientRouter.post("/patient_register", patientController.patientRegister);

patientRouter.get("/patient_login", (req, res) => { res.render("./patientpanel/patient_login"); });

patientRouter.post("/patient_login", patientController.patientLogin);

patientRouter.get("/patient_dashboard", isAuth.patientAuth, (req, res) => {
    const userData = req.session.user;
    res.render("./patientpanel/patient_dashboard", { user: userData })
});

patientRouter.get("/blood_req", isAuth.patientAuth, (req, res) => { res.render("./patientpanel/blood_req"); });

patientRouter.post("/blood_req", patientController.patientRequest);

patientRouter.get("/payment", isAuth.patientAuth, (req, res) => { res.render("./patientpanel/payment"); });

patientRouter.get("/recent_req", isAuth.patientAuth, patientController.recentReq);



patientRouter.post("/p_logout", patientController.patientLogout);

module.exports = patientRouter;
