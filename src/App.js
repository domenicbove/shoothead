import React from 'react';

// TODO some sort of if statement on this
//var url_prefix = ''
var url_prefix = 'http://localhost:8000/'

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: "Dom",
      greeting: "",
      players: []
    }
  }

  componentDidMount() {
    fetch(url_prefix + "hello")
      .then(res => res.json())
      .then((data) => {
        this.setState({greeting : data['greeting'] })
      })
      .catch(console.log)


    fetch(url_prefix + "players")
      .then(res => res.json())
      .then((data) => {
        this.setState({players : data['players'] })
      })
      .catch(console.log)
  }

  render() {
    return (
      <div>
        <h1>{this.state.greeting}</h1>
        <h2>{this.state.name}</h2>
        <h2>Players: {this.state.players}</h2>
      </div>
    );
  }
}

export default App;
