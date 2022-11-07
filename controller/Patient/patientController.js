const express = require('express');

const app = express();
var easyinvoice = require('easyinvoice');


const ejs = require('ejs');
const puppeteer = require('puppeteer')
var fs = require("fs");
const path = require("path");

const img = fs.readFileSync('logo.png', 'base64');
var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var today = new Date();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));

const { writeFile } = require('fs')


//Importing  Models
const bloodRequest = require("../../models/patient/blood_req");
const patientModel = require("../../models/patient/patient-register");
const bgModel = require("../../models/donor/bloodgroup");



const paymentModel = require('../../models/patient/payment');

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");



//Login Checked
const patientLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await patientModel.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Invalid password");
        return res.render("./patientpanel/patient_login");
      }
    } else {
      console.log("User With This Email Not Found");
      return res.render("./patientpanel/patient_login", {
        message: "Invalid Email Or Password",
      });
    }

    req.session.isAuth = true;
    req.session.user = user;
    // console.log(req.session);

    const userData = await patientModel.findById({ _id: user._id });
    res.render("./patientpanel/patient_dashboard", { user: userData });


  } catch (error) {
    console.log(error.message);
  }
};


const patientRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let user = await patientModel.findOne({ email });
    if (user) {
      return res.render("./patientpanel/patient_reg", {
        message: "User Already Exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    user = new patientModel({
      username,
      email,
      password: hashPassword,
    });

    await user.save();
    setTimeout(() => {
      res.status(200).redirect("/patient_login")
    }, 2000);


  } catch (error) {
    console.log(error.message);
  }
};

const patientRequest = async (req, res) => {
  try {
    const userId = req.session.user._id;
    console.log({ ...req.body, userId });

    const result = await new bloodRequest({ ...req.body, userId }).save();
    console.log("result", result);

    res.status(200).redirect("/payment");
  } catch (error) {
    res.send(error.message);
  }
};

const recentReq = async (req, res) => {
  try {
    const userId = req.session.user._id;
    // console.log({ userId });

    const data = await bloodRequest.find({ userId });
    // console.log(user);

    res.render("./patientpanel/recent_req", { dataList: data });
  } catch (error) {
    console.log(error.message);
  }
};


const payment = async (req, res) => {
  try {

    const userId = req.session.user._id;
    const { fullname, email, address, town, mob, cardname, cardnumber, date, cvv, createdAt } = req.body

    const hashCvv = await bcrypt.hash(cvv, 10);
    const hashCardNumber = await bcrypt.hash(cardnumber, 10);

    const user = new paymentModel({
      userId, fullname, email, address, town, mob, cardname, cardnumber: hashCardNumber, date, cvv: hashCvv, createdAt
    });

    await user.save();
    setTimeout(() => {
      res.redirect('/patient_dashboard')
    }, 5000);

  } catch (error) {
    console.log(error.message);
  }

};


const downloadInvoice = async (req, res) => {
  const id = req.body.id;
  console.log(id);

  const userData = req.session.user;
  console.log("userData", userData);

  const user = await bloodRequest.findById(id);
  console.log(user);

  if (user) {
    res.render('./patientpanel/invoice', { user: userData });

  }




}

const patientLogout = async (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/patient_login");
    }
  });
};





module.exports = {
  patientLogin,
  patientRegister,
  patientRequest,
  patientLogout,
  recentReq,
  payment,
  downloadInvoice
};
