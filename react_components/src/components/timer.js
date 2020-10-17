import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: parseInt(props.startTimeInSeconds, 10) || 0
        };
    }

    tick() {
        if (!this.props.timerIsPaused) {
            this.setState(state => ({
                // reduce number of seconds.. every second
                seconds: state.seconds--
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

    formatTime(secs) {
        let hours = Math.floor(secs / 3600);
        let minutes = Math.floor(secs / 60) % 60;
        let seconds = secs % 60;
        return [hours, minutes, seconds]
            .map(v => ('' + v).padStart(2, '0'))
            .filter((v, i) => v !== '00' || i > 0)
            .join(':');
    }

    render() {
        return (
            <div>
                {this.formatTime(this.state.seconds)}
                <p>Time remaining</p>
            </div>
        );
    }
}

Timer.propTypes = {
    startTimeInSeconds: PropTypes.number,
    timerIsFinished: PropTypes.bool,
    timerIsPaused: PropTypes.bool,
};

Timer.defaultProps = {
    // startTimeInSeconds: 60,
    timerIsFinished: false,
    timerIsPaused: false,
};

export default Timer;