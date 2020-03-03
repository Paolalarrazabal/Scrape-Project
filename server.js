const express = require("express");
let app = express();
const exphbs = require("express-handlebars")

const bodyParser = require("body-parser")

const mongojs = require("mongojs");
const logger = require("morgan");
const mongoose = require("mongoose");

const axios = require("axios");
const cheerio = require("cheerio");
// will move this to app.js require('dotenv').config()


app.use(express.static("public")); 


const PORT = process.env.PORT || 8080;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT} this part works`);
    });



