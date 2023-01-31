// Convert date to milliseconds, mostly for date comparison
export const convertDateToMS = (date = new Date()) => {
  // default parameter date = new Date() is to handle "today" date conversion.
  // => If function is called empty, parameter = new Date()
  return new Date(date).getTime();
};
