/**
 * Function to check if an Object is empty or not
 *
 */
const isEmpty = object => {
  if (Object.keys(object).length === 0) {
    return true;
  }
  return false;
};

export default isEmpty;
