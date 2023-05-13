import PaperMaterial from '@mui/material/Paper';
import styled from '@emotion/styled';
import getColors from '../Utils/Helpers/tileColor';

const Tile = (props) => {
  const StyledPaperMaterial = styled(PaperMaterial)((props) => ({
    width: '55px',
    height: '55px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginInline: '7px',
    marginBlock: '7px',
    fontSize: '28px',
    borderRadius: '10px',
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
