const express = require('express');
const app = express();
const port = process.env.PORT || 5555;
const router = require('./routes/movies')
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/moviesdb', {useNewUrlParser: true});
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`[MongoDB is running]`);
})

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.set('views','./views');

app.get('/', (req, res) => {
  res.send('coucou');
})
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`[App is running on port ${port}]`);
});