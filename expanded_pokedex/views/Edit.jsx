const React = require('react');

class Edit extends React.Component{
  render() {
    return (
      <div>
       {/* See the Layout takes in a prop called Title and we pass Edit Page to it */}
      <form action={`/pokedex/${this.props.pokemon._id}?_method=PUT`} method="POST">
          Name: <input type="text" name="name" defaultValue={this.props.pokemon.name}/><br/>
          <input type="submit" value="Submit Changes"/>
      </form>
      </div>
    )
  }
}
module.exports= Edit;
