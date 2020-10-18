// external dependencies
import React from "react";
import Button from "react-bootstrap/Button";

// components
import Timer from "./timer";
import TextDisplay from "./textDisplay";
import restTimeAudio from "../assets/soundTimeToRest.mp3";
import workTimeAudio from "../assets/soundTimeToWork.mp3";

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

  playSound() {
    const audio = new Audio(
      this.state.isWorkTime ? workTimeAudio : restTimeAudio
    );

    console.log("Playing audio");
    audio.play();
  }

  resetTimer() {
    this.playSound(); // todo: comment this out if u get annoyed while working
    let formerState = this.state;
    this.setState((state) => ({
      currentTimeInSeconds: formerState.isWorkTime
        ? formerState.restTimeInterval
        : formerState.workTimeInterval,
      isWorkTime: !formerState.isWorkTime,
    }));
  }

  tickDownTimer() {
    if (!this.state.timerIsPaused) {
      let formerState = this.state.currentTimeInSeconds - 1;
      this.setState({
        // reduce number of seconds.. every second
        currentTimeInSeconds: formerState,
      });
      if (this.state.currentTimeInSeconds === 0) {
        this.resetTimer();
      }
    }
  }

  toggleTimerPause() {
    this.setState({
      timerIsPaused: !this.state.timerIsPaused,
    });
    console.log("timer set to " + this.state.timerIsPaused);
  }

  componentDidMount() {
    // update component every second
    this.interval = setInterval(() => this.tickDownTimer(), 1000);
    console.log(this.interval);
    if (this.state.currentTimeInSeconds === 0) {
      this.resetTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <Timer seconds={this.state.currentTimeInSeconds} />
        <TextDisplay isWorkTime={this.state.isWorkTime} />
        <Button
          variant="primary"
          onClick={(e) => this.toggleTimerPause(e)} // e = click event
        >
          {this.state.timerIsPaused ? "Play" : "Pause"}
        </Button>
      </div>
    );
  }
}

export default TimeHandler;
