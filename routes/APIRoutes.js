var express = require("express");
var router = express.Router();

var Comments = require("../models/comments.js");
var Articles = require("../models/article.js"); 
var scrapeArticles = require("../models/articles"); 

const cheerio = require("cheerio");
const axios = require("axios");

// html route 

router.get("/", function (req, res) {
    res.redirect("/api/scrape");
}); 

router.get("/api/scrape", function (req, res) {
    // request via axios 
    axios.get("https://www.vox.com").then(function(response) {
    // Load the HTML into cheerio and save it to a variable
    const $ = cheerio.load(response.data);
    // An empty array to save the data that we'll scrape
    let titlesArray = []; 
        


    // Select each element in the HTML body from which you want information.
    // NOTE: Cheerio selectors function similarly to jQuery's selectors,
    // but be sure to visit the package's npm page to see how it works
    $("div.c-entry-box--compact__body").each(function(i, element) {

        let results = {};

        results.title = $(element).find("h2").text();
        results.link = $(element).find("a").attr("href");
        results.summary = $(element).find("p").text(); 

        //results.push({
            //title: title,
            //link: link
            //});

//&&  results.link !== "" 
        // Save these results in an object that we'll push into the results array we defined earlier 
        if(results.title !== "" && results.summary !== ""){
            if(titlesArray.indexOf(results.title) == -1){
                titlesArray.push(results.title);

                scrapeArticles.count({ title: results.title}, function (err, test){
                if(test == 0){
                    var entry = new scrapeArticles (results);

                    entry.save(function(err, doc) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(doc);
                    }
                    });
                } else {
                    console.log('Duplicate data, not saved to db')
                }
                });
            } else {
            console.log("not saved to db")
            }
        } else{
            console.log("missing data, not saved to db")
        }
     

           
        });

         
        

    // Log the results once you've looped through each of the elements found with cheerio
    //console.log(results)
    res.redirect("/articles");
    });

    router.get("/articles", function (req, res) {
        scrapeArticles.find().sort({_id: 1}).limit(7)
        .exec(function(err, doc) {
            if (err) {
                console.log(err); 
            } else {
                
                var hbsObject = {scrapeArticles: doc}
                res.render("index", hbsObject); 
                console.log(doc);
            }
        });
    });
      
    
    router.get("/articles/json", function (req, res) {
        scrapeArticles.find({}, function(err, doc) {
            if (err) {
                console.log(err); 
            } else {
                res.json(doc);
            }
        });
        
    });

    router.post("/api/comments/:id", function(req, res) {
        var user = req.body.name;
        var commentBody = req.body.comment;
        var articleId = req.params.id;

        var commentObj = {
            name: user,
            body: commentBody
        };

        var newComment = new Comments(commentObj)

        newComment.save(function(err, doc) {
            if (err) {
                console.log(err); 
            }   else {
                console.log(doc._id); 
                console.log(articleId)

                scrapeArticles.findByIdAndUpdate({_id: req.params.id}, {$push: {comment: doc._id} }, {new: true})
                .exec(function(err, doc) {
                    if (err) {
                        console.log(err);
                    }   else {
                        res.redirect("/")
                    }
                });
            }
        });
    });

    router.delete("/delete/comment/:id", function (req, res){
        Comments.findByIdAndRemove(req.params.id, function (err, doc) {
            if (err) {
                console.log(err);
                } else {
                res.sendStatus(200);
                }
            
    });

  });

});


module.exports = router;