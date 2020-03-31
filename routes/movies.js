const express = require('express');
const Movie = require('./models/movie')
const Category = require('./models/catergorie')
const api = express.Router()
const apiKey = '8983a24df86dd2ea15d86499d5ba0900'


api.get('/all', (req,res)=> {
  Movie.find({}, (err,movies) => {
    if(err) console.error(err)
    Category.find({}, (err,categories) => {
      res.render('movies',{movies: movies, categories: categories});
    })
  })
})
api.get('/add', (req,res) => {
  res.render('_form')
})
api.post('/add', (req,res) => {
  const newMovie = new Movie(req.body)
  newMovie.save((err, movie) => {
    if(err) console.error(err)
    res.json(movie);
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
  res.render('_formEdit', {movie: movie})
  })
})

api.post('/edit/:id', (req,res)=> {
const id = req.params.id;
Movie.findById(id, (err, movie) => {
 if(err) console.error(err)
 Object.assign(movie, req.body).save((err, movie) => {
   if(err) console.error(err)
   res.redirect('/api/v1/all')
  })
  })
})

api.get('/remove/:id', (req,res)=> {
  Movie.findByIdAndDelete(req.params.id, (err, movie) => {
    if(err) console.error(err)
    res.redirect('/api/v1/all')
  })
})
module.exports = api;