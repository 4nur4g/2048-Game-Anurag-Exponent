import PaperMaterial from '@mui/material/Paper';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { getColors } from '../../../Assignments/2048-Anurag/src/utils/util';

const Tile = (props) => {
  const StyledPaperMaterial = styled(PaperMaterial)((props) => ({
    width: '55px',
    height: '55px',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginInline: '5px',
    marginBlock: '5px',
    fontSize: '28px',
    background: `${getColors(props.children)}`,
    color: props.children === 2 || props.children === 4 ? '#645B52' : '#F7F4EF',
  }));

  return (
    <StyledPaperMaterial elevation={3} {...props}>
      {props.children !== 0 ? props.children : ''}
    </StyledPaperMaterial>
  );
};

export default Tile;
