const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const mongoSession = require('connect-mongodb-session')(session);
const path = require('path');

const bcrypt = require('bcrypt');
// const { findOne } = require('./models/user');
const app = express();

const mongoURI = 'mongodb://localhost:27017/sessions';
const patientModel = require('./models/patient/patient-register');
const patientLoginModel = require('./models/patient/patient-login');


let imgPath = path.resolve('img', 'logo.png');
// Function to encode file data to base64 encoded string
function base64_encode(img) {
    // read binary data
    let png = fs.readFileSync(img);
    // convert binary data to base64 encoded string
    return new Buffer.from(png).toString('base64');
};

mongoose.connect(mongoURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(res => {
    console.log("Connected")
});



//Storing Session In Database
const Store = new mongoSession({
    uri: mongoURI,
    collection: 'sessions',

});



//Middleware Section
app.use(session({
    secret: 'Some Super Secret',
    resave: false,
    saveUninitialized: false,
    store: Store
}));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        req.session.error = "You have to Login first";
        res.redirect("/login");
    }
};


//Landing Page
app.get('/', (req, res) => {

    req.session.isAuth = true;
    console.log(req.session);
    console.log(req.session.id);     //Telling Browser That Using Specific Session
    res.render('home');
});



app.get('/login', (req, res) => {
    res.render('login');
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;


    const user = await patientModel.findOne({ email });
    // const displayUser = await userModel.findOne({username});

    if (!user) {
        req.session.error = "Invalid User Details";
        return res.redirect('/login');
    }


    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        req.session.error = "Invalid Password";
        return res.redirect('/login');
    }


    req.session.isAuth = true;
    // req.session.username = displayUser;
    res.redirect('dashboard');
    console.log(req.body);
});

app.get('/register', (req, res) => {
    // const error = req.session.error;
    // delete req.session.error;
    res.render('register');
});



app.post('/register', async (req, res) => {


    const { username, email, password, password2 } = req.body;
    console.log(req.body);

    let user = await patientModel.findOne({ email });

    if (user) {
        req.session.error = "User Already Exists";
        return res.render('register');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    user = new patientModel({
        username,
        email,
        password: hashPassword,
        password2
    })

    await user.save();
    res.render('login');
    // console.log(req.body);
    console.log(user);
});


app.get('/dashboard', isAuth, async (req, res) => {
    res.render('dashboard')

});


app.post('/logout', (req, res) => {

    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/login')
    })
});












/*
    1.  Let's import the easyinvoice library so we can use it.
    2.  Let's import the built-in NodeJS fs library,
        so we can interact with the file system to save our invoice 
*/
var easyinvoice = require('easyinvoice');
var fs = require('fs');

/*  
    3.  Let's create a data object. 
        This object will contain all the data we would like to be visible on our invoice.
        We will add data later in our demo.
*/
var data = {
    "client": {
        "company": "DigenMore",
        "address": "Navsari",
        "zip": "396445",
        "city": "Navsari",
        "country": "India"
    },
    "sender": {
        "company": "Donate Life",
        "address": "VV Nagar",
        "zip": "388120",
        "city": "Anand",
        "country": "India"
    },
    "images": {
        logo: `${base64_encode(imgPath)}`,
    }

};

//  4.    Let's use the EasyInvoice library and call the "createInvoice" function
easyinvoice.createInvoice(data, function (result) {
    /*  
        5.  The 'result' variable will contain our invoice as a base64 encoded PDF
            Now let's save our invoice to our local filesystem so we can have a look!
            We will be using the 'fs' library we imported above for this.
    */
    fs.writeFileSync("invoice.pdf", result.pdf, 'base64');


});

app.listen(3000);