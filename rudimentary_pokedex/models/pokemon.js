const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    name: String,
    pokemonData: Object,
    pokemonSpecies: Object,
    img: String
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;