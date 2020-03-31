const mongoose = require('mongoose');
const Schema = mongoose.Schema

const catSchema = Schema({
    name: { type: String }
});

const Category = mongoose.model('Category', catSchema);

 module.exports = Category;