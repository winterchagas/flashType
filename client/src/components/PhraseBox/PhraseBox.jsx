import React from 'react';
import './index.scss';

function PhraseBox(props) {
  return (
    <div className="phrase-box__break">
      <span className="phrase-box__first-part">{props.phraseFirstPart.join('')}</span>
      <span className="phrase-box__error-part">{props.phraseErrorPart.join('')}</span>
      <span className="phrase-box__last-part">{props.phraseSecondPart.join('')}</span>
    </div>
  )
}

export default PhraseBox;