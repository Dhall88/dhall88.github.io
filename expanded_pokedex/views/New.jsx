const React = require('react');

class New extends React.Component {
    render() {
        return (
            <div>
                <h1>New Pokemon page</h1>
                <form action="/pokedex" method="POST">
                    Name: <input type="text" name="name" /><br/>
                    <input type="submit" name="" value="Create Pokemon"/>
                </form>
            </div>
        )
    }
}

module.exports = New;