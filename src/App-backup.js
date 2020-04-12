import React from 'react';
import Cards from './Cards';
import Pile from './Pile';

// TODO some sort of if statement on this
//var url_prefix = ''
var url_prefix = 'http://localhost:8000/'

function joinGame(playerName) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: playerName })
    };

    fetch(url_prefix + 'players', requestOptions)
        .catch(console.log)
}

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      pageName: 'Landing Page',
      value: '',
      players: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    joinGame(this.state.value);
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
        <h1>{this.state.pageName}</h1>
        <h2>Players: {this.state.players}</h2>
        <form>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" onClick={this.handleSubmit} />
        </form>

        <Cards />

        <Pile />
      </div>
    );
  }
}

export default App;
