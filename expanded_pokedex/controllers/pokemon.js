const express = require('express');
const router = express.Router();
const Pokemon = require('../models/pokemon.js')

router.get('/new', (req, res)=>{
    res.render('New');
});

router.post('/', (req, res)=>{
    Pokemon.create(req.body, ()=>{
        res.redirect('/pokedex');
    });
});

router.get('/', (req, res)=>{
    Pokemon.find({}, (error, allPokemon)=>{
        res.render('Index', {
            pokemon: allPokemon
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

router.delete('/:id', (req, res)=>{
    Pokemon.findByIdAndRemove(req.params.id, (err, data)=>{
        res.redirect('/pokedex')
    });
});

router.get('/:id/edit', (req, res)=>{
    Pokemon.findById(req.params.id, (err, foundPokemon)=>{ //find the fruit
        res.render(
    		'Edit',
    		{
    			pokemon: foundPokemon //pass in found fruit
    		}
    	);
    });
});

router.put('/:id', (req, res)=>{
    Pokemon.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedModel)=>{
        res.redirect('/pokedex');
    });
});

module.exports = router;