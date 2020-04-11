import React from 'react';

var url_prefix = 'http://localhost:8000/'


class Cards extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hand: []
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    //this.setState({hand: event.target.value});
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'count': 3 })
    };

    fetch(url_prefix + 'deal', requestOptions)
        .then(res => res.json())
        .then((data) => {
          this.setState({hand : data['deal'] })
        })
  }

  render() {
    return (
      <div>
        <h1>Your Hand</h1>
        <h2>Cards: {this.state.hand}</h2>
        <button onClick={this.handleClick}>Deal</button>
      </div>
    );
  }
}

export default Cards;
