const React = require('react');
const AppLayout = require('./layouts/AppLayout.jsx')

class Index extends React.Component{
  render() {
    return (
      <AppLayout title="Pokedex">
      <div class='d-flex flex-wrap'>
      {this.props.pokemon.map((pokemon,i) => {
                  return <div class='p-2'>
                      <a href={`/pokedex/${pokemon._id}`}>{pokemon.name.toUpperCase()+pokemon.name.slice(1)} </a>
                      <div>{i+1}</div>
                      {/* <img src = {pokemon.img}></img>   */}
                    
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
