import { createGrid } from './Utils/grid';
import { useState } from 'react';
import Tile from './components/Tile';
import { Card, Box, Button } from '@mui/material';

function App() {
  const [gridDimen, setGridDimen] = useState(4);
  const zeroGrid = createGrid(gridDimen);

  const [data, setData] = useState(zeroGrid);

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
