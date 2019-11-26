const express = require('express');
const router = express.Router();
const Pokemon = require('../models/pokemon.js')
const P = require('pokedex-promise-v2');
const Pokedex = new P();

const pop = async() => {
for(let i =1;i<11;i++) {
await Pokedex.getPokemonByName(i) // with Promise
.then((response) => {
    Pokemon.create(
        {name: response.name}
     , (err, data)=>{
        console.log(data)
    })
})
.catch(function(error) {
  console.log('There was an ERROR: ', error);
})
}
}

// pop();




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