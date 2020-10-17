import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TimeHandler from "./components/timeHandler";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <TimeHandler/>
            </header>
        </div>
    );
}

export default App;
