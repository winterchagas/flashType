import React, {useState, useEffect} from 'react';
import trophyIcon from '../../../../assets/trophy.png';
import Spinner from '../Spinner/Spinner.jsx';
import './index.scss';

const Rankings = ({setDisplayRankings}) => {
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    fetch('/getStats')
      .then((response) => {
        response.json()
          .then((responseBody) => {
            setRankings(responseBody.stats);
          });
      });
  }, []);

  function cancelModal() {
    setDisplayRankings(false);
  }

  function fakeClick(e) {
    e.stopPropagation();
  }

  return <div className="ranking__container" onClick={cancelModal}>
    <div className="ranking__box" onClick={fakeClick}>
      {
        rankings.length > 0 ?
          rankings.map((ranking, index) => {
            return <div key={ranking.name} className="ranking__table-row">
              <div>
                {
                  index === 0 ?
                    <img src={trophyIcon} alt="trophy-icon" className="ranking__trophy-icon"/> :
                    <span className="ranking__number">{`${index + 1}˚`}</span>
                }
                <span>{ranking.name}</span>
              </div>
              <div>
                {`${ranking.wpm} words per minute`}
              </div>
              <div>
                {`${ranking.cps} characters per second`}
              </div>
            </div>
          }) :
          <Spinner/>
      }
    </div>
  </div>
};

export default Rankings;