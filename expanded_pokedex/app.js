var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

// P.getPokemonByName('eevee') // with Promise
// .then(function(response) {
//   console.log(response);
// })
// .catch(function(error) {
//   console.log('There was an ERROR: ', error);
// })  .then(() => {
//     process.exit();

P.getEvolutionChainById(7)
.then(function(response) {
  console.log(response);
})
.catch(function(error) {
  console.log('There was an ERROR: ', error);
});

// console.log(P)









// Arthur notes, in index

// const express = require('express')
// const app = require('express');
// const mongoose = require('mongoose');
// const axios = require('axios')
// //add mmiddleware and other consts

// app.get('/',async(req,res) => {
//     const pokemon = await axios.get(// pokemon url)
//     res.json(pokemon)
// 