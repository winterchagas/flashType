import React, {useState, useEffect} from 'react';
import ReactDOM from "react-dom";
import {startSocketRemoteType} from "../../helpers/sockets";
import {myUserInfo} from "../../helpers/helpers";

import './index.scss';

const TimerModal = ({setGameStarted}) => {
  const [currentTime, setCurrentTime] = useState(3);

  // function generateStartTimer() {
  //   const interval = setInterval(() => {
  //     console.log('GAME STARTING IN', currentTime);
  //     setCurrentTime(currentTime - 1);
  //   }, 1000);
  //   setTimeout(() => {
  //     console.log('GAME STARTED');
  //     clearInterval(interval);
  //     setGameStarted(true);
  //   }, 3999);
  // }
  //
  // useEffect(() => {
  //   generateStartTimer();
  // }, []);

  return ReactDOM.createPortal(
    <div className="timer__container">
      <div className="timer__box">
        {currentTime}
      </div>
    </div>
    , document.body)
};

export default TimerModal;