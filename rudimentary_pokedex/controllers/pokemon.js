const express = require('express');
const router = express.Router();
const Pokemon = require('../models/pokemon.js')
const P = require('pokedex-promise-v2');
const Pokedex = new P();
const PokemonList = Pokedex.getPokemonsList().then(function(response) {
    console.log(response.results)
    return (response.results);
  })
  .catch(function(error) {
    console.log('There was an ERROR: ', error);
  })



router.get('/new', (req, res)=>{
    res.render('New');
});

// POST

router.post('/', (req, res)=>{
    // console.log(Pokemon.findById(req.body.id))
    Pokemon.create(req.body, (error, createdPokemon) => {
        res.redirect('/pokedex')
    })
    });

router.get('/', (req, res)=>{
    Pokemon.find({}, (error, allPokemon)=>{

        res.render('Index', {
            pokemon: PokemonList
        });
    });
});

router.get('/:id', (req, res)=>{
    Pokemon.findById(req.params.id, (err, foundPokemon)=>{
        res.render('Show', {
            pokemon:foundPokemon
        });
    });
});

// DELETE 

router.delete('/:id', (req, res)=>{
    Pokemon.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/pokedex')
    });
});

// EDIT 

router.get('/:id/edit', (req, res)=>{
    Pokemon.findById(req.params.id, (err, foundPokemon)=>{
        res.render(
    		'Edit',
    		{
    			pokemon: foundPokemon 
    		}
    	);
    });
});

// PUT

router.put('/:id', (req, res)=>{
    Pokemon.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel)=>{
        res.redirect('/pokedex');
    });
});

module.exports = router;