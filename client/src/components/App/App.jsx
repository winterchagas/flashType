import React, {useState, Fragment, useEffect} from 'react';
import io from 'socket.io-client';
import keys from '../../../config/keys'
import ModalLogin from "../ModalLogin/ModalLogin.jsx";
import Game from "../Game/Game.jsx";

import './index.scss';

const socket = io();
let view;

function initializeGoogleAuth(setGoogleAuth, setIsUserLoggedIn) {
  window.gapi.load('client:auth2', () => {
    window.gapi.client.init({
      clientId: keys.googleClientID,
      scope: 'email'
    })
      .then(() => {
          const googleAuth = window.gapi.auth2.getAuthInstance();
          setGoogleAuth(googleAuth);
          setIsUserLoggedIn(googleAuth.isSignedIn.get());
          googleAuth.isSignedIn.listen(() => {
            console.log('LINSTEN LOG IN', googleAuth.isSignedIn.get());
            setIsUserLoggedIn(googleAuth.isSignedIn.get())
          })
        }
      );
  });
}

const App = () => {
  const [isReadyToPlay, setIsReadyToPlay] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [googleAuth, setGoogleAuth] = useState(null);

  useEffect(() => {
    initializeGoogleAuth(setGoogleAuth, setIsUserLoggedIn);
  }, []);

  if (isReadyToPlay) {
    view = <Game socket={socket}/>
  } else {
    view = <ModalLogin
      socket={socket}
      setIsReadyToPlay={setIsReadyToPlay}
      isUserLoggedIn={isUserLoggedIn}
      setIsUserLoggedIn={setIsUserLoggedIn}
      googleAuth={googleAuth}
    />
  }
  return view;
};

export default App;