const express = require("express");
const exphbs = require("express-handlebars")

const bodyParser = require("body-parser")
const path = require("path");
//const request = require("request");

const mongojs = require("mongojs");
const logger = require("morgan");
const mongoose = require("mongoose");

// will move this to app.js require('dotenv').config()

let app = express();


app.use(express.static("public")); 



const PORT = process.env.PORT || 8080;

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

var mongooseDB = mongoose.connection; 

mongooseDB.on("error", console.error.bind(console, "connection error:")); 
mongooseDB.once("open", function() {
console.log("connected to Mongoose")
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/controller")(app); 

app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT} this part works`);
    });



