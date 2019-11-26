import React from 'react';
import {myUserInfo, playersIdNumbersMap, playersInfo} from '../../../helpers/helpers';
import './index.scss';

function CircleProgress({playersCurrentProgress}) {
  const percentage = playersCurrentProgress[myUserInfo.userId] || 0;
  const angle = `${(360 / 100) * percentage}deg`;
  const isOverHalf = percentage > 50;
  return (
    <div className={`progress-circle ${isOverHalf && "over50"}`}>
      <span>{`${percentage}%`}</span>
      <div className="left-half-clipper">
        <div className="first50-bar">
        </div>
        <div
          className='value-bar'
          style={percentage > 0 ? {display: 'block', transform: `rotate(${angle})`} : {}}
        >
        </div>
      </div>
    </div>
  )
}

export default CircleProgress;

// style={{transform: 'rotate(36deg)'}}