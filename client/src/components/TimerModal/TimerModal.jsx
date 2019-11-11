import React, {useState, useEffect} from 'react';

import './index.scss';

const TimerModal = ({socket, setGameStarted, typeElement}) => {
  const [currentTime, setCurrentTime] = useState(3);

  function generateStartTimer() {
    const interval = setInterval(() => {
      setCurrentTime(currentTime => currentTime < 2 ? 'GO!' : currentTime - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
	    socket.emit('gameStarted');
      setGameStarted(true);
      typeElement.current.focus();
    }, 3999);
  }

  useEffect(() => {
    generateStartTimer();
  }, []);

  return <div className="timer__container">
    <div className="timer__box">
      {currentTime}
    </div>
  </div>
};

export default TimerModal;