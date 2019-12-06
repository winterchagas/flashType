import React, { useState, Fragment, useEffect, useRef } from "react";
import {
  shouldCaptureCharacter,
  myUserInfo,
  playersInfo
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
  startSocketRemoteType,
  startSocketPlayerLeft,
  startSocketGetMatchStats
} from "../../helpers/sockets";
import Header from "../Header/Header.jsx";
import PhraseBox from "../PhraseBox/PhraseBox.jsx";
import Rankings from "../Rankings/Rankings.jsx";
import TypeBox from "../TypeBox/TypeBox.jsx";
import MatchStats from "../MatchStats/MatchStats.jsx";
import ProgressBars from "../ProgressBars/ProgressBars.jsx";
import TimerModal from "../TimerModal/TimerModal.jsx";

import "./index.scss";

const Game = ({ socket, isUserLoggedIn, setIsUserLoggedIn, googleAuth }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playersCurrentProgress, setPlayersCurrentProgress] = useState({});
  const [gameStarted, setGameStarted] = useState(false);
  const [isEndOfSentence, setIsEndOfSentence] = useState(false);
  const [displayRankings, setDisplayRankings] = useState(false);
  const [currentStats, setCurrentStats] = useState([]);

  const typeElement = useRef(null);

  useEffect(() => {
    startSocketRemoteType(socket, setPlayersCurrentProgress);
    startSocketPlayerLeft(socket);
    startSocketGetMatchStats(socket, setCurrentStats);
  }, []);

  const handleTyping = event => {
    event.preventDefault();
    if (!gameStarted) return;
    if (isEndOfSentence) return;

    if (shouldCaptureCharacter(event.key)) {
      if (event.key === "Backspace") {
        const shouldReRender = handleBackspaceType();
        if (shouldReRender) {
          setCurrentIndex(currentIndex - 1);
          setPlayersCurrentProgress({ ...playersProgress });
        }
        return;
      }

      if (hasPreviousTypeError()) {
        handleWrongType(event.key);
      } else {
        if (isNextCharacterCorrect(event.key)) {
          handleCorrectType(socket, event.key, setIsEndOfSentence);
          setPlayersCurrentProgress({ ...playersProgress });
        } else {
          handleWrongType();
        }
      }
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <>
      <div
        className="game__container"
        tabIndex={0}
        ref={typeElement}
        onKeyDown={handleTyping}
      >
        <Header
          googleAuth={googleAuth}
          isUserLoggedIn={isUserLoggedIn}
          setIsUserLoggedIn={setIsUserLoggedIn}
          setDisplayRankings={setDisplayRankings}
          gameStarted={gameStarted}
          isEndOfSentence={isEndOfSentence}
        />
        <div className="game__center-box">
          <PhraseBox
            phraseFirstPart={phraseFirstPart}
            phraseErrorPart={phraseErrorPart}
            phraseSecondPart={phraseSecondPart}
          />
          <ProgressBars playersCurrentProgress={playersCurrentProgress} />
          {/*<TypeBox*/}
          {/*  typedPhrase={typedPhrase}*/}
          {/*  phraseSecondPart={phraseSecondPart}*/}
          {/*/>*/}
          {gameStarted && isEndOfSentence && (
            <div className="game__button-container">
              <button className="game__button game__button--play-again">
                <span>Play again</span>
              </button>
            </div>
          )}
        </div>
        {gameStarted && isEndOfSentence && <MatchStats stats={currentStats} />}
      </div>
      {!gameStarted && (
        <TimerModal
          setGameStarted={setGameStarted}
          socket={socket}
          typeElement={typeElement}
        />
      )}
      {(!gameStarted || isEndOfSentence) && displayRankings && (
        <Rankings setDisplayRankings={setDisplayRankings} />
      )}
    </>
  );
};

export default Game;
