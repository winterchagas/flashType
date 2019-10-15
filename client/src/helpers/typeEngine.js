const fullSentence = 'The numbers in the table specifies the first browser version that fully supports the selector.';
// const fullSentence = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
const sentenceLength = fullSentence.length;
const typedPhrase = [];
export const phraseFirstPart = [];
export const phraseErrorPart = [];
export const phraseSecondPart = [...fullSentence];

export function handleCorrectType(
  socket,
  {id, roomId},
  progress,
  character
) {
  const removedCharacter = phraseSecondPart.shift();
  phraseFirstPart.push(removedCharacter);
  typedPhrase.push(character);
  socket.emit('correctType', id, roomId, progress)
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

export function calculatePlayer1Progress(setIsGameOver) {
  const progress = ((phraseFirstPart.length / sentenceLength) * 100)
    .toFixed(0);
  if (parseInt(progress) === 100) setIsGameOver(true);
  return progress;
}