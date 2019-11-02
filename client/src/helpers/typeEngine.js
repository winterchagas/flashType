import {myUserInfo} from "./helpers";

// const fullSentence = 'The numbers in the table specifies the first browser version that fully supports the selector.';
const fullSentence = 'aa';
const sentenceLength = fullSentence.length;
const typedPhrase = [];
export const phraseFirstPart = [];
export const phraseErrorPart = [];
export const phraseSecondPart = [...fullSentence];
export const playersProgress = {};

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
  // todo debounce
  socket.emit('correctType', myUserInfo, progress)
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