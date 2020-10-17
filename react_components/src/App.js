import React from 'react';
import './App.css';

import Timer from './timer';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Timer
                    startTimeInSeconds={5000}
                />
            </header>
        </div>
    );
}

export default App;
