import {myUserInfo} from "./helpers";

let fullSentence;
let sentenceLength;
const typedPhrase = [];
export const phraseFirstPart = [];
export const phraseErrorPart = [];
export let phraseSecondPart;
export const playersProgress = {};

export function setSentence(newSentence) {
  fullSentence = newSentence;
  sentenceLength = newSentence.length;
  phraseSecondPart = [...newSentence];
}

export function handleCorrectType(
  socket,
  character,
  setIsEndOfSentence
) {
  const removedCharacter = phraseSecondPart.shift();
  phraseFirstPart.push(removedCharacter);
  typedPhrase.push(character);
  const progress = calculatePlayer1Progress(setIsEndOfSentence);
  playersProgress[myUserInfo.userId] = progress;
  socket.emit('correctType', progress)
}

export function handleWrongType(character) {
  const removedCharacter = phraseSecondPart.shift();
  phraseErrorPart.push(removedCharacter);
  typedPhrase.push(character);
}

export function handleBackspaceType() {
  if (phraseSecondPart.length < sentenceLength) {
    if (phraseErrorPart.length > 0) {
      const removedCharacter = phraseErrorPart.pop();
      phraseSecondPart.unshift(removedCharacter);
    } else {
      const removedCharacter = phraseFirstPart.pop();
      phraseSecondPart.unshift(removedCharacter);
    }
    typedPhrase.pop();
    playersProgress[myUserInfo.userId] = calculatePlayer1Progress();
    return true;
  }
  return false;
}

export const hasPreviousTypeError = () => phraseErrorPart.length > 0;

export const isNextCharacterCorrect = (character) => character === phraseSecondPart[0];

export function calculatePlayer1Progress(setIsEndOfSentence) {
  const progress = ((phraseFirstPart.length / sentenceLength) * 100)
    .toFixed(0);
  if (parseInt(progress) === 100) setIsEndOfSentence(true);
  return progress;
}