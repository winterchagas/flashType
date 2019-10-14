import React, {useState, Fragment, useEffect} from 'react';
import {shouldCaptureCharacter, userInfo} from "../../helpers/helpers";
import ModalLogin from "../ModalLogin/ModalLogin.jsx";
import PhraseBox from "../PhraseBox/PhraseBox.jsx";
import TypeBox from "../TypeBox/TypeBox.jsx";
import ProgressBars from "../ProgressBars/ProgressBars.jsx";

import './index.scss';

const fullSentence = 'The numbers in the table specifies the first browser version that fully supports the selector.';
// const fullSentence = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
const sentenceLength = fullSentence.length;
const phraseFirstPart = [];
const phraseErrorPart = [];
const phraseSecondPart = [...fullSentence];
const typedPhrase = [];
let isGameOver = false;

const playerNumbers = [
  {2: false},
  {3: false},
  {4: false},
  {5: false}
];

const playersInfo = {};

function handleCorrectType(socket, userId) {
  const removedCharacter = phraseSecondPart.shift();
  phraseFirstPart.push(removedCharacter);
  socket.emit('correctType', userId, calculatePlayer1Progress())
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

function calculatePlayer1Progress() {
  const progress = ((phraseFirstPart.length / sentenceLength) * 100)
    .toFixed(0);
  if (parseInt(progress) === 100) isGameOver = true;
  return progress;
}

function startGame(socket) {
  return function () {
    socket.emit('startGame')
  }
}

function setPlayer1Info(userInfo) {
  playersInfo[userInfo.id] = {
    name: userInfo.name,
    number: 1
  }
}

const Game = ({socket}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playersCurrentProgress, setPlayersCurrentProgress] = useState({});
  const [isLookingForGame, setIsLookingForGame] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

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

      if (hasPreviousError()) {
        handleWrongType();
      } else {
        if (event.key === phraseSecondPart[0]) {
          handleCorrectType(socket, userInfo.id);
          setPlayersCurrentProgress({
            ...playersCurrentProgress,
            [players.player1]: calculatePlayer1Progress(),
          });
        } else {
          handleWrongType();
        }
      }
      setCurrentIndex(currentIndex + 1);
      typedPhrase.push(event.key);
    }
  };

  return (
    isLookingForGame ?
      <div
        className="phrase-box"
        tabIndex={0}
        onKeyDown={handleTyping}
      >
        {
          gameStarted ?
            <div>
              <span>GAME STARTED! </span><span>{userInfo.name}</span>
            </div> :
            <div>
              <button onClick={startGame(socket)}>START THE GAME!</button>
            </div>
        }
        <PhraseBox
          phraseFirstPart={phraseFirstPart}
          phraseErrorPart={phraseErrorPart}
          phraseSecondPart={phraseSecondPart}
        />
        <ProgressBars
          player1CurrentProgress={playersCurrentProgress.player1}
        />
        <TypeBox
          typedPhrase={typedPhrase}
          phraseSecondPart={phraseSecondPart}
        />
      </div> :
      <ModalLogin
        socket={socket}
        setIsLookingForGame={setIsLookingForGame}
        setPlayer1Info={setPlayer1Info}
      />
  );
};

export default Game;