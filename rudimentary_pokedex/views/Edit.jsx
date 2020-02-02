const React = require('react');
const AppLayout = require('./layouts/AppLayout.jsx')

class Edit extends React.Component{
  render() {
    return (
      <AppLayout title="Edit Pokemon">
      <form action={`/pokedex/${this.props.pokemon._id}?_method=PUT`} method="POST">
          Image: <input type="text" name="img" defaultValue={this.props.pokemon.img}/><br/>
          <input type="submit" value="Submit Changes"/>
      </form>
      </AppLayout>
    )
  }
}
module.exports= Edit;
