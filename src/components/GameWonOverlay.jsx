import {Button, Card, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {purple} from "@mui/material/colors";


const TryAgain = styled(Button)(({ theme }) => ({
    backgroundColor: "#643843",
    '&:hover': {
        backgroundColor: "#E86A33",
    },

}));

const GameWonOverlay = (props) => {

    return (<>
        <Card sx={{
            backdropFilter: "blur(2px)", zIndex: "2",
            background: "rgba(165, 42, 42, 0.2)", position: "absolute", height: "100%", width: "100%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#643843",
            flexDirection: "column"
        }}>
            <Typography variant="h4" sx={{textAlign: "center", fontWeight: "bold", display: "block", marginBottom:"5px"}}>
                Congrats! You Won!
            </Typography>
            <TryAgain onClick={props.buttonHandler} variant="contained">Play Again!</TryAgain>
        </Card>
    </>)
}

export default GameWonOverlay