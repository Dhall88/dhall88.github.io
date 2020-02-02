const React = require('react');

class New extends React.Component {
    render() {
        return (
            <div>
                <h1>New Pokemon page</h1>
                <form action="/pokedex" method="POST">
                    Image: <input type="text" name="img" /><br/>
                    <input type="submit" name="" value="Create Pokemon"/>
                </form>
            </div>
        )
    }
}

module.exports = New;