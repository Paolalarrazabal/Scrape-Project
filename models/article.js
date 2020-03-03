//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
title:  {
    type: String, 
    required: true
}, 
link: {
    type: String, 
    required: true
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
var Article = mongoose.model('Article', ArticleSchema );

