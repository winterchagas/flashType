import React from 'react';
import './index.scss';

function TypeBox(props) {
  return (
    <div className="phrase-box__type-box">
      <div className="phrase-box__type-box-left">
        {
          props.typedPhrase
            .slice(-10)
            .map((character, index) => {
              return <span key={index}>{character === ' ' ? ' ' : character}</span>
            })
        }
      </div>
      <div className="phrase-box__type-box-right">
        {
          props.phraseSecondPart
            .slice(0, 11)
            .map((character, index) => {
              return <span key={index}>{character === ' ' ? ' ' : character}</span>
            })
        }
      </div>
    </div>
  )
}

export default TypeBox;