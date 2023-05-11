// A function to create a square grid of n dimension
export const createGrid = (n) => {
  // Initialize an empty array to store the grid
  let grid = [];
  // Loop from 0 to n-1
  for (let i = 0; i < n; i++) {
    // Initialize an empty array to store the row
    let row = [];
    // Loop from 0 to n-1
    for (let j = 0; j < n; j++) {
      // Push a zero to the row array
      row.push(0);
    }
    // Push the row array to the grid array
    grid.push(row);
  }
  // Return the grid array
  return grid;
};
