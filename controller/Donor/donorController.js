//Validators from Models
const donor = require("../../models/donor/donation");
const register = require("../../models/donor/donor_reg");
const login = require("../../models/donor/donor_login");
const bgData = require("../../models/donor/bloodgroup");

const bcrypt = require("bcrypt");

//Donation
const insertDonor = async (req, res) => {
  try {


    const userId = req.session.user._id;
    console.log("user id is" + userId);


    const Donor = new donor({
      ...req.body, userId
    });


    await Donor.save();
    // console.log(Donor);

    res.redirect('/donation')

  } catch (error) {
    if (error) {
      res.render('./donorpanel/donation', { message: "Please Fill All The Details" });
    }
  }
};

//Donor Registration
const registerDonor = async (req, res) => {
  try {
    const { username, email, password, createdAt } = req.body;

    console.log(req.body);

    let user = await register.findOne({ email });
    if (user) {
      res.render('./donorpanel/donor_login', { message: "User Already Exists..." });
      // return res.redirect("/donor_login");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    user = new register({
      username,
      email,
      password: hashPassword,
      createdAt,
    });

    await user.save();
    res.redirect("/donor_login");
  } catch (error) {
    res.send(error.message);
  }
};

//Donor Login
const donorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);

    const user = await register.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.render("./donorpanel/donor_login", {
          message: "Invalid Email Or Password",
        });
      }
    } else {
      return res.render("./donorpanel/donor_login", {
        message: "User With This Email Is Not Exists",
      });
    }
    req.session.isAuth = true;
    req.session.user = user;


    const userData = await register.findById({ _id: user._id });
    console.log("From Dashboard" + userData);
    res.render("./donorpanel/donor_dashboard", { user: userData });

    // res.redirect('/donor_dashboard');
  } catch (error) {
    res.send(error.message);
  }
};


const loadDonorInfo = async (req, res) => {

};


const donorLogout = async (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/donor_login");
    }
  });
};


//Working
const recentDonation = async (req, res) => {

  try {
    const userId = req.session.user._id;
    console.log(userId);

    const data = await donor.find({ userId });

    res.render('./donorpanel/recent_Donation', { dataList: data });

  } catch (error) {
    console.log(error.message)
  }

}

module.exports = { insertDonor, registerDonor, donorLogin, donorLogout, recentDonation, loadDonorInfo };
