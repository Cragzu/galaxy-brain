import React from 'react';
import PropTypes from 'prop-types';
import Card from "react-bootstrap/Card";

import './textDisplay.css'

class TextDisplay extends React.Component {

    displayTitle(sentences) {
        return (this.props.isWorkTime ? sentences.workTimeTitle : sentences.restTimeTitle);
    }

    displayText(sentences) {
        return (this.props.isWorkTime ? sentences.workTimeBody : sentences.restTimeBody);
    }

    render() {
        const sentences = TextDisplay.sentences;
        return (
            <Card className='TextDisplay'>
                <Card.Title className='TitleContainer'>{this.displayTitle(sentences)}</Card.Title>
                <Card.Body className='BodyContainer'>{this.displayText(sentences)}</Card.Body>
                <Card.Body className='BodyContainer'>{sentences.changeTimer}</Card.Body>
            </Card>
        );
    }
}

TextDisplay.propTypes = {
    isWorkTime: PropTypes.bool.isRequired,
};

TextDisplay.sentences = {
    changeTimer: "Change the timer below for either the work or rest intervals. They will apply once the current timer counts down!",
    restTimeBody: "Time to rest. Get up and stretch, get some water/refill your drink, do whatever you need to do. You're working hard.",
    restTimeTitle: "It's rest time!",
    workTimeBody: "Back to work you go! Take care of yourself! You're doing a great job.",
    workTimeTitle: "It's work time!",
};

export default TextDisplay;