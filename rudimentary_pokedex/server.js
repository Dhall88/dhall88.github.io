const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const pokemonController = require("./controllers/pokemon.js");

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:false}));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// connect to mongoose
mongoose.connect('mongodb://localhost:27017/basiccrud', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true});
mongoose.connection.once('open', () => {
    console.log('connected to mongo')
})

app.use('/pokedex', pokemonController);

app.listen(3000, ()=>{
    console.log('listening');
});