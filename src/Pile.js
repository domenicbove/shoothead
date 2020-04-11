import React from 'react';

var url_prefix = 'http://localhost:8000/'


class Cards extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pile: []
    }
  }

  componentDidMount() {
    fetch(url_prefix + 'pile')
      .then(res => res.json())
      .then((data) => {
        this.setState({pile : data['pile'] })
      })
      .catch(console.log)
  }

  render() {
    return (
      <div>
        <h2>Pile: {this.state.pile}</h2>
      </div>
    );
  }
}

export default Cards;
