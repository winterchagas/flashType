import {getRandomInt} from '../../../server/helpers/helpers';
import dog0 from '../../../public/dog0.jfif';
import dog1 from '../../../public/dog1.jpg';
import dog2 from '../../../public/dog2.jpg';
import dog3 from '../../../public/dog3.jfif';
import dog4 from '../../../public/dog4.jpg';
import llama0 from '../../../public/llama0.jfif';
import llama1 from '../../../public/llama1.jpg';
import llama2 from '../../../public/llama2.jpg';
import llama3 from '../../../public/llama3.jpg';
import llama4 from '../../../public/llama4.jpg';
import sloth0 from '../../../public/sloth0.jpeg';
import sloth1 from '../../../public/sloth1.jpg';
import sloth2 from '../../../public/sloth2.jpg';
import sloth3 from '../../../public/sloth3.jpg';
import sloth4 from '../../../public/sloth4.jpeg';
import monkey0 from '../../../public/monkey0.jpeg';
import monkey1 from '../../../public/monkey1.jpg';
import monkey2 from '../../../public/monkey2.jpg';
import monkey3 from '../../../public/monkey3.jpg';
import monkey4 from '../../../public/monkey4.jfif';

const imageMap = {
  dog0,
  dog1,
  dog2,
  dog3,
  dog4,
  llama0,
  llama1,
  llama2,
  llama3,
  llama4,
  sloth0,
  sloth1,
  sloth2,
  sloth3,
  sloth4,
  monkey0,
  monkey1,
  monkey2,
  monkey3,
  monkey4,
};

export function getRandomImage(animalName) {
  // console.log('animalName', animalName);
  // console.log('merge', animalName.toLowerCase() + getRandomInt(5));
  return imageMap[animalName.toLowerCase() + getRandomInt(5)]
}