
import MaterialBox from "@mui/material/Box";
import styled from "@emotion/styled";

const Box = styled(MaterialBox)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})

const GameBox = (props) => {
    return (
        <Box>
            {props.children}
        </Box>
    )
}

export default GameBox


