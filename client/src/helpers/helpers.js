const allowedCharacters = {
  q: true, w: true, e: true, r: true, t: true, y: true, u: true,
  i: true, o: true, p: true, a: true, s: true, d: true, f: true,
  g: true, h: true, j: true, k: true, l: true, "'": true,
  Enter: true, z: true, x: true, c: true, v: true, b: true,
  n: true, m: true, ',': true, '.': true, '?': true, Q: true,
  W: true, E: true, R: true, T: true, Y: true, U: true, I: true,
  O: true, P: true, A: true, S: true, D: true, F: true, G: true,
  H: true, J: true, K: true, L: true, Z: true, X: true, C: true,
  V: true, B: true, N: true, M: true, ' ': true, 'Backspace': true
};

export function shouldCaptureCharacter(character) {
  return allowedCharacters[character];
}

export let myUserInfo = {};
export let playersInfo = {};
export let playersIdNumbersMap = {};

export function setMyUserInfo(userData) {
  Object.keys(userData).forEach((key) => {
    myUserInfo[key] = userData[key];
  })
}

export function addPlayers(playersData) {
  for (let key of Object.keys(playersData)) {
    const position = Object.keys(playersIdNumbersMap).length + 1;
    if (key !== myUserInfo.userId) {
      playersIdNumbersMap[position] = key;
      playersInfo[key] = playersData[key];
    }
  }
}

export function deletePlayer(playerId) {
  if (playersInfo[playerId]) delete playersInfo[playerId];
}

export function buildGoogleSignInPayload(currentUser) {
  const profile = currentUser.getBasicProfile();
  return {
    userId: currentUser.getId(),
    userName: profile.getName(),
    email: profile.getEmail(),
    image: profile.getImageUrl(),
  }
}

export function setUserInfoFromGoogle(googleAuth) {
  const googleUser = googleAuth.currentUser.get();
  const userInfo = {
    userId: googleUser.getId(),
    userName: googleUser.getBasicProfile().getName(),
    googleUser: true,
  };
  setMyUserInfo(userInfo);
}

export function makePlayersInRoom() {
  return Object.keys(playersInfo)
    .map(key => playersInfo[key]);
}

export function noOp() {
  return null;
}
