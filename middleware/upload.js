
// const express = require("express");
// const bodyParser = require("body-parser");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const mongoose = require("mongoose");
// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set("view engine", "ejs");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads");
//     },
//     filename: function (req, file, cb) {
//         cb(
//             null,
//             file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//         );
//     },
// });
// const upload = multer({ storage: storage });


// module.exports = upload;