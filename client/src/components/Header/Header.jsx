import React, {useState} from 'react';
import classNames from 'classnames';
import mainLogo from '../../../../public/main-logo.svg'
import {myUserInfo, noOp} from "../../helpers/helpers";
import {getRandomImage} from '../../helpers/images';
import './index.scss';

const Header = ({
                  googleAuth,
                  setIsUserLoggedIn,
                  isUserLoggedIn,
                  setDisplayRankings,
                  gameStarted,
                  isEndOfSentence
                }) => {
  const [displayLogoutButton, setDisplayLogoutButton] = useState(false);

  async function handleGoogleLogout() {
    await googleAuth.signOut();
    setDisplayLogoutButton(false);
    setIsUserLoggedIn(false);
  }

  function showLogoutButton() {
    setDisplayLogoutButton(!displayLogoutButton)
  }

  function getGoogleImage() {
    const googleUser = googleAuth.currentUser.get();
    return googleUser.getBasicProfile().getImageUrl();
  }

  function getImage() {
    if (
      googleAuth &&
      isUserLoggedIn &&
      myUserInfo.googleUser
    ) {
      return getGoogleImage();
    }
    const name = myUserInfo.userName;
    return getRandomImage(name.substring(0, name.indexOf('-')));
  }

  function displayRankings() {
    if (!gameStarted || isEndOfSentence) {
      setDisplayRankings(true)
    }
  }

  const headerRankingClassName = classNames({
    'main-header__rankings': !gameStarted || isEndOfSentence,
    'main-header__rankings--disabled': gameStarted && !isEndOfSentence,
  });

  return (
    <div className="main-header">
      <div
        onClick={displayRankings}
        className={headerRankingClassName}>
        Rankings
      </div>
      <div className="main-header__main-logo-box">
        <img
          className="main-header__main-logo"
          src={mainLogo}
          alt="main-logo"
        />
      </div>
      <div className="main-header__profile-image-box">
        {
          googleAuth &&
          isUserLoggedIn &&
          <>
            <img
              className="main-header__profile-image"
              src={getImage()}
              alt="profile-picture"
              onClick={
                myUserInfo.googleUser ?
                  showLogoutButton :
                  noOp
              }
            />
          </>
        }
        {
          displayLogoutButton &&
          <div
            className="main-header__logout-button"
            onClick={handleGoogleLogout}
          >
            Logout
          </div>
        }
      </div>
    </div>
  );
};

export default Header;