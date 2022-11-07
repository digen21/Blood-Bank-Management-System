//Declaration Section
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

//Database Section
const patientModel = require('./models/patient/patient-register');
const patientLoginModel = require('./models/patient/patient-login');
const bloodReqModel = require('./models/patient/blood_req');

const uri = process.env.MONGO_URI;
const PORT = process.env.PORT || 8080;






const session = require('express-session');
const mongoSession = require('connect-mongodb-session')(session);
const isAuth = require('./middleware/auth');


const store = new mongoSession({
    uri: uri,
    collection: "mySessions",
});


app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);


//Middleware Section
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded(
    { extended: true }
))
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


const mongoose = require('mongoose');
const url = process.env.MONGO_URI;

mongoose.connect(url);

const db = mongoose.connection;
db.on('error', () => {
    console.error('Error In Database Connectivity');
})

db.once('open', () => {
    console.log("Connected Successfully");
});

//Landing Page
app.get('/', (req, res) => { res.render('home'); });

//Patient Router
const patientRouter = require('./routes/patientRoute');
app.use(patientRouter);

//Donor Route
const donation = require('./routes/donationRoute');
app.use(donation);

//Admin Route
const adminRouter = require('./routes/adminRoute');
app.use(adminRouter);


//About us page
app.get('/aboutus', (req, res) => { res.render('about'); });
app.get('/faqs', (req, res) => { res.render('faqs'); });
app.get('/contactus', (req, res) => { res.render('cus'); });

//404 Error Page
app.use((req, res, next) => { res.render('404page') });



app.get('/test', (req, res) => {
    bloodReqModel.find({}, (err, data) => {
        res.render('./testing', {
            dataList: data
        });
        console.log(data);
    });
});


app.listen(PORT, console.log(`The Port Is Running On http://localhost:${PORT}`));