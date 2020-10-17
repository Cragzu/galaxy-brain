// external dependencies
import React from 'react';
import Button from 'react-bootstrap/Button';

// components
import Timer from './timer';

class TimeHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTimeInSeconds: 30,
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

    tick() {
        if (!this.state.timerIsPaused && this.state.currentTimeInSeconds > 0) {
            this.setState(state => ({
                // reduce number of seconds.. every second
                currentTimeInSeconds: state.currentTimeInSeconds--
            }));
        }
    }

    componentDidMount() {
        // update component every second
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <Timer
                    seconds={this.state.currentTimeInSeconds}
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