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
    restTimeBody: "Placeholder text for rest",
    restTimeTitle: "It's rest time!",
    workTimeBody: "Placeholder text for work",
    workTimeTitle: "It's work time!",
};

export default TextDisplay;