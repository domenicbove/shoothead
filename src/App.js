import React from 'react';

// TODO some sort of if statement on this
//var url_prefix = ''
var url_prefix = 'http://localhost:8000/'

function joinGame() {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Dom' })
    };

    fetch(url_prefix + 'players', requestOptions)
        .then(response => response.json())
        .then((data) => {
          this.setState({players : data['players'] })
        })
        .catch(console.log)
}

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      gameName: 'Shoothead',
      greeting: '',
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
    alert('A name was submitted: ' + this.state.value);
    joinGame();
    event.preventDefault();
  }

  componentDidMount() {
    fetch(url_prefix + 'hello')
      .then(res => res.json())
      .then((data) => {
        this.setState({greeting : data['greeting'] })
      })
      .catch(console.log)


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
        <h1>{this.state.gameName}</h1>
        <h2>{this.state.greeting}</h2>
        <h2>Players: {this.state.players}</h2>
        <h2>Value {this.state.value}</h2>
        <form>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" onClick={this.handleSubmit} />
        </form>
      </div>
    );
  }
}

export default App;
