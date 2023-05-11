import PaperMaterial from '@mui/material/Paper';

const Tile = (props) => {
  return (
    <PaperMaterial
      sx={{
        width: '55px',
        height: '55px',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginInline: '5px',
        marginBlock: '5px',
        fontSize: '28px',
      }}
      elevation={3}
      {...props}
    >
      {props.children}
    </PaperMaterial>
  );
};

export default Tile;
