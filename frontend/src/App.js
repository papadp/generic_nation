import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, Link } from "@reach/router"

import NationSelection from './routes/NationSelection'
import Order from './routes/Order'
import Output from './routes/Output'
import Setup from './routes/Setup'

function App() {
  return (
    <div className="App">
        <header>GENERIC NATION</header>
      <Router>
        <NationSelection path="/" />
        <Setup path="setup" />
        <Order path="order" />
        <Output path="output" />
      </Router>
      <div className="footer">
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="setup">Setup </Link> |{" "}
          <Link to="order">Order</Link> |{" "}
          <Link to="output">Output</Link>
        </nav>
      </div>
    </div>
  )
}

export default App;
