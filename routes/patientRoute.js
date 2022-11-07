const express = require("express");
const app = express();
const patientRouter = express.Router();
const path = require("path");
const bodyParser = require("body-parser");

const bloodReq = require('../models/patient/blood_req');

const ejs = require('ejs');
const puppeteer = require('puppeteer')
var fs = require("fs");

const { writeFile } = require('fs');


const patientController = require("../controller/Patient/patientController");

//Session
const isAuth = require("../middleware/auth");
const { pathToFileURL } = require("url");

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

patientRouter.get("/payment", isAuth.patientAuth, (req, res) => {
    const userData = req.session.user;
    res.render("./patientpanel/payment", { user: userData });
});

patientRouter.get("/recent_req", isAuth.patientAuth, patientController.recentReq);

patientRouter.post('/payment', patientController.payment);



patientRouter.get('/generate_invoice/:id', async (req, res) => {


    const id = req.params.id;
    console.log(id);

    const userData = await bloodReq.findById(id);
    // console.log(userData);


    res.render("./patientpanel/invoice", { user: userData });

    //     //     // launch a new chrome instance
    //     const browser = await puppeteer.launch({
    //         headless: true,
    //         args: ["--no-sandbox", "--disable-setuid-sandbox"]
    //     });



    //     const page = await browser.newPage();
    //     const filePathName = path.resolve(__dirname, '../views/patientpanel/invoice.ejs');

    //     const html = fs.readFileSync(filePathName).toString();

    //     await page.goto("http://localhost:5000/generate_invoice" + html, { waitUntil: 'networkidle0' });


    //     const render = require("ejs").render(html, { user: userData });

    //     await page.setContent(render, {
    //         user: userData
    //     });

    //     const pdfBuffer = await page.pdf({
    //         format: 'A4',

    //     });

    //     // or a .pdf file
    //     await page.pdf({ path: "./user.pdf", format: "legal", });
    //     await browser.close()
    // })();
});



patientRouter.post("/p_logout", patientController.patientLogout);

module.exports = patientRouter;



