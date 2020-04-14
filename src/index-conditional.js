import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import { Route, BrowserRouter as Router } from 'react-router-dom'

class ShootHeadGame extends React.Component {
  constructor(props) {
    super(props);
    this.handleEnterGameClick = this.handleEnterGameClick.bind(this);
    this.handleLeaveGameClick = this.handleLeaveGameClick.bind(this);
    this.state = {
      enteredGame: false,
    };

  }

  handleEnterGameClick() {
    this.setState({enteredGame: true});
  }

  handleLeaveGameClick() {
    this.setState({enteredGame: false});
  }

  render() {
    const enteredGame = this.state.enteredGame;
    let button;

    if (enteredGame) {
      button = <LeaveGameButton onClick={this.handleLeaveGameClick} />;
    } else {
      button = <EnterGameButton onClick={this.handleEnterGameClick} />;
    }

    return (
      <div>
        <h1>ShootHead Landing Page</h1>
        <Greeting enteredGame={enteredGame} />
        {button}
      </div>
    );
  }
}

// function GamePage(props) {
//   return <h1>You're in the game!</h1>;
// }

function GamePage(props) {
  return (
    <div>
      <h1>You're in the game!</h1>
    </div>
  );
}

function WaitingPage(props) {
  return <h1>Please join the game.</h1>;
}

function Greeting(props) {
  const enteredGame = props.enteredGame;
  if (enteredGame) {
    return <GamePage />;
  }
  return <WaitingPage />;
}

function EnterGameButton(props) {
  return (
    <button onClick={props.onClick}>
      Join up!
    </button>
  );
}

function LeaveGameButton(props) {
  return (
    <button onClick={props.onClick}>
      Exit game
    </button>
  );
}

ReactDOM.render(
  <ShootHeadGame />,
  document.getElementById('root')
);
