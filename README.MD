# The 2048 game

This is a react project that uses functional programming to create the 2048 game.

You can see the final outcome by clicking on this [link](https://4nur4g.github.io/2048-Game-Anurag-Exponent/) to the web app.

The project consists of several functions that perform different tasks to achieve the game logic.

The game data is stored in a list-based, Y X Y grid, where Y is the number of rows and columns. Each element in the grid represents a tile on the game board.

The grid is updated and displayed on the UI as the game progresses.

The game ends when either the player reaches the 2048 tile or there are no more valid moves. In the former case, the player wins the game. In either case, an overlay shows a message and gives the option to reset or replay the game.

## Main functions

- **setGame**: This function initializes the game grid by placing two random numbers at two random locations. It is called when the game starts or when the reset or try again button is clicked.
- **handleKeyDown**: This function handles the keyboard events. It calls the appropriate functions when arrow keys are pressed.
- **swipeLeft/swipeRight/swipeUp/swipeDown**: These functions handle the tile movement in each direction when an arrow key is pressed. They use a two-pointer algorithm to compare values in each row or column and perform some actions or calculations. They update the tile array state to create the effect of tile movement.
- **addNumber**: This function finds the empty spots on the game board and adds either 2 or 4 at one of them randomly after every move.
- **checkIfGameOver**: This function checks if there are any valid moves left for the player after every move. If not, it sets a flag to true.
- **selectionHandler**: This function handles the selection menu that has dimension options. It sets the game grid dimensions according to the user input. It does so by changing the state of the grid data.

## Utility functions

- **deepCopyArray**: This function returns a deep copy of a given array.
- **createGrid**: This function creates a Y X Y grid with 0 as initial values.
- **getColors**: This function returns tile color data based on a given number.

## UI components

- **GameBox**: This component renders the game board and tiles.
- **GameOverOverlay**: This component renders an overlay when the game is over.
- **GameWonOverlay**: This component renders an overlay when the game is won.
- **Tile**: This component renders a single tile with a number and color.

Most of the logic is written in `App.js` file.

To review the code, please collapse all functions to get an overview of how they fit together. Then you can analyze each function individually.

I hope this information was helpful to you. If you have any questions or queries, please feel free to contact me at anuragp936@gmail.com.

Anurag
