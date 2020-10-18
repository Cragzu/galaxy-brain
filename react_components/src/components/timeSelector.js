// external dependencies
import React from "react";
import {InputLabel, makeStyles, TextField, Select, MenuItem} from "@material-ui/core";

import './timeSelector.css'

class TimeSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            workTime: 0,
            restTime: 0,
        };
    }

    timeConversion = (timeString) => {
        const timeArray = timeString.split(":");
        console.log(timeArray);
        let seconds = 0;
        const hours = parseInt(timeArray[0]) * 3600;
        const minutes = parseInt(timeArray[1]) * 60;

        if (timeArray[2]) {
            seconds = parseInt(timeArray[2]);
        }

        console.log(hours, minutes, seconds);

        return hours + minutes + seconds;
    };

    handleWorkTimeChange = (e) => {
        const time = this.timeConversion(e.target.value);
        this.setState({workTime: time});
    };

    handleRestTimeChange = (e) => {
        const time = this.timeConversion(e.target.value);
        this.setState({restTime: time});
    };

    workTimeInterval = () => {
        return (
            <div className="TimeInterval">
                <form>
                    <InputLabel>Work Time Input</InputLabel>
                    <TextField
                        type="time"
                        onChange={this.handleWorkTimeChange}
                        defaultValue="00:15:00"
                        inputProps={{
                            step: 100,
                        }}
                    />
                </form>
            </div>
        );
    };

    restTimeInterval = () => {
        return (
            <div className="TimeInterval">
                <form>
                    <InputLabel>Rest Time Input</InputLabel>
                    <TextField
                        type="time"
                        onChange={this.handleRestTimeChange}
                        defaultValue="00:15:00"
                        inputProps={{
                            step: 100,
                        }}
                    />
                </form>
            </div>
        );
    };

    render() {
        return (
            <div className='TimeSelector'>
                {this.workTimeInterval()}
                {this.restTimeInterval()}
            </div>
        );
    }
}

export default TimeSelector;
