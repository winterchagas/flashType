import React, { useState, useEffect } from "react";

import "./index.scss";

const TimerModal = ({ socket, setGameStarted, typeElement }) => {
  const totalTime = 300;

  const [currentTime, setCurrentTime] = useState(totalTime);

  const remainingTime = totalTime - currentTime;
  const remainingPercentage = (remainingTime / totalTime) * 100;

  const circle_style = {
    boxShadow: `0px 0px ${remainingPercentage * 2 + 30}px 0px #ff4d4d`
  };

  function generateStartTimer() {
    const interval = setInterval(() => {
      setCurrentTime(currentTime =>
        currentTime !== "GO!" && currentTime > 1 ? currentTime - 1 : "GO!"
      );
    }, 1000);
    // setTimeout(() => {
    //   clearInterval(interval);
    //   socket.emit("gameStarted");
    //   setGameStarted(true);
    //   typeElement.current.focus();
    // }, totalTime * 1000 + 999);
  }

  useEffect(() => {
    generateStartTimer();
  }, []);

  return (
    <div className="timer__container">
      <div className="timer__box">
        <div className="timer__circle" style={circle_style}>
          <text>{currentTime}</text>
        </div>
      </div>
    </div>
  );
};

export default TimerModal;
