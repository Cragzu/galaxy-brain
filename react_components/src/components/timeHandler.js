// external dependencies
import React from 'react';
import Button from 'react-bootstrap/Button';

// components
import Timer from './timer';

class TimeHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTimeInSeconds: 10,
            startTimeInSeconds: 10,
            timerIsFinished: false,
            timerIsPaused: false,
        };
    }

    toggleTimerPause() {
        this.setState({
            timerIsPaused: (!this.state.timerIsPaused),
        });
        console.log("timer set to " + this.state.timerIsPaused);
    }

    render() {
        return (
            <div>
                <Timer
                    startTimeInSeconds={this.state.startTimeInSeconds}
                    timerIsPaused={this.state.timerIsPaused}
                />
                <Button
                    variant="primary"
                    onClick={(e) => this.toggleTimerPause(e)} // e = click event
                >
                    {this.state.timerIsPaused ? "Play" : "Pause"}
                </Button>
            </div>

        )
    }
}

export default TimeHandler;