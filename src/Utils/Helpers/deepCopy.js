export const deepCopyArray = (array) => {
  // Check if the input is an array
  if (Array.isArray(array)) {
    // Create a new array to store the copy
    let copy = [];
    // Loop through each element of the original array
    for (let element of array) {
      // Recursively copy each element and push it to the new array
      copy.push(deepCopyArray(element));
    }
    // Return the new array
    return copy;
  } else {
    // If the input is not an array, return it as it is
    return array;
  }
};
