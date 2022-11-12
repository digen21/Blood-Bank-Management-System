const express = require("express");
const app = express();
const adminRouter = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
var multer = require('multer');




app.set("view engine", "ejs");

// adminRouter.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(bodyParser.json())




const admin = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

const donor = require("../../models/donor/donation"); //Donation
const patinentReq = require("../../models/patient/blood_req"); //Blood Request
const bgData = require("../../models/donor/bloodgroup");
const imgModel = require('../../models/imgModel');



const adminLogin = async (req, res, error) => {
  const { email, password } = req.body;
  if (req.body.email == admin.email && req.body.password == admin.password) {
    res.redirect("/admin_dash");
  } else {
    res.send("Invalid Email id or password");
  }
};

//Sorting Blood Group
const getBloodGroup = async (req, res) => {
  //   const b = await donor.aggregate([
  //     {
  //       $match: {
  //         bloodgroup: {
  //           $in: ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"], //Matching The Multiple Fields(Blood Types)
  //         },
  //       },
  //     },

  //     {
  //       $group: {
  //         _id: "$bloodgroup",
  //         totalml: {
  //           $sum: "$ml", // Sum Of The Multiple Fields
  //         },
  //       },
  //     },
  //     { $sort: { _id: 1 } }, //Sorting
  //     ]);

  //Storing Sum Values

  const b = await bgData.find();

  //   console.log(b);

  const sum0 = b[0].totalml; //A+
  const sum1 = b[1].totalml; //A-
  const sum2 = b[2].totalml; //AB+
  const sum3 = b[3].totalml; //AB-
  const sum4 = b[4].totalml; //B+
  const sum5 = b[5].totalml; //B-
  const sum6 = b[6].totalml; //O+
  const sum7 = b[7].totalml; //O-

  res.render("./adminpanel/admin_panel", {
    //By Creating Array Rendering The Sum On Webpage
    dataList: [sum0, sum1, sum2, sum3, sum4, sum5, sum6, sum7],
  });
};

//Getting Donor Data
const getDonorData = async (req, res) => {
  donor.find({}, function (err, data) {
    req.session.isAuth = true;
    res.render("./adminpanel/donordata", {
      dataList: data,
    });
  });
};

// -----------------------For Donor --------------------------

//Approve
const approve = async (req, res) => {
  const id = req.body.id;
  console.log(req.body.id);

  const user = await donor.findById(id);
  // console.log(user);
  const bloodgroup = user.bloodgroup;
  const ml = user.ml;
  console.log(user.status);
  if (user.status == "pending" || user.status == "rejected") {
    const bg = await bgData.updateOne({ bloodgroup }, { $inc: { totalml: ml } });

    const a = await donor.updateOne(
      {
        _id: id,
      },
      { $set: { status: "approved" } }
    );
    res.send(a);
  }


};

//Reject
const reject = async (req, res) => {
  const id = req.body.id;
  // console.log(id);
  const a = await donor.updateOne(
    {
      _id: id,
    },
    { $set: { status: "rejected" } }
  );
  res.send(a);
  // console.log(a);
};

//For Patient

const getPatientData = async (req, res) => {
  patinentReq.find({}, function (err, data) {
    res.render("./adminpanel/patientdata", {
      Data: data,
    });
  });
};

const patientApprove = async (req, res) => {
  const id = req.body.id;

  const user = await patinentReq.findById(id);

  const bloodgroup = user.bloodgroup;
  const ml = user.ml;

  if (user.status == "pending" || user.status == "rejected") {
    const bg = await bgData.updateOne({ bloodgroup }, { $inc: { totalml: -ml } });

    const a = await patinentReq.updateOne(
      {
        _id: id,
      },
      { $set: { status: "approved" } }
    );

    res.send(a);
    console.log(a);
  } else {
    console.log("Req already updated");
  }
}



//Reject
const patientReject = async (req, res) => {
  const id = req.body.id;
  const a = await patinentReq.updateOne(
    {
      _id: id,
    },
    { $set: { status: "rejected" } }
  );
  res.send(a);
  console.log(a);
};

const adminLogout = async (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/admin_login");
    }
  });
};



//Image Storage





const uploadImage = (req, res) => {
  try {


    // console.log(JSON.stringify(req.body));

  } catch (error) {
    console.log(error.message);
  }


};




module.exports = {
  getBloodGroup,
  getDonorData,
  approve,
  reject,
  getPatientData,
  patientApprove,
  patientReject,
  adminLogin,
  adminLogout,
  uploadImage

};




