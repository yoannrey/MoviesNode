const mongoose = require('mongoose');
 const Schema = mongoose.Schema

 const movieSchema = Schema({
   title : {type: String, required:true},
   category: {type: String, required:true},
   overview: {type: String, required:true},
   country: {type: String, required:true},
   original_language: {type: String, required:true},
   moviePicture: {type: String, required:true}
 })

 const Movie = mongoose.model('Movie', movieSchema);

 module.exports = Movie;