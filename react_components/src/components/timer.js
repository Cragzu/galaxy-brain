import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {

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
                {this.formatTime(this.props.seconds)}
                <p>Time remaining</p>
            </div>
        );
    }
}

Timer.propTypes = {
    seconds: PropTypes.number.isRequired,
};

Timer.defaultProps = {
    seconds: 60,
};

export default Timer;