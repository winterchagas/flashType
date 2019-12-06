import React, { useState, useEffect } from "react";
import {
  addPlayers,
  playersInfo,
  setMyUserInfo,
  myUserInfo,
  buildGoogleSignInPayload,
  makePlayersInRoom
} from "../../helpers/helpers";
import {
  startSocketPlayerJoined,
  startSocketPlayerLeft
} from "../../helpers/sockets";
import Header from "../Header/Header.jsx";
import Spinner from "../Spinner/Spinner.jsx";
import Rankings from "../Rankings/Rankings.jsx";
import googleLogo from "../../../../assets/google-plus.svg";

import "./index.scss";

const ModalLogin = ({
  socket,
  isUserLoggedIn,
  setIsUserLoggedIn,
  googleAuth
}) => {
  const [isWaitingForPlayers, setIsWaitingForPlayers] = useState(false);
  const [playersInRoom, setPlayersInRoom] = useState([]);
  const [displayRankings, setDisplayRankings] = useState(false);

  useEffect(() => {
    startSocketPlayerJoined(socket, setPlayersInRoom);
    startSocketPlayerLeft(socket, setPlayersInRoom);
  }, []);

  async function handleGoogleLogin() {
    const currentUser = await googleAuth.signIn();
    const payload = buildGoogleSignInPayload(currentUser);
    const response = await fetch("/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    // console.log('ACCESS TOKEN', currentUser.getAuthResponse().access_token);
    // console.log('ID TOKEN', currentUser.getAuthResponse().id_token);
  }

  async function handlePlayAsGuest() {
    const userInfoResponse = await fetch("/play/guest");
    setMyUserInfo(await userInfoResponse.json(), true);
    socket.emit("joinRoom", myUserInfo.userId, (roomId, playersData) => {
      if (roomId) {
        const isNotFirstInRoom = !!playersData;
        if (isNotFirstInRoom) {
          console.log("You joined", playersData);
          addPlayers(playersData);
          const recentUsers = makePlayersInRoom();
          setPlayersInRoom(recentUsers);
        }
        setMyUserInfo({ roomId });
        setIsUserLoggedIn(true);
        setIsWaitingForPlayers(true);
      }
    });
  }

  async function handlePlayGame() {
    const userAdded = await fetch("/play/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(myUserInfo)
    });
    if (userAdded) {
      socket.emit("joinRoom", myUserInfo.userId, (roomId, playersData) => {
        if (roomId) {
          const isNotFirstInRoom = !!playersData;
          if (isNotFirstInRoom) {
            console.log("You joined", playersData);
            addPlayers(playersData);
            const recentUsers = makePlayersInRoom();
            setPlayersInRoom(recentUsers);
          }
          setMyUserInfo({ roomId });
          setIsUserLoggedIn(true);
          setIsWaitingForPlayers(true);
        } else {
          //todo display message to the user
          console.log("YOU ARE ALREADY PLAYING IN THIS ROOM");
        }
      });
    }
  }

  console.log(playersInRoom);

  return (
    <div className="login__container">
      <Header
        googleAuth={googleAuth}
        isUserLoggedIn={isUserLoggedIn}
        setIsUserLoggedIn={setIsUserLoggedIn}
        setDisplayRankings={setDisplayRankings}
        displayRankings={displayRankings}
        isWaitingForPlayers={isWaitingForPlayers}
      />
      <div className="login__middle-box">
        {isUserLoggedIn ? (
          isWaitingForPlayers ? (
            <div>
              <h3 className="login__box-title">Connecting to other players</h3>
              <Spinner />
              <div className="login__players-joined">
                {playersInRoom.map(player => (
                  <div key={player} className="login__player">
                    <div>{player}</div>
                    <div>Joined</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <h3 className="login__box-title">Are you ready?</h3>
              <div className="login__find-match-box">
                <button
                  className="login__item login__button login__button--guest"
                  onClick={handlePlayGame}
                >
                  Find oponents
                </button>
              </div>
            </>
          )
        ) : (
          <>
            <h3 className="login__box-title">Real-Time Typing Competition</h3>
            <div>
              <button
                className="login__item login__button login__button--google"
                onClick={handleGoogleLogin}
              >
                <img
                  className="login__google-logo-img"
                  src={googleLogo}
                  alt="main-logo"
                />
                <span>Signin with Google</span>
              </button>
            </div>
            <div className="login__item login__divider">
              <div className="login__sideline" />
              or <div className="login__sideline" />
            </div>
            <div>
              <button
                className="login__item login__button login__button--guest"
                onClick={handlePlayAsGuest}
              >
                <span>Play as a guest</span>
              </button>
            </div>
          </>
        )}
      </div>
      {!isWaitingForPlayers && displayRankings && (
        <Rankings setDisplayRankings={setDisplayRankings} />
      )}
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
