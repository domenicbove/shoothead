import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

var url_prefix = 'http://localhost:8000/'

class ShootHeadGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerName: '',
      players: {},
      enteredGame: false
    };

    this.handlePlayerNameChange = this.handlePlayerNameChange.bind(this);
    this.handleJoinGameButtonClick = this.handleJoinGameButtonClick.bind(this);
  }

  handlePlayerNameChange(playerName) {
    this.setState({playerName});
  }

  handleJoinGameButtonClick(event) {
    console.log('Player Joining Game: ' + this.state.playerName);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.state.playerName })
    };
    fetch(url_prefix + 'players', requestOptions)
        .catch(console.log)


    this.setState({enteredGame: true});
    event.preventDefault();
  }

  componentDidMount() {
    fetch(url_prefix + 'players')
      .then(res => res.json())
      .then((data) => {
        this.setState({players: data })
      })
      .catch(console.log)
  }

  render() {
    return (
      <div>
        <h1>ShootHead!</h1>

        {this.state.enteredGame === false &&
          <div>
            <h2>Players Waiting:</h2>

            {Object.entries(this.state.players).map( ([key, value]) =>
              <h4>{key}</h4>
            )}

            <PlayerNameInput
              onPlayerNameChange={this.handlePlayerNameChange}
              onJoinGameClick={this.handleJoinGameButtonClick} />
          </div>
        }

        {this.state.enteredGame === true &&
          <div>
            <h2>Players:</h2>

            {Object.entries(this.state.players).map( ([key, value]) =>
              <h4>{key}</h4>
            )}

            <DealButton
              playerName={this.state.playerName} />

          </div>
        }
      </div>
    );
  }
}


class DealButton extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    console.log('Dealing to this player: ' + this.props.playerName);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'count': 6, "player": this.props.playerName})
    };

    fetch(url_prefix + 'deal', requestOptions)
      .catch(console.log)

  }

  render() {
    return (
        <button onClick={this.onClick}>Deal 6</button>
    );
  }
}





class PlayerNameInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.props.onPlayerNameChange(e.target.value);
  }

  handleSubmit(e) {
    this.props.onJoinGameClick(e);
  }

  render() {
    const playerName = this.props.playerName;
    return (
      <fieldset>
        <legend>Enter your Name and Join:</legend>
        <input value={playerName} onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>Join Game</button>
      </fieldset>
    );
  }
}


ReactDOM.render(
  <ShootHeadGame />,
  document.getElementById('root')
);
