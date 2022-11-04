const express = require('express');
const path = require("path")
const app = express();
var easyinvoice = require('easyinvoice');
var fs = require('fs');
const img = fs.readFileSync('logo.png', 'base64');

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var today = new Date();

/*
    3.  Let's create a data object.
        This object will contain all the data we would like to be visible on our invoice.
        We will add data later in our demo.
*/
const data = {
    "customize": {
    },
    "images": {
        "logo": img,
        "background": fs.readFileSync('logo2.png', 'base64')
    },
    "sender": {
        "company": "Donate Life",
        "address": "VV Nagar",
        "zip": "3881120",
        "city": "Anand",
        "country": "India"
    },
    "client": {
        "company": req.session.userId,
        "address": "Clientstreet 456",
        "zip": "4567 CD",
        "city": "Clientcity",
        "country": "Clientcountry"
    },
    "information": {
        "number": "2021.0001",
        "date": today,
        "due-date": "31-12-2021"
    },
    "products": [
        {
            "quantity": 2,
            "description": "<h3>A+</h3>",
            "tax-rate": null,
            "price": 1200
        },

    ],
    "bottom-notice": "<h4><i>Kindly Pay Your Invoice Within 1 Day</i></h4>.",
    "settings": {
        "currency": "INR",
        "margin-top": 25,
        "margin-right": 25,
        "margin-left": 25,
        "margin-bottom": 25,
        "format": "A4",
        "height": "800px",
        "width": "800px",
        "orientation": "landscape",
    },

    "translate": {
    },
};


//  4.    Let's use the EasyInvoice library and call the "createInvoice" function
easyinvoice.createInvoice(data, function (result) {
    // easyinvoice.download(result.pdf)
    fs.writeFileSync("new.pdf", result.pdf, 'base64');
});

// module.exports = data;




var pdf = require("pdf-creator-node");
var fs = require("fs");


var html = fs.readFileSync("", "utf8");

var options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: '<div style="text-align: center;">Author: @Donate Life</div>'
    },
    footer: {
        height: "28mm",
        contents: {
            first: 'Cover page',
            2: 'Second page', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page'
        }
    }
};


var users = [
    {
        name: "Shyam",
        age: "26",
    },
    {
        name: "Navjot",
        age: "26",
    },
    {
        name: "Vitthal",
        age: "26",
    },
];
var document = {
    html: html,
    data: {
        users: users,
    },
    path: "./output.pdf",
    type: "",
};


pdf
    .create(document, options)
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {
        console.error(error);
    });







    // (async () => {

    //     const browser = await puppeteer.launch()
    //     const page = await browser.newPage()

    //     await page.goto('http://localhost:5000/generate_invoice', {
    //         waitUntil: 'networkidle0'
    //     })

    //     const pdf = await page.pdf({
    //         printBackground: true,
    //         format: 'Letter'
    //     });


    //     const filePath = path.join(__dirname, "print.ejs")
    //     const render = ejs.renderFile(filePath, { data: userData }, (err, html) => {
    //         if (err) {
    //             return res.send(err.message)
    //         }

    //         // enviar para o navegador
    //         return res.send(html)
    //     });

    //     console.log(render);

    //     writeFile("./report.pdf", pdf, {}, (err) => {
    //         if (err) {
    //             return console.error(err.message)
    //         }
    //         console.log('success!')
    //     });
    //     await browser.close()
    // })();