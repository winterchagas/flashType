import React, {useState, Fragment, useEffect} from 'react';
import io from 'socket.io-client';
import ModalLogin from "../ModalLogin/ModalLogin";
import Game from "../Game/Game";

import './index.scss';

const socket = io();
let view;

const App = () => {
  const [isReadyToPlay,  setIsReadyToPlay] = useState(false);
  if (isReadyToPlay) {
    view = <Game socket={socket}/>
  } else {
    view = <ModalLogin
      socket={socket}
      setIsReadyToPlay={setIsReadyToPlay}
    />
  }
  return view;
};

export default App;