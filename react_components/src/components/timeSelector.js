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

    workTimeInterval = () => {
        return (
            <div className="TimeInterval">
                <form>
                    <InputLabel>Work Time Input</InputLabel>
                    <TextField
                        type="time"
                        onChange={this.props.handleWorkTimeChange}
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
                        onChange={this.props.handleRestTimeChange}
                        defaultValue="00:05:00"
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
