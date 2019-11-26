import React, {useState} from 'react';
import mainLogo from '../../../../assets/main-logo.svg'
import {myUserInfo, noOp} from "../../helpers/helpers";
import {getRandomImage} from '../../helpers/images';
import './index.scss';

const Header = ({googleAuth, setIsUserLoggedIn, isUserLoggedIn}) => {
  const [displayLogoutButton, setDisplayLogoutButton] = useState(false);

  async function handleGoogleLogout() {
    await googleAuth.signOut();
    console.log('LOGGED OUT');
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

  return (
    <div className="main-header">
      <div className="main-header__rankings">
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