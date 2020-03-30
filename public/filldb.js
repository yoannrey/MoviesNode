const express = require('express');
const app = express();
const port = process.env.PORT || 5555;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/moviesdb', {useNewUrlParser: true});
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`[MongoDB is running]`);
})

const Movie = require('../routes/models/movie')
const request = require('request');
let ids = [];

function fillIds(arr) {
    return new Promise((resolve, reject) => {
        const url = 'https://api.themoviedb.org/3/movie/popular?api_key=8983a24df86dd2ea15d86499d5ba0900&language=en-US&page=2'
        request(url, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            for (let i = 0; i < body.results.length; i++)
                arr.push(body.results[i].id);
            resolve(arr);   
        })
    })
}

function fillInfos(ids) {
    for (let h = 0; h < ids.length; h++) {
        const url = `https://api.themoviedb.org/3/movie/${ids[h]}?api_key=8983a24df86dd2ea15d86499d5ba0900&language=en-US`
        request(url, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            const newMovie = new Movie({title: body.title,
                category: body.genres[0].name,
                overview: body.overview,
                country: body.production_countries[0].name,
                original_language: body.original_language,
                moviePicture: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + body.poster_path
            });
            newMovie.save((err, movie) => {
                if(err) console.error(err)
                console.log(movie)
            })
        })
    }
}
           
            // const newMovie = new Movie(body.title.replace(/ /g,'aa'),
            //     body.genres[0].name,
            //     body.overview,
            //     'XX',
            //     body.production_countries[0].name,
            //     body.original_language,
            //     'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + body.poster_path);
            // newMovie.save((err, movie) => {
            //     if(err) console.error(err)
            //     console.log(movie)
            //     res.json(movie);
    //         // })
    //     })
    // }

const promise = fillIds(ids)
const promise2 = fillInfos(ids)
promise.then(() => {
    fillInfos(ids);
    // mongoose.connection.close()
})