import React from 'react';
import {myUserInfo, playersIdNumbersMap, playersInfo} from '../../helpers/helpers';
import CircleProgress from "./CircleProgress/CircleProgress.jsx";

import './index.scss';

function ProgressBars({playersCurrentProgress}) {
  function getPlayerName(playerId) {
    return playersInfo[playersIdNumbersMap[playerId]];
  }

  function getPercentage(playerId) {
    return `${playersCurrentProgress[playersIdNumbersMap[playerId]] || '0'}%`;
  }

  return (
    <div className="progress__container">
      <div>
      <CircleProgress playersCurrentProgress={playersCurrentProgress}/>
        <div className="progress__my-player-name">
          {myUserInfo.userName}
        </div>
      </div>
      <div className="progress__others">
        <div className="progress__each-player">
          <div className="progress__player-name">
            {getPlayerName(1)}
          </div>
          <div className="progress__bar">
            <div
              className="progress__inner-bar"
              style={{width: getPercentage(1)}}>
            </div>
          </div>
          <div className="progress__player-percentage">
            {getPercentage(1)}
          </div>
        </div>
        <div className="progress__each-player">
          <div className="progress__player-name">
            {getPlayerName(2)}
          </div>
          <div className="progress__bar">
            <div
              className="progress__inner-bar"
              style={{width: getPercentage(2)}}>
            </div>
          </div>
          <div className="progress__player-percentage">
            {getPercentage(2)}
          </div>
        </div>
        <div className="progress__each-player">
          <div className="progress__player-name">
            {getPlayerName(3)}
          </div>
          <div className="progress__bar">
            <div
              className="progress__inner-bar"
              style={{width: getPercentage(3)}}>
            </div>
          </div>
          <div className="progress__player-percentage">
            {getPercentage(3)}
          </div>
        </div>
        <div className="progress__each-player">
          <div className="progress__player-name">
            {getPlayerName(4)}
          </div>
          <div className="progress__bar">
            <div
              className="progress__inner-bar"
              style={{width: getPercentage(4)}}>
            </div>
          </div>
          <div className="progress__player-percentage">
            {getPercentage(4)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBars;