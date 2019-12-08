import React from "react";
import "./index.scss";

function PhraseBox(props) {
  const correct_height =
    document.getElementById("valid_entry") === null
      ? 32
      : document.getElementById("valid_entry").offsetHeight;
  const marginTop = 32 - correct_height;
  const visible_phrase_style = { marginTop };
  return (
    <div className="phrase-box__container">
      <div className="phrase-box__break" style={visible_phrase_style}>
        <span id="valid_entry" className="phrase-box__first-part">
          {props.phraseFirstPart.join("")}
        </span>
        <span className="phrase-box__error-part">
          {props.phraseErrorPart.join("").replace(/ /g, "_")}
        </span>
        <span className="phrase-box__cursor"></span>
        <span className="phrase-box__last-part">
          {props.phraseSecondPart.join("")}
        </span>
      </div>
    </div>
  );
}

export default PhraseBox;
