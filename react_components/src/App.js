import React from 'react';
import './App.css';

import Timer from './timer';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Timer
                    startTimeInSeconds={120}
                    timerIsPaused={false}
                />
            </header>
        </div>
    );
}

export default App;
