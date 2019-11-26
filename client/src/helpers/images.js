import {getRandomInt} from '../../../server/helpers/helpers';
import dog0 from '../../../assets/dog0.jfif';
import dog1 from '../../../assets/dog1.jpg';
import llama0 from '../../../assets/llama0.jfif';
import llama1 from '../../../assets/llama1.jpg';
import sloth0 from '../../../assets/sloth0.jpeg';
import sloth1 from '../../../assets/sloth1.jpg';
import monkey0 from '../../../assets/monkey0.jpeg';
import monkey1 from '../../../assets/monkey1.jpg';

const imageMap = {
  dog0,
  dog1,
  llama0,
  llama1,
  sloth0,
  sloth1,
  monkey0,
  monkey1,
};

export function getRandomImage(animalName) {
  console.log('animalName', animalName);
  console.log('merge', animalName + getRandomInt(1));
  return imageMap[animalName.toLowerCase() + getRandomInt(1)]
}