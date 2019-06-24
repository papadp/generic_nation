import React, { useState } from 'react';
import './App.scss';
import { Router, Link } from "@reach/router"

import NationSelection from './routes/NationSelection'
import Order from './routes/Order'
import Output from './routes/Output'
import Setup from './routes/Setup'

function App() {
    const [user, setUser] = useState('El Hamin')
  return (
    <div className="App">
        <header>
            <Link to={"/"} >GENERIC NATION</Link>
            <div className="user">
                <select value={user} onChange={e => setUser(e.target.value)}>
                    <option value="El Hamin">El Hamin</option>
                    <option value="Adimor">Adimor</option>
                    <option value="Dima">Dima</option>
                    <option value="Vicky">Vicky</option>
                    <option value="Eden">Eden</option>
                    <option value="Dodro">Dodro</option>
                    <option value="Itay">Itay</option>
                    <option value="Asaf">Asaf</option>
                </select>
            </div>
        </header>
      <Router>
        <NationSelection path="/" />
        <Setup path="setup/:nationId" />
        <Order path="order/:nationId" currentUser={user} />
        <Output path="output/:nationId" />
      </Router>
    </div>
  )
}

export default App;
