const twoSum = (array, sum) => {
  for (let i = 0; i < array.length; i++) {
    for (let k = i; k < array.length; k++) {
      if (array[i] + array[k] === sum) {
        return [i, k];
      }
    }
  }
  return [];
};

module.exports = twoSum;
