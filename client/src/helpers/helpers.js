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

export const userInfo = {
  id: '',
  name: '',
  email: ''
};
