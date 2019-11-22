const React = require('react');

class Index extends React.Component{
  render() {
    return (
      <div>
      <ul>
      {this.props.pokemon.map((pokemon,i) => {
                  return <li>
                      <a href={`/pokedex/${pokemon.id}`}>{pokemon.name} </a>                         
                      <form action={`/pokedex/${pokemon._id}?_method=DELETE`} method="POST">
                          <input class="btn btn-primary m-2" type="submit" value="DELETE"/>
                      </form>
                      <a class="btn btn-primary m-2" href={`/pokedex/${pokemon._id}/edit`}>Edit This Pokemon</a>
                  </li>
              })}
      </ul>
      <nav>
          <a class="btn btn-success m-2" href="/pokedex/new">Create a new Pokemon</a>
      </nav>
      </div>
    )
  }
}
module.exports= Index;
