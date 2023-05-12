import {Button, Card, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {purple} from "@mui/material/colors";


const TryAgain = styled(Button)(({ theme }) => ({
    backgroundColor: "#643843",
    '&:hover': {
        backgroundColor: "#E86A33",
    },

}));

const GameOverOverlay = (props) => {

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
            <Typography variant="h4" sx={{textAlign: "center", fontWeight: "bold", display: "block"}}>
                Game Over
            </Typography>
            <TryAgain onClick={props.buttonHandler} variant="contained">Try Again</TryAgain>
        </Card>
    </>)
}

export default GameOverOverlay