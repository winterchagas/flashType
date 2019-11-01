import React, {
  useState,
  Fragment,
  useEffect
} from 'react';
import {
  shouldCaptureCharacter,
  myUserInfo,
  playersInfo,
  generateStartTimer
} from "../../helpers/helpers";
import {
  hasPreviousTypeError,
  handleWrongType,
  handleBackspaceType,
  handleCorrectType,
  isNextCharacterCorrect,
  phraseFirstPart,
  phraseErrorPart,
  phraseSecondPart,
  playersProgress
} from "../../helpers/typeEngine";
import {
  startSocketRemoteType
} from "../../helpers/sockets";
import PhraseBox from "../PhraseBox/PhraseBox.jsx";
import TypeBox from "../TypeBox/TypeBox.jsx";
import ProgressBars from "../ProgressBars/ProgressBars.jsx";

import './index.scss';

const Game = ({socket}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playersCurrentProgress, setPlayersCurrentProgress] = useState({});
  const [gameStarted, setGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    generateStartTimer(setGameStarted);
    startSocketRemoteType(socket, setPlayersCurrentProgress);
    return function leaveWebSite() {
      socket.emit('playerLeft', myUserInfo);
    }
  }, []);

  const handleTyping = (event) => {
    if (!gameStarted) return;
    if (isGameOver) return;

    if (shouldCaptureCharacter(event.key)) {
      if (event.key === 'Backspace') {
        const shouldReRender = handleBackspaceType();
        if (shouldReRender) {
          setCurrentIndex(currentIndex - 1);
        }
        return;
      }

      if (hasPreviousTypeError()) {
        handleWrongType(event.key);
      } else {
        if (isNextCharacterCorrect(event.key)) {
          handleCorrectType(socket, event.key, setIsGameOver);
          setPlayersCurrentProgress({...playersProgress});
        } else {
          handleWrongType();
        }
      }
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div
      className="phrase-box"
      tabIndex={0}
      onKeyDown={handleTyping}
    >
      <PhraseBox
        phraseFirstPart={phraseFirstPart}
        phraseErrorPart={phraseErrorPart}
        phraseSecondPart={phraseSecondPart}
      />
      <ProgressBars
        playersCurrentProgress={playersCurrentProgress}
      />
      {/*<TypeBox*/}
      {/*  typedPhrase={typedPhrase}*/}
      {/*  phraseSecondPart={phraseSecondPart}*/}
      {/*/>*/}
    </div>
  );
};

export default Game;