import React, {useState, Fragment, useEffect} from 'react';
import io from 'socket.io-client';
import ModalLogin from "../ModalLogin/ModalLogin.jsx";
import Game from "../Game/Game.jsx";

import './index.scss';

const socket = io();
let view;

const App = () => {
  const [isReadyToPlay, setIsReadyToPlay] = useState(false);
  console.log('isReadyToPlay', isReadyToPlay);
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