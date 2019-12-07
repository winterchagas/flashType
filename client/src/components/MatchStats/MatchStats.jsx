import React, { useState, useEffect } from "react";
import trophyIcon from "../../../../assets/trophy.png";

import "./index.scss";

const MatchStats = props => {
  const stats = props.stats;
  const players =
    stats.length > 0 &&
    stats.map(player => {
      return (
        <div key={player.name} className="stats__table-row">
          <div>
            {stats.indexOf(player) === 0 ? (
              <img
                src={trophyIcon}
                alt="trophy-icon"
                className="stats__trophy-icon"
              />
            ) : (
              <span className="stats__number">
                {`${stats.indexOf(player) + 1}˚`}
              </span>
            )}
            <span>{player.name}</span>
          </div>
          <div>{`${player.stat.elapsedTime} seconds`}</div>
        </div>
      );
    });

  return (
    <div className="stats__box">
      <div className="stats__header">Stats</div>
      {players}
    </div>
  );
};

export default MatchStats;
