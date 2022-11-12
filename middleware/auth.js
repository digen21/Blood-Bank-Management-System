const { render } = require("ejs");

const donorAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect("/donor_login");
    }
};


const adminAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect('/admin_login');
    }

};


const patientAuth = (req, res, next) => {

    if (req.session.isAuth) {
        next();
    } else {

        res.redirect('/patient_login');
    }

}


module.exports = { donorAuth, adminAuth, patientAuth };
