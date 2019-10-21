import React from 'react';
import {Progress} from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import {myUserInfo, playersIdNumbersMap} from '../../helpers/helpers';
import './index.scss';

function ProgressBars({playersCurrentProgress}) {
  console.log('playersCurrentProgress', playersCurrentProgress);
  return (
    <div className="phrase-box__progress-bar">
      <Progress
        type="circle"
        strokeWidth={10}
        width={100}
        percent={playersCurrentProgress[myUserInfo.id]}
      />
      <Progress
        percent={playersCurrentProgress[playersIdNumbersMap[1]]}
      />
      <Progress
        percent={playersCurrentProgress[playersIdNumbersMap[2]]}
      />
      <Progress
        percent={playersCurrentProgress[playersIdNumbersMap[3]]}
      />
      <Progress
        percent={playersCurrentProgress[playersIdNumbersMap[4]]}
      />
    </div>
  )
}

export default ProgressBars;