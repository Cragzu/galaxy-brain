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
                <Card.Body className='BodyContainer'>{sentences.pressPause}</Card.Body>
            </Card>
        );
    }
}

TextDisplay.propTypes = {
    isWorkTime: PropTypes.bool.isRequired,
};

TextDisplay.sentences = {
    pressPause: "Press the pause button to change your timer!",
    restTimeBody: "Time to rest. Get up and stretch, get some water/refill your drink and do whatever you need to do. You're working hard.",
    restTimeTitle: "It's rest time!",
    workTimeBody: "Back to work you go! Take care of yourself! You're doing a great job.",
    workTimeTitle: "It's work time!",
};

export default TextDisplay;