import React from 'react'

var url_prefix = 'http://localhost:8000/'

class GamePage extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      players: [],
      pile: [],
      hand: [],
    }
  }

  componentDidMount() {
    fetch(url_prefix + 'players')
      .then(res => res.json())
      .then((data) => {
        this.setState({players : data['players'] })
      })
      .catch(console.log)

    fetch(url_prefix + 'pile')
      .then(res => res.json())
      .then((data) => {
        this.setState({pile : data['pile'] })
      })
      .catch(console.log)
  }

  deal = () => {
    console.log('The Deal button was clicked.');

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'count': 6 })
    };

    fetch(url_prefix + 'deal', requestOptions)
      .then(res => res.json())
      .then((data) => {
        this.setState({hand : data['deal'] })
      })
      .catch(console.log)
  }

  pickUpPile = () => {
    console.log('The pick up pile button was clicked.');

    fetch(url_prefix + 'pick_up')
      .then(res => res.json())
      .then((data) => {
        this.setState({hand : this.state.hand.concat(data['pile']) })
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
        <h2>Pile: </h2>
        {this.state.pile.map((card) => (
            <h3>{card.rank}{card.suit}</h3>
        ))}

        <PickUpPileButton onClick={(i) => this.pickUpPile(i)} />

        <h2>Your Hand: </h2>
        {this.state.hand.map((card) => (
            <h3>{card.rank}{card.suit}</h3>
        ))}

        <DealButton onClick={(i) => this.deal(i)} />

      </div>
    );
  }
}

function DealButton(props) {
  return (
    <button type="button" onClick={props.onClick}>
    Deal 6
    </button>
  );
}

function PickUpPileButton(props) {
  return (
    <button type="button" onClick={props.onClick}>
    Pick Up Pile
    </button>
  );
}


export default GamePage
