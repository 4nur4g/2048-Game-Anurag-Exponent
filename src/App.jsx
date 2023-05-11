import { createGrid } from './Utils/grid';
import { useState, useEffect } from 'react';
import Tile from './components/Tile';
import { Card, Box, Button } from '@mui/material';
import { deepCopyArray } from '../../Assignments/2048-Anurag/src/utils/util';
import { addNumber } from './Utils/addNumber';

const UP_ARROW = 38;
const DOWN_ARROW = 40;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

function App() {
  const [gridDimen, setGridDimen] = useState(4);
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

  const handleKeyDown = (event) => {
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
  };
  

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button>New Game</Button>
      <Card>
        {data.map((row, oneIndex) => {
          return (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              key={oneIndex}
            >
              {row.map((digit, index) => (
                <Tile key={index}>{digit}</Tile>
              ))}
            </Box>
          );
        })}
      </Card>
    </Box>
  );
}

export default App;
