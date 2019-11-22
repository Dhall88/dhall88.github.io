const React = require('react');

class Show extends React.Component {
    render(){
        return (
            <div>
                <h1>Pokemon show page</h1>
                The { this.props.pokemon.name }
            </div>
        )
    }
}
module.exports = Show;