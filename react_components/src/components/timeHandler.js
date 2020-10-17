import React from 'react';
import PropTypes from 'prop-types';
import Timer from './timer';

class TimeHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timerIsPaused: false,
        };
    }

    toggleTimerPause () {
        this.setState({
            timerIsPaused: (!this.state.timerIsPaused)
        });
        console.log("timer set to " + this.state.timerIsPaused);
    }

    render () {
        return (
            <div>
                <button
                    onClick={(e) => this.toggleTimerPause(e)}
                />
                <Timer
                    startTimeInSeconds={120}
                    timerIsPaused={this.state.timerIsPaused}
                />
            </div>

        )
    }
}

TimeHandler.propTypes = {
    startTimeInSeconds: PropTypes.number,
    timerIsFinished: PropTypes.bool,
};

TimeHandler.defaultProps = {
    startTimeInSeconds: 60,
    timerIsFinished: false,
};

export default TimeHandler;