import React, {useState, Fragment} from 'react';
import {shouldCaptureCharacter} from "./helpers";

import './index.scss';

const fullSentence = 'abcd';
const sentenceLength = fullSentence.length;
const phraseFirstPart = [];
const phraseErrorPart = [];
const phraseSecondPart = [...fullSentence];
const typedPhrase = [];

function handleCorrectType() {
  const removedCharacter = phraseSecondPart.shift();
  phraseFirstPart.push(removedCharacter);
}

function handleWrongType() {
  const removedCharacter = phraseSecondPart.shift();
  phraseErrorPart.push(removedCharacter);
}

function handleBackspaceType() {
  if (phraseSecondPart.length < sentenceLength) {
    if (phraseErrorPart.length > 0) {
      const removedCharacter = phraseErrorPart.pop();
      phraseSecondPart.unshift(removedCharacter);
    } else {
      const removedCharacter = phraseFirstPart.pop();
      phraseSecondPart.unshift(removedCharacter);
    }
    typedPhrase.pop();
    return true;
  }
  return false;
}

const hasPreviousError = () => phraseErrorPart.length > 0;

function isEndOfString() {
  return (
    phraseFirstPart.length +
    phraseErrorPart.length
  ) === sentenceLength;
}

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleTyping = (event) => {
    if (shouldCaptureCharacter(event.key)) {
      if (event.key === 'Backspace') {
        const shouldReRender = handleBackspaceType();
        if (shouldReRender) {
          setCurrentIndex(currentIndex - 1);
        }
        return;
      }

      if (isEndOfString(event.key)) {
        return;
      }

      if (hasPreviousError()) {
        handleWrongType();
      } else {
        if (event.key === phraseSecondPart[0]) {
          handleCorrectType();
        } else {
          handleWrongType();
        }
      }
      setCurrentIndex(currentIndex + 1);
      typedPhrase.push(event.key);
    }
  };

  return (
    <div
      className="phrase-box"
      tabIndex={0}
      onKeyDown={handleTyping}
    >
      <div className="phrase-box__full">
        <span>{fullSentence}</span>
      </div>
      <div className="phrase-box__break">
        <span className="phrase-box__first-part">{phraseFirstPart.join('')}</span>
        <span className="phrase-box__error-part">{phraseErrorPart.join('')}</span>
        <span className="phrase-box__last-part">{phraseSecondPart.join('')}</span>
      </div>
      <div className="phrase-box__type-box">
        {
          [...typedPhrase]
            .map((character, index) => {
              return <span key={index}>{character}</span>
            })
        }
				{
					[...phraseSecondPart]
						.map((character, index) => {
							return <span key={index}>{character}</span>
						})
				}
      </div>
    </div>
  );
};

export default App;