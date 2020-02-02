const React = require('react');
const AppLayout = require('./layouts/AppLayout.jsx')

class MyTeam extends React.Component{
  render() {
    return (
    <AppLayout title="My Team">
      <div class='d-flex'>
          {this.props.pokemon.map((pokemon,i) => {
                  return <div class='p-2'>
                      <a href={`/pokedex/${pokemon._id}`}>{pokemon.pokemonData.name[0].toUpperCase()+pokemon.pokemonData.name.slice(1)} </a>
                      <div>{i}</div>
                      <img src = {pokemon.img}></img>  
                      </div>
              })}
      
    <a class="btn btn-primary m-2" 
    href={`/pokedex/myteam/${this.props.pokemon._id}/edit`}>Edit This Pokemon</a>

    <form action={`/pokedex/myteam/${this.props.pokemon._id}?_method=DELETE`} method="POST">
        <input class="btn btn-primary m-2" type="submit" value="DELETE"/>
    </form>
              </div>
    </AppLayout>
    )
  }
}
module.exports= MyTeam;
