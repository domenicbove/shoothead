import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: "Dom",
      greeting: ""
    }
  }

  componentDidMount() {
    fetch('hello')
      .then(res => res.json())
      .then((data) => {
        this.setState({greeting : data['greeting'] })
      })
      .catch(console.log)
  }

  render() {
    return (
      <div>
        <h1>{this.state.greeting}</h1>
        <h2>{this.state.name}</h2>
      </div>
    );
  }
}

export default App;
