//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
name:  {
    type: String, 
    
}, 
body: {
    type: String, 
    required: true, 
    min: 3,
    max: 200,

}, 
});

// Compile model from schema
var Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;