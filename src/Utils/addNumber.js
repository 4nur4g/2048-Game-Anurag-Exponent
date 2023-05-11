export const addNumber = (newGrid) => {
  // Create an array called emptySpots and assign it an empty array
  let emptySpots = [];
  // Loop through each row of newGrid using a for loop with a variable i
  for (let i = 0; i < 4; i++) {
    // Loop through each column of newGrid using a for loop with a variable j
    for (let j = 0; j < 4; j++) {
      // Check if the value at newGrid[i][j] is equal to 0, which means it is empty
      if (newGrid[i][j] === 0) {
        // Push an array with i and j as elements to emptySpots
        emptySpots.push([i, j]);
      }
    }
  }
  // Check if emptySpots has any elements, which means there are empty spots on the grid
  if (emptySpots.length > 0) {
    console.log('Empty spots', emptySpots);
    // Pick a random element from emptySpots using Math.random and Math.floor and assign it to a variable called randomSpot
    let randomSpot = emptySpots[Math.floor(Math.random() * emptySpots.length)];
    console.log('Random spot', randomSpot);
    // Assign newGrid[randomSpot[0]][randomSpot[1]] a random value of either 2 or 4 with a 50% chance each using Math.random
    newGrid[randomSpot[0]][randomSpot[1]] = Math.random() > 0.5 ? 2 : 4;

    console.log('new grid', newGrid);
  } else {
    // If emptySpots has no elements, which means the grid is full, call checkIfGameOver function to see if the game is over
    let gameOverr = checkIfGameOver();
    // If gameOverr is true, alert 'game over' and set gameOver to true
    if (gameOverr) {
      alert('game over');
      // setGameOver(true);
    }
    // setGameOver(true);
  }
};
