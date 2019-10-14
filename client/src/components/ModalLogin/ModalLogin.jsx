import React, {useState, useEffect} from 'react';
import {userInfo} from "../../helpers/helpers";
import {initializeSockets} from "../../helpers/sockets";

const ModalLogin = ({socket, setIsReadyToPlay}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isWaitingForPlayers, setIsWaitingForPlayers] = useState(false);

  useEffect(() => {
    console.log('useEffect modal login');
    initializeSockets(socket, setIsReadyToPlay);
  }, []);

  function handleNameSubmit(event) {
    event.preventDefault();
    const userName = event.target[0].value;
    socket.emit('login', userName, (validUser, userData) => {
      if (validUser) {
        setIsLoggedIn(true);
        userInfo.name = userData.name;
        userInfo.id = userData.id;
      } else {
        console.log('USER INVALID')
      }
    });
  }

  function handleLookForGame() {
    socket.emit('joinRoom', userInfo.id, (roomId) => {
      if (roomId) {
        setIsWaitingForPlayers(true);
        console.log('JOINED ROOM WAITING FOR PLAYERS');
      }
    });
  }

  return (
    <div>
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
    </div>)
};

export default ModalLogin;