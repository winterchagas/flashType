import React, {useState} from 'react';
import {userInfo} from "../../helpers/helpers";

const ModalLogin = ({socket, setIsReadyToPlay}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    socket.emit('joinRoom', userInfo.id, (response) => {
      if (response.ok) {
        console.log('JOINED ROOM WAITING FOR PLAYERS');
      }
    });
  }

  return (
    <div>
      {
        isLoggedIn ?
          <div>
            <button onClick={setIsLookingForGame}>
              READY TO PLAY!
            </button>
          </div> :
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