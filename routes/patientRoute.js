const express = require("express");
const app = express();
const patientRouter = express.Router();
const path = require("path");
const bodyParser = require("body-parser");



const ejs = require('ejs');
const puppeteer = require('puppeteer')
var fs = require("fs");


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

patientRouter.get("/payment", isAuth.patientAuth, (req, res) => {
    const userData = req.session.user;
    res.render("./patientpanel/payment", { user: userData });
});

patientRouter.get("/recent_req", isAuth.patientAuth, patientController.recentReq);

patientRouter.post('/payment', patientController.payment);

patientRouter.get('/generate_invoice', (req, res) => {


    const userData = req.session.user;
    res.render("./patientpanel/invoice", { user: userData });

    (async () => {
        // launch a new chrome instance
        const browser = await puppeteer.launch({
            headless: true
        });

        const page = await browser.newPage();
        const filePathName = path.resolve(__dirname, '../views/patientpanel/invoice.ejs');

        const html = fs.readFileSync(filePathName, 'utf8')
        await page.goto("http://localhost:5000/generate_invoice" + html);
        await page.setContent(html, {
            waitUntil: 'domcontentloaded'
        });
        const pdfBuffer = await page.pdf({
            format: 'A4'
        });

        // or a .pdf file
        await page.pdf({ path: "./user.pdf", format: pdfBuffer });
        await browser.close()
    })();



})


// patientRouter.get('/generate_invoice', isAuth.patientAuth, (req, res) => {
//     const userData = req.session.user;
//     res.render("./patientpanel/invoice", { user: userData })

// });

// patientRouter.post('/generate_invoice', patientController.generateInvoice);

patientRouter.post("/p_logout", patientController.patientLogout);

module.exports = patientRouter;
