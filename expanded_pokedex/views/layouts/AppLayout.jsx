const React = require('react');

class AppLayout extends React.Component{
  render() {
    return (
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width" />
          <title>{this.props.title}</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" 
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" 
            crossorigin="anonymous"/>
        </head>
        <body class="bg-light">
          <header>
            <div class="d-flex justify-content-center">
              <h1 class="text-center">{this.props.title}</h1>
            </div>
            <nav class="navbar navbar-light bg-light">
            
                <a class="navbar-brand" href="/pokedex">Home</a>
                {/* <a class="navbar-brand" href="/pokedex/myteam">My Team</a> */}
                <a class="navbar-brand" href="/pokedex/new">New Pokemon</a>
              
            </nav>
          </header>
          <main>
            {this.props.children}
          </main>
        </body>
      </html>

    )
  }
}
module.exports= AppLayout;