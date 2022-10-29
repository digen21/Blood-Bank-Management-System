const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");

//Logic for donor
const donorController = require("../controller/Donor/donorController");

const donor = require('../models/donor/donation')

//Session
const isAuth = require('../middleware/auth');

app.set("view engine", "ejs");

router.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));





//Accessing donor_reg.ejs
router.get("/donor_reg", (req, res) => { res.render("./donorpanel/donor_reg"); });


//Accessing donor_login.ejs
router.get("/donor_login", (req, res) => { res.render("./donorpanel/donor_login"); });




router.get("/donor_dashboard", isAuth.donorAuth, (req, res) => {
    const userData = req.session.user;

    res.render("./donorpanel/donor_dashboard", { user: userData });

});




//Accessing Donation.ejs
router.get("/donation", isAuth.donorAuth, (req, res) => {
    res.render("./donorpanel/donation");
});

//Business Logic Comes from Controller Folder
router.post("/donation", donorController.insertDonor); //Insert Controller

router.post("/donor_reg", donorController.registerDonor); //Register Route

router.post("/donor_login", donorController.donorLogin); //Login Route

router.get('/recent_donation', isAuth.donorAuth, donorController.recentDonation);





router.post('/d_logout', donorController.donorLogout);

module.exports = router;
