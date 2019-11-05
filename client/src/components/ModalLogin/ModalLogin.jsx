import React, {useState, useEffect} from 'react';
import {
  setPlayersInfo,
  playersInfo,
  setMyUserInfo,
  myUserInfo,
  buildGoogleSignInPayload
} from "../../helpers/helpers";
import Header from '../Header/Header.jsx';
import Spinner from '../Spinner/Spinner.jsx';
import googleLogo from '../../../../assets/google-plus.svg'

import './index.scss';

const ModalLogin =
  ({
     socket,
     isUserLoggedIn,
     setIsUserLoggedIn,
     googleAuth
   }) => {
    const [isWaitingForPlayers, setIsWaitingForPlayers] = useState(false);

    async function handlePlayAsGuest() {
      const userInfoResponse = await fetch('/auth/guest');
      setMyUserInfo(await userInfoResponse.json());
      socket.emit('joinRoom', myUserInfo.userId, (roomId, playersData) => {
        if (roomId) {
          const isNotFirstInRoom = !!playersData;
          if (isNotFirstInRoom) {
            console.log('You joined', playersData);
            setPlayersInfo(playersData);
          }
          setMyUserInfo({roomId});
          setIsUserLoggedIn(true);
          setIsWaitingForPlayers(true);
        }
      });
    }

    async function handleGoogleLogin() {
      const currentUser = await googleAuth.signIn();
      const payload = buildGoogleSignInPayload(currentUser);
      const response = await fetch('/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      // console.log('ACCESS TOKEN', currentUser.getAuthResponse().access_token);
      // console.log('ID TOKEN', currentUser.getAuthResponse().id_token);
    }

    async function handleGoogleLogout() {
      await googleAuth.signOut();
      console.log('LOGGED OUT');
      setIsUserLoggedIn(false);
    }

    function handlePlayGame() {
      socket.emit('joinRoom', myUserInfo.userId, (roomId, playersData) => {
        if (roomId) {
          const isNotFirstInRoom = !!playersData;
          if (isNotFirstInRoom) {
            console.log('You joined', playersData);
            setPlayersInfo(playersData);
          }
          setMyUserInfo({roomId});
          setIsUserLoggedIn(true);
          setIsWaitingForPlayers(true);
        } else {
          //todo display message to the user
          console.log('YOU ARE ALREADY PLAYING IN THIS ROOM');
        }
      });
    }

    return (
      <div className="login__container">
        <Header/>
        <div className="login__middle-box">
          {
            isUserLoggedIn ?
              isWaitingForPlayers ?
                <div>
                  <h3 className="login__box-title">Connecting to other players</h3>
                  <Spinner/>
                </div>
                :
                <>
                  <div>
                    <button onClick={handlePlayGame}>
                      READY TO PLAY!
                    </button>
                  </div>
                  <div>
                    <button onClick={handleGoogleLogout}>
                      LOGOUT
                    </button>
                  </div>
                </>
              :
              <>
                <h3 className="login__box-title">Real-Time Typing Competition</h3>
                <div>
                  <button
                    className="login__item login__button login__button--google"
                    onClick={handleGoogleLogin}>
                    <img
                      className="login__google-logo-img"
                      src={googleLogo}
                      alt="main-logo"/>
                    <span>
                      Signin with Google
                    </span>
                  </button>
                </div>
                <div className="login__item login__divider">
                  <div className="login__sideline"/>
                  or <div className="login__sideline"/>
                </div>
                <div>
                  <button
                    className="login__item login__button login__button--guest"
                    onClick={handlePlayAsGuest}>
                    <span>Play as a guest</span>
                  </button>
                </div>
              </>
          }
        </div>
      </div>
    );
  };

export default ModalLogin;

// this.googleAuth.signIn().then(response => {
// 	IS_CONSOLE_LOG_OPEN && console.log("signUp response", response);
// 	if (response.Zi.token_type === "Bearer") {
// 		let photoUrl = response.w3.Paa;
// 		let googleAccessTokenExpiresOn = new Date();
// 		googleAccessTokenExpiresOn.setSeconds(
// 			googleAccessTokenExpiresOn.getSeconds() + response.Zi.expires_in
// 		);
// 		const googleAccessToken = this.googleAuth.currentUser
// 			.get()
// 			.getAuthResponse().access_token;
// 		let config = { method: "POST" };
// 		config.body = {
// 			client_id: jobHaxClientId,
// 			client_secret: jobHaxClientSecret,
// 			provider: "google-oauth2"
// 		};
// 		config.body.token = googleAccessToken;
// 		if (this.state.user_type != null) {
// 			config.body.user_type = this.state.user_type;
// 		}
// 		axiosCaptcha(USERS("authSocialUser"), config, "signin")
// 			.then(response => {
// 				if (response.statusText === "OK") {
// 					if (response.data.success === true) {
// 						this.setCookies(response, googleAccessTokenExpiresOn);
// 					}
// 				}
// 				return response;
// 			})
// 			.then(response => {
// 				if (response.statusText === "OK") {
// 					if (response.data.success === true) {
// 						if (!response.data.data.signup_flow_completed) {
// 							this.setState({ level: "intro" });
// 						} else {
// 							this.props.cookie("set", "remember_me", true, "/");
// 							this.props.passStatesToApp("isUserLoggedIn", true);
// 						}
// 						this.postGoogleProfilePhoto(photoUrl);
// 					}
// 				}
// 			});