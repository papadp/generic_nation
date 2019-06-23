import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Router, Link } from "@reach/router"

import NationSelection from './routes/NationSelection'
import Order from './routes/Order'
import Output from './routes/Output'
import Setup from './routes/Setup'

function App() {
  return (
    <div className="App">
        <Link to={"/"} >
            <header>GENERIC NATION</header>
        </Link>
      <Router>
        <NationSelection path="/" />
        <Setup path="setup/:nationId" />
        <Order path="order" />
        <Output path="output" />
      </Router>
      <div className="footer">
        <nav>
        </nav>
      </div>
    </div>
  )
}

export default App;
