import React from 'react';
import PropTypes from 'prop-types';

class TextDisplay extends React.Component {

    // todo: styling/css
    displayTitle(sentences) {
        return (this.props.isWorkTime ? sentences.workTimeTitle : sentences.restTimeTitle);
    }

    displayText(sentences) {
        return (this.props.isWorkTime ? sentences.workTimeBody : sentences.restTimeBody);
    }

    render() {
        const sentences = TextDisplay.sentences;
        return (
            <div>
                {this.displayTitle(sentences)}
                <br />
                {this.displayText(sentences)}
            </div>
        );
    }
}

TextDisplay.propTypes = {
    isWorkTime: PropTypes.bool.isRequired,
};

// todo: update placeholder text
TextDisplay.sentences = {
    restTimeBody: "Time to rest. Get up and stretch, get some water/refill you drink and do whatever you need to do. You're working hard.",
    restTimeTitle: "It's rest time!",
    workTimeBody: "Back to work you go! Take care of yourself! You're doing a great job.",
    workTimeTitle: "It's work time!",
};

export default TextDisplay;