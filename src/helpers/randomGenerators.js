// Generate a random date
export const generateRandomDate = () => {
  const start = new Date('2022-12-01').getTime();
  const end = new Date('2023-02-31').getTime();

  const randomMilliseconds = start + Math.random() * (end - start);
  return new Date(randomMilliseconds).toISOString();
};

// ----------------------------------------------------------------------
// Generate a random priority
export const generateRandomPriority = () => {
  const min = 1;
  const max = 3;

  const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
};

// ----------------------------------------------------------------------
// Generate a random boolean
export const generateRandomBoolean = () => {
  const randomBoolean = Math.random() <= 0.5;
  return randomBoolean;
};
