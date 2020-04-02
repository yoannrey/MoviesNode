const express = require('express');
const Movie = require('./models/movie')
const Category = require('./models/catergorie')
const api = express.Router()
const apiKey = '8983a24df86dd2ea15d86499d5ba0900'
const multer = require('multer')
const upload = multer({dest: __dirname + '/uploads/images'});

api.get('/all', (req,res)=> {
  Movie.find({}, (err,movies) => {
    if(err) console.error(err)
    Category.find({}, (err,categories) => {
      res.render('movies',{movies: movies, categories: categories});
    })
  })
})

api.get('/add', (req,res) => {
  Category.find({}, (err, categories) => {
    res.render('_form', {categories: categories});
  })
})
api.post('/add', (req,res) => {
  const newMovie = new Movie(req.body)
  newMovie.save((err, movie) => {
    if(err) console.error(err)
    console.log(movie)
    res.json(movie);
  })
})

api.get('/gestion', (req, res) => {
  Movie.find({}, (err, movies) => {
    res.render('gestion', {movies: movies})
  })
})

api.get('/:id', (req,res)=> {
  Movie.findById(req.params.id, (err, movie) => {
    if(err) console.error(err)
    res.render('movie',{movie: movie})
  })
})

api.get('/edit/:id', (req,res) => {
  Movie.findById(req.params.id, (err, movie) => {
      if(err) console.error(err)
      Category.find({}, (err,categories) => {
        res.render('_formEdit',{movie: movie, categories: categories});
      })
  })
})

api.post('/edit/:id', upload.single('moviePicture'), (req, res) => {
  console.log(req.file)
  const picture = req.file ? req.file.path : "" 
  Movie.findByIdAndUpdate(req.params.id, { title: req.body.title,
  category: req.body.category,
  overview: req.body.overview,
  country: req.body.country,
  original_language: req.body.original_language,
  moviePicture: picture }, (err) => {    if (err) console.error(err)
    res.redirect('/api/v1/all')
  })
  // Movie.findByIdAndUpdate(id, (err, movie) => {
  //   console.log(movie)
  // if(err) console.error(err)
  // Object.assign(movie, req.body).save((err, movie) => {
  //   console.log(req.body)
  //  //movie.title = req.body.
  //   setTimeout(() => {
  //      res.redirect('/api/v1/all')
  //   }, 1000)
  //   })
  // })
})

api.get('/remove/:id', (req,res)=> {
  Movie.findByIdAndDelete(req.params.id, (err, movie) => {
    if(err) console.error(err)
    res.redirect('/api/v1/gestion')
  })
})
module.exports = api;