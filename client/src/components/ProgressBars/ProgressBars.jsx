import React from 'react';
import {Progress} from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import './index.scss';

function ProgressBars(props) {
  return (
    <div className="phrase-box__progress-bar">
      <Progress
        type="circle"
        strokeWidth={10}
        width={100}
        percent={props.player1CurrentProgress}
      />
      {/*<Progress*/}
      {/*  percent={props.player1CurrentProgress}*/}
      {/*/>*/}
      {/*<Progress*/}
      {/*  percent={props.player1CurrentProgress}*/}
      {/*/>*/}
      {/*<Progress*/}
      {/*  percent={props.player1CurrentProgress}*/}
      {/*/>*/}
      {/*<Progress*/}
      {/*  percent={player1CurrentProgress}*/}
      {/*/>*/}
    </div>
  )
}

export default ProgressBars;