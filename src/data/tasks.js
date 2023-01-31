import { v4 } from 'uuid';
import {
  generateRandomBoolean,
  generateRandomDate,
  generateRandomPriority,
} from '../helpers/randomGenerators';

const taskTitles = [
  'Buy bread',
  'Learn React',
  'Go to the movies',
  'Clean the house',
  'Play Dark Souls for 20 hours',
  'Feed the dog',
  'Go to my best friend birthday',
  'Fix the toilet',
  'Go running',
  'Return The Lord of the Rings to the public library',
];

const generateTask = (title) => ({
  id: v4(),
  title,
  priority: generateRandomPriority(),
  creationDate: generateRandomDate(),
  isCompleted: generateRandomBoolean(),
});

export const generateTasks = () => taskTitles.map(generateTask);
