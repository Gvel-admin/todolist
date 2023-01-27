// Generate a random date
export function generateRandomDate() {
  const start = new Date('2022-12-01');
  const end = new Date('2023-01-31');

  const diff = end.getTime() - start.getTime();
  const randomMilliseconds = Math.random() * diff;
  const randomDate = new Date(start.getTime() + randomMilliseconds);
  return randomDate.toISOString();
}

// ----------------------------------------------------------------------
// Generate a random priority
export function generateRandomPriority() {
  const min = 1;
  const max = 3;

  const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNumber;
}

// ----------------------------------------------------------------------
// Generate a random boolean
export function generateRandomBoolean() {
  const randomBoolean = Math.random() <= 0.5;
  return randomBoolean;
}
