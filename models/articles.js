//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const scrapeArticlesSchema = new Schema({
title:  {
    type: String, 
    required: true,
    unique: true
}, 
link: {
    type: String, 
    required: true,
    unique: true
},
summary: {
    type: String, 
    required: true,

}, 

// comment is an array 

comment: [
    {
        type: Schema.Types.ObjectId, 
        ref: "Comment"
    }
]
});

// Compile model from schema
const scrapeArticles = mongoose.model('scrapeArticles', scrapeArticlesSchema);
module.exports = scrapeArticles;