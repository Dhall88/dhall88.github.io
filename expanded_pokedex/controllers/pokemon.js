const express = require('express');
const router = express.Router();
const Pokemon = require('../models/pokemon.js')
const P = require('pokedex-promise-v2');
const Pokedex = new P();
let pokeData = {};
let pokeSpeciesData = {};
let imgIndex;



const pop = async(i) => {
    if (i>2) {
        return
    }
    else {
        setTimeout(async() => {
        await Pokedex.getPokemonByName(i) // with Promise
        .then((response) => {
            pokeData = response;
        })
        .catch(function(error) {
        console.log('There was an ERROR: ', error);
        })

        await Pokedex.getPokemonSpeciesByName(i) // with Promise
        .then((response) => {
            pokeSpeciesData = response;
        })
        .catch(function(error) {
        console.log('There was an ERROR: ', error);
        })

        if (i<10) {
            imgIndex = `00${i}`
        } else if (i<100) {
            imgIndex = `0${i}`
        } else {
            imgIndex = i
        }
        console.log(pokeData.name)

        Pokemon.create(
            {
                pokemonData: pokeData,
                pokemonSpecies: pokeSpeciesData,     
                img: `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imgIndex}.png` 
            }
        , (err, data)=>{
            console.log(data)
        })
        console.log(`got index ${i}`)
        i++;
        pop(i)
    },2000)
}}

// pop(1);

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

// GET FOR MY TEAM

// router.get('/myteam', (req,res)=> {
//     MyTeam.find({}, (error, allPokemon) => {
//     res.render('MyTeam', {
//         pokemon: allPokemon
//     })
// })
// })

router.get('/', (req, res)=>{
    Pokemon.find({}, (error, allPokemon)=>{

        //  res.send(allPokemon)
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