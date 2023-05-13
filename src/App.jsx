import { createGrid } from './Utils/Helpers/grid.js';
import { useState, useEffect, useRef } from 'react';
import Tile from './components/Tile';
import {
  Box,
  Button,
  Stack,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from '@mui/material';
import GameBox from './components/GameBox.jsx';
import styled from '@emotion/styled';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import GameOverOverlay from './components/GameOverOverlay.jsx';
import GameWonOverlay from './components/GameWonOverlay.jsx';
import deepCopyArray from './Utils/Helpers/deepCopy.js';

const ResetGame = styled(Button)(({ theme }) => ({
  color: '#645B52',
  backgroundColor: '#FFDEB4',
  borderRadius: '10px',
  '&:hover': {
    backgroundColor: '#FFEBB4',
  },
  marginBottom: '10px',
}));

const UP_ARROW = 38;
const DOWN_ARROW = 40;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

function App() {
  const [gridDimen, setGridDimen] = useState(4);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [score, setScore] = useState(0);
  const run = useRef(0);
  const zeroGrid = createGrid(gridDimen);
  const tileToWin = 2048;

  const [data, setData] = useState(zeroGrid);

  const initialize = () => {
    let newGrid = deepCopyArray(data);
    addNumber(newGrid);
    addNumber(newGrid);
    setData(newGrid);
  };

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (run.current < 1) {
      run.current += 1;
    } else {
      resetGame();
    }
  }, [gridDimen]);

  // Reset
  const resetGame = () => {
    setGameOver(false);
    setGameWon(false);
    setScore(0);
    addNumber(zeroGrid);
    addNumber(zeroGrid);
    setData(zeroGrid);
  };

  const handleKeyDown = (event) => {
    if (
      [UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW].includes(event.keyCode)
    ) {
      event.preventDefault();
    }
    if (gameOver) {
      return;
    }
    switch (event.keyCode) {
      case UP_ARROW:
        //
        swipeUp();
        //
        break;
      case DOWN_ARROW:
        //
        swipeDown();
        //
        break;
      case LEFT_ARROW:
        //
        swipeLeft();
        //
        break;
      case RIGHT_ARROW:
        //
        swipeRight();
        //
        break;
      default:
        // do nothing if any other key is pressed
        return;
    }

    let gameOverr = checkIfGameOver();
    if (gameOverr) {
      setGameOver(true);
    }
  };
  useEffect(() => {
    // initiate the event handler
    window.addEventListener('keydown', handleKeyDown, false);

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      window.removeEventListener('keydown', handleKeyDown, false);
    };
  }, [data]);

  const addNumber = (newGrid) => {
    // Create an array called emptySpots and assign it an empty array
    let emptySpots = [];
    // Loop through each row of newGrid using a for loop with a variable i
    for (let i = 0; i < gridDimen; i++) {
      // Loop through each column of newGrid using a for loop with a variable j
      for (let j = 0; j < gridDimen; j++) {
        // Check if the value at newGrid[i][j] is equal to 0, which means it is empty
        if (newGrid[i][j] === 0) {
          // Push an array with i and j as elements to emptySpots
          emptySpots.push([i, j]);
        }
      }
    }
    // Check if emptySpots has any elements, which means there are empty spots on the grid
    if (emptySpots.length > 0) {
      // Pick a random element from emptySpots using Math.random and Math.floor and assign it to a variable called randomSpot
      let randomSpot =
        emptySpots[Math.floor(Math.random() * emptySpots.length)];

      // Assign newGrid[randomSpot[0]][randomSpot[1]] a random value of either 2 or 4 with a 50% chance each using Math.random
      newGrid[randomSpot[0]][randomSpot[1]] = Math.random() > 0.5 ? 2 : 4;
    } else {
      setGameOver(true);
    }
  };

  const swipeLeft = (dummy) => {
    //
    let oldGrid = data;
    let newArray = deepCopyArray(data);

    for (let i = 0; i < gridDimen; i++) {
      let b = newArray[i];
      let slow = 0;
      let fast = 1;
      while (slow < gridDimen) {
        if (fast === gridDimen) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast++;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast++;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            const addToScore = b[slow];
            if (addToScore === tileToWin) {
              setGameWon(true);
            }
            setScore(score + addToScore);
            b[fast] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldGrid) !== JSON.stringify(newArray)) {
      addNumber(newArray);
    }
    if (dummy) {
      return newArray;
    } else {
      setData(newArray);
    }
  };

  const swipeRight = (dummy) => {
    //
    let oldData = data;
    let newArray = deepCopyArray(data);

    for (let i = gridDimen - 1; i >= 0; i--) {
      let b = newArray[i];
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow] === 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] === 0 && b[fast] !== 0) {
          b[slow] = b[fast];
          b[fast] = 0;
          fast--;
        } else if (b[slow] !== 0 && b[fast] === 0) {
          fast--;
        } else if (b[slow] !== 0 && b[fast] !== 0) {
          if (b[slow] === b[fast]) {
            b[slow] = b[slow] + b[fast];
            const addToScore = b[slow];
            if (addToScore === tileToWin) {
              setGameWon(true);
            }
            setScore(score + addToScore);
            b[fast] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(newArray) !== JSON.stringify(oldData)) {
      addNumber(newArray);
    }
    if (dummy) {
      return newArray;
    } else {
      setData(newArray);
    }
  };

  const swipeDown = (dummy) => {
    //
    //
    let b = deepCopyArray(data);
    let oldData = JSON.parse(JSON.stringify(data));
    for (let i = gridDimen - 1; i >= 0; i--) {
      let slow = b.length - 1;
      let fast = slow - 1;
      while (slow > 0) {
        if (fast === -1) {
          fast = slow - 1;
          slow--;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast--;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];

            const addToScore = b[slow][i];
            if (addToScore === tileToWin) {
              setGameWon(true);
            }
            setScore(score + addToScore);

            b[fast][i] = 0;
            fast = slow - 1;
            slow--;
          } else {
            slow--;
            fast = slow - 1;
          }
        }
      }
    }
    if (JSON.stringify(b) !== JSON.stringify(oldData)) {
      addNumber(b);
    }
    if (dummy) {
      return b;
    } else {
      setData(b);
    }
  };

  const swipeUp = (dummy) => {
    //
    let b = deepCopyArray(data);
    let oldData = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < gridDimen; i++) {
      let slow = 0;
      let fast = 1;
      while (slow < gridDimen) {
        if (fast === gridDimen) {
          fast = slow + 1;
          slow++;
          continue;
        }
        if (b[slow][i] === 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] === 0 && b[fast][i] !== 0) {
          b[slow][i] = b[fast][i];
          b[fast][i] = 0;
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] === 0) {
          fast++;
        } else if (b[slow][i] !== 0 && b[fast][i] !== 0) {
          if (b[slow][i] === b[fast][i]) {
            b[slow][i] = b[slow][i] + b[fast][i];

            const addToScore = b[slow][i];

            if (addToScore === tileToWin) {
              setGameWon(true);
            }
            setScore(score + addToScore);

            b[fast][i] = 0;
            fast = slow + 1;
            slow++;
          } else {
            slow++;
            fast = slow + 1;
          }
        }
      }
    }
    if (JSON.stringify(oldData) !== JSON.stringify(b)) {
      addNumber(b);
    }
    if (dummy) {
      return b;
    } else {
      setData(b);
    }
  };

  const checkIfGameOver = () => {
    let checker = swipeLeft(true);

    if (JSON.stringify(data) !== JSON.stringify(checker)) {
      return false;
    }

    let checker2 = swipeDown(true);

    if (JSON.stringify(data) !== JSON.stringify(checker2)) {
      return false;
    }

    let checker3 = swipeRight(true);

    if (JSON.stringify(data) !== JSON.stringify(checker3)) {
      return false;
    }

    let checker4 = swipeUp(true);

    if (JSON.stringify(data) !== JSON.stringify(checker4)) {
      return false;
    }

    return true;
  };

  const selectionHandler = (event) => {
    setGridDimen(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          position: 'relative',
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: '10px',
            borderRadius: '10px',
            maxWidth: 'fit-content',
            position: 'relative',
            background: '#FFF8D6',
          }}
        >
          {gameWon && <GameWonOverlay buttonHandler={resetGame} />}
          {gameOver && <GameOverOverlay buttonHandler={resetGame} />}
          <Stack direction='row' spacing={2} justifyContent='center'>
            <ResetGame variant='contained' onClick={resetGame}>
              Reset Game
            </ResetGame>

            <Chip
              sx={{
                height: '36px',
                fontSize: '26px',
                color: '#645B52',
                background: '#FBFFB1',
              }}
              icon={<SportsScoreIcon />}
              label={`${score}`}
              variant='outlined'
            />
            <FormControl
              sx={{ m: 1, minWidth: 120, color: '#645B52' }}
              size='small'
            >
              <InputLabel id='demo-select-small-label'>Dimension</InputLabel>
              <Select
                labelId='demo-select-small-label'
                id='demo-select-small'
                value={gridDimen}
                label='Dimensions'
                onChange={(event) => selectionHandler(event)}
              >
                <MenuItem value={4}>4X4</MenuItem>
                <MenuItem value={5}>5X5</MenuItem>
                <MenuItem value={6}>6X6</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          {data.map((row, oneIndex) => {
            return (
              <GameBox key={oneIndex}>
                {row.map((digit, index) => (
                  <Tile key={index}>{digit}</Tile>
                ))}
              </GameBox>
            );
          })}
        </Paper>
      </Box>
    </>
  );
}

export default App;
