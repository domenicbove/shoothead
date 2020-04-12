import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, BrowserRouter as Router } from 'react-router-dom'

import LandingPage from './LandingPage'
import GamePage from './GamePage'


// import App from './App'

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={LandingPage} />
      <Route path="/game" component={GamePage} />

    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
