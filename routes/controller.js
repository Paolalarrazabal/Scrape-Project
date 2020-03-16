const db = require("../models/article");


const axios = require("axios");
const cheerio = require("cheerio");


module.exports = function (app) {

app.get("/", function (req, res) {
    res.render("index");
   
    });



app.get("/api/scrape", function (req, res) {
        // request via axios 
        axios.get("https://www.vox.com").then(function(response) {
        // Load the HTML into cheerio and save it to a variable
        const $ = cheerio.load(response.data);
        // An empty array to save the data that we'll scrape
        const results = {};

        // Select each element in the HTML body from which you want information.
        // NOTE: Cheerio selectors function similarly to jQuery's selectors,
        // but be sure to visit the package's npm page to see how it works
        $("h2.c-entry-box--compact__title").each(function(i, element) {

             results.title = $(element).children().text();
             results.link = $(element).find("a").attr("href");

            //results.push({
                //title: title,
                //link: link
                //});

            // Save these results in an object that we'll push into the results array we defined earlier 
        });

        // Log the results once you've looped through each of the elements found with cheerio
        console.log(results);
        res.redirect("/"); 
        });
    });

    



};
