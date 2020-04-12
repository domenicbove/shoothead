import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import LandingPage from './LandingPage'
import GamePage from './GamePage'


import App from './App'
import Contact from './contact'

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={LandingPage} />
      <Route path="/game" component={GamePage} />

      <Route path="/contact" component={Contact} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
