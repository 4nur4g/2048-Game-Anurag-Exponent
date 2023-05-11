import { createGrid } from "./Utils/Helpers/grid.js";
import { useState, useEffect } from "react";
import Tile from "./components/Tile";
import {Card, Box, Button, Stack, Chip} from "@mui/material";
import { deepCopyArray } from "../../Assignments/2048-Anurag/src/utils/util";
import { addNumber } from "./Utils/addNumber";
import GameBox from "./components/GameBox.jsx";
import styled from "@emotion/styled";
import SportsScoreIcon from '@mui/icons-material/SportsScore';

const StyledButton = styled(Button)({
    borderRadius: '10px',
  marginBottom: '5px',
  color: 'rosybrown',
  borderColor: 'rosybrown',
})

const UP_ARROW = 38;
const DOWN_ARROW = 40;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

function App() {
  const [gridDimen, setGridDimen] = useState(4);
  const [gameOver, setGameOver] = useState(false);
  const [score,setScore] = useState(0);
  console.log(gameOver);
  const zeroGrid = createGrid(gridDimen);

  const [data, setData] = useState(zeroGrid);

  const initialize = () => {
    let newGrid = deepCopyArray(data);
    addNumber(newGrid);
    addNumber(newGrid);
    setData(newGrid);
  };

  useEffect(() => {
    initialize();
    // eslint-disable-next-line
  }, []);

  // Reset
  const resetGame = () => {
    setGameOver(false);
    addNumber(zeroGrid);
    addNumber(zeroGrid);
    setData(zeroGrid);
  };

  const handleKeyDown = (event) => {
    event.preventDefault();
    if (gameOver) {
      return;
    }
    switch (event.keyCode) {
      case UP_ARROW:
        // alert("up");
        // console.table(data);
        swipeUp();
        // console.table(data);
        break;
      case DOWN_ARROW:
        // console.table(data);
        swipeDown();
        // console.table(data);
        break;
      case LEFT_ARROW:
        // console.table(data);
        swipeLeft();
        // console.table(data);
        break;
      case RIGHT_ARROW:
        // console.table(data);
        swipeRight();
        // console.table(data);
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
    window.addEventListener("keydown", handleKeyDown, false);

    // this will clean up the event every time the component is re-rendered
    return function cleanup() {
      window.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [data]);

  const swipeLeft = (dummy) => {
    // console.log('swipe left');
    let oldGrid = data;
    let newArray = deepCopyArray(data);

    for (let i = 0; i < 4; i++) {
      let b = newArray[i];
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
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
      console.log("adding number to new array, the result is", newArray);
    }
    if (dummy) {
      return newArray;
    } else {
      console.log("setting data");
      setData(newArray);
      console.log("The data should be equal to new array", data, newArray);
    }
  };

  const swipeRight = (dummy) => {
    // console.log('swipe right');
    let oldData = data;
    let newArray = deepCopyArray(data);

    for (let i = 3; i >= 0; i--) {
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
    // console.log('swipe down');
    // console.log(data);
    let b = deepCopyArray(data);
    let oldData = JSON.parse(JSON.stringify(data));
    for (let i = 3; i >= 0; i--) {
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
    // console.log('swipe up');
    let b = deepCopyArray(data);
    let oldData = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < 4; i++) {
      let slow = 0;
      let fast = 1;
      while (slow < 4) {
        if (fast === 4) {
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
    // console.log('CHECKING GAME OVER');
    // let original = deepCopyArray(data);
    let checker = swipeLeft(true);

    if (JSON.stringify(data) !== JSON.stringify(checker)) {
      return false;
    }

    let checker2 = swipeDown(true);
    // console.log('CHECKER DOWN');
    // console.table(data);
    // console.table(checker2);
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

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: '100vh' }}>
        <Card sx={{ padding: "10px", borderRadius: "10px", maxWidth: 'fit-content'}}>
          <Stack direction = "row" spacing = {2} >
          <StyledButton variant="outlined" onClick={resetGame}>
            Reset Game
          </StyledButton>

          <Chip icon={<SportsScoreIcon />} label={`Score:${score}`} variant="outlined" />
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
        </Card>
      </Box>
    </>
  );
}

export default App;
