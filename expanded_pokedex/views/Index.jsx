const React = require('react');
const AppLayout = require('./layouts/AppLayout.jsx')

class Index extends React.Component{
  render() {
    console.log(this.props)
    return (
      <AppLayout title="Pokedex">
      <div class='d-flex mb-2 flex-wrap'>
       { this.props.pokemon.map((pokemon,i) => {
          
              if(pokemon.pokemonData === undefined) {
                pokemon.pokemonData = {};
                pokemon.pokemonData.name = 'test'
              }
                 
         
                return  
                <div class='p-2 bg-primary'>
                      <a href={`/pokedex/${pokemon._id}`}>{pokemon.pokemonData.name[0].toUpperCase()+pokemon.pokemonData.name.slice(1)} </a>
                       <div>{i+1}</div>
                      <img src = {pokemon.img}></img>  
                    
                      <div><a href={`/pokedex/${pokemon._id}/edit`}>Edit This Pokemon</a></div>

                    <form action={`/pokedex/${pokemon._id}?_method=DELETE`} method="POST">
                        <input class="btn btn-primary m-2" type="submit" value="DELETE"/>
                    </form>                

                      
                  </div>
                
              })} 
      </div>
      <nav>
          <a class="btn btn-success m-2" href="/pokedex/new">Create a new Pokemon</a>
      </nav>
      </AppLayout>
    )
  }
}
module.exports= Index;
