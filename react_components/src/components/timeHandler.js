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
            isWorkTime: true,
            restTimeInterval: 5,
            timerIsFinished: false,
            timerIsPaused: false,
            workTimeInterval: 15,
        };
    }

    resetTimer() {
        this.setState(state => ({
            currentTimeInSeconds: (state.isWorkTime ? state.restTimeInterval : state.workTimeInterval),
            isWorkTime: !state.isWorkTime
        }));
    }

    toggleTimerPause() {
        this.setState({
            timerIsPaused: (!this.state.timerIsPaused),
        });
        console.log("timer set to " + this.state.timerIsPaused);
    }

    tick() {
        if (!this.state.timerIsPaused) {
            this.setState(state => ({
                // reduce number of seconds.. every second
                currentTimeInSeconds: state.currentTimeInSeconds--
            }));
            if (this.state.currentTimeInSeconds === 0) {this.resetTimer()}
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