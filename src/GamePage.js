import React from 'react'

var url_prefix = 'http://localhost:8000/'

class GamePage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      players: [],
    }
  }

  componentDidMount() {
    fetch(url_prefix + 'players')
      .then(res => res.json())
      .then((data) => {
        this.setState({players : data['players'] })
      })
      .catch(console.log)
  }

  render() {
    return (
      <div>
        <h1>Game Page</h1>
        <h2>Players In Game: </h2>
        {this.state.players.map((player) => (
            <h3>{player}</h3>
        ))}
      </div>
    );
  }
}

export default GamePage
