import React, {useState, useEffect} from 'react';
import {setMyUserInfo, myUserInfo} from "../../helpers/helpers";
import {initializeSockets} from "../../helpers/sockets";

const ModalLogin = ({socket, setIsReadyToPlay}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isWaitingForPlayers, setIsWaitingForPlayers] = useState(false);

  useEffect(() => {
    initializeSockets(socket, setIsReadyToPlay);
  }, []);

  function handleNameSubmit(event) {
    event.preventDefault();
    const userName = event.target[0].value;
    socket.emit('login', userName, (validUser, userData) => {
      if (validUser) {
        setIsLoggedIn(true);
        setMyUserInfo(userData);
      } else {
        console.log('USER INVALID')
      }
    });
  }

  function handleLookForGame() {
    socket.emit('joinRoom', myUserInfo.id, (roomId) => {
      if (roomId) {
        setMyUserInfo({roomId});
        console.log('myUserInfo', myUserInfo);
        setIsWaitingForPlayers(true);
      }
    });
  }

  return (
    <>
      {
        isLoggedIn ?
          isWaitingForPlayers ?
            <div>
              WAITING FOR OTHER PLAYERS..
            </div>
            :
            <div>
              <button onClick={handleLookForGame}>
                READY TO PLAY!
              </button>
            </div>
          :
          <div>
            <form onSubmit={handleNameSubmit}>
              <input type="text"/>
              <button>
                LOGIN
              </button>
            </form>
          </div>
      }
    </>)
};

export default ModalLogin;