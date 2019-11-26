const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    name: { type: String, required: true},
    nationalNumber: Number,
    regionalNumber: Number,
    types: [Object],
    img: String,
    moves: [Object],


});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;