const express = require("express");
const exphbs = require("express-handlebars")
const cheerio = require("cheerio");
const axios = require("axios"); 
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");

//const request = require("request");
//const mongojs = require("mongojs");
const bodyParser = require("body-parser");

require('dotenv').config()

const app = express();
app.use(logger("dev")); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public")); 



const PORT = process.env.PORT || 8080;


var databaseUri = "mongodb://localhost/Articles"
if (process.env.MONGODB_URI) {
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
}
else {
mongoose.connect(databaseUri);
}

const db = mongoose.connection; 

db.on("error", console.error.bind(console, "connection error:")); 
db.once("open", function() {
console.log("connected to Mongoose")
});



app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./routes/APIRoutes.js");
app.use("/",routes);
 


app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT} this part works`);
    });


module.exports = app;
