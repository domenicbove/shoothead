import React from 'react'

var url_prefix = 'http://localhost:8000/'

class LandingPage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      players: [],
      value: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(url_prefix + 'players')
      .then(res => res.json())
      .then((data) => {
        this.setState({players : data['players'] })
      })
      .catch(console.log)
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.state.value })
    };

    fetch(url_prefix + 'players', requestOptions)
        .catch(console.log)

    this.props.history.push('/game')
  }

  render() {
    return (
      <div>
        <h1>ShootHead Landing Page</h1>
        <h2>Players Waiting:</h2>
        {this.state.players.map((player) => (
            <h3>{player.name}</h3>
        ))}
        <h2>Enter Game</h2>
        <form>
          <input placeholder="Enter Name" type="name" value={this.state.value} onChange={this.handleChange} />
          <button onClick={this.handleSubmit}>Join Game</button>
        </form>
      </div>
    );
  }
}

export default LandingPage
