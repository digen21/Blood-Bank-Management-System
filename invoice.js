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
var data = {
    // Customize enables you to provide your own templates
    // Please review the documentation for instructions and examples
    "customize": {
        //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
    },
    "images": {
        // The logo on top of your invoice
        "logo": img,
        // The invoice background
        "background": fs.readFileSync('logo2.png', 'base64')
    },
    // Your own data
    "sender": {
        "company": "Sample Corp",
        "address": "Sample Street 123",
        "zip": "1234 AB",
        "city": "Sampletown",
        "country": "Samplecountry"
        //"custom1": "custom value 1",
        //"custom2": "custom value 2",
        //"custom3": "custom value 3"
    },
    // Your recipient
    "client": {
        "company": "Client Corp",
        "address": "Clientstreet 456",
        "zip": "4567 CD",
        "city": "Clientcity",
        "country": "Clientcountry"
        // "custom1": "custom value 1",
        // "custom2": "custom value 2",
        // "custom3": "custom value 3"
    },
    "information": {
        // Invoice number
        "number": "2021.0001",
        // Invoice data
        "date": today,
        // Invoice due date
        "due-date": "31-12-2021"
    },
    // The products you would like to see on your invoice
    // Total values are being calculated automatically
    "products": [
        {
            "quantity": 1,
            "description": "<h3>A+</h3>",
            "tax-rate": null,
            "price": 1200
        },

    ],
    // The message you would like to display on the bottom of your invoice
    "bottom-notice": "<h4><i>Kindly Pay Your Invoice Within 1 Day</i></h4>.",
    // Settings to customize your invoice
    "settings": {
        "currency": "INR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
        // "locale": "	en-IN", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
        // "tax-notation": "gst", // Defaults to 'vat'
        "margin-top": 25, // Defaults to '25'
        "margin-right": 25, // Defaults to '25'
        "margin-left": 25, // Defaults to '25'
        "margin-bottom": 25, // Defaults to '25'
        "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
        "height": "800px", // allowed units: mm, cm, in, px
        "width": "800px", // allowed units: mm, cm, in, px
        "orientation": "landscape", // portrait or landscape, defaults to portrait
    },
    // Translate your invoice to your preferred language
    "translate": {
        // "invoice": "FACTUUR",  // Default to 'INVOICE'
        // "number": "Nummer", // Defaults to 'Number'
        // "date": "Datum", // Default to 'Date'
        // "due-date": "Verloopdatum", // Defaults to 'Due Date'
        // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
        // "products": "Producten", // Defaults to 'Products'
        // "quantity": "Aantal", // Default to 'Quantity'
        // "price": "Prijs", // Defaults to 'Price'
        // "product-total": "Totaal", // Defaults to 'Total'
        // "total": "Totaal" // Defaults to 'Total'
    },
};


//  4.    Let's use the EasyInvoice library and call the "createInvoice" function
easyinvoice.createInvoice(data, function (result) {
    // easyinvoice.download(result.pdf)
    fs.writeFileSync("invoice.pdf", result.pdf, 'base64');
});


app.listen(6000)

