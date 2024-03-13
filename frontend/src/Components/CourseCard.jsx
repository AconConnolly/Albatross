import { AccessTime } from "@mui/icons-material";
import { Box, Grid, Typography, createStyles } from "@mui/material";
import Paper from "@mui/material/Paper";
import "./CourseList";
import CourseList from "./CourseList";
import styled from "@emotion/styled";

const Image = styled("img")(
    ({theme})=>({
        maxWidth: "240px"
    })
)

const CourseCard = ({ title, time, players, imageSrc, altText }) => {
  return (
    <Grid item xs={3}>
      <Paper elevation={4}
      sx={{
        padding: "8px"
      }}>
        <Image src={imageSrc} alt={altText}/>
        <Box paddingX={1}>
          <Typography variant="subtitle1" component="h2">
            {title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <AccessTime sx={{ width: 15.5 }} />
            <Typography variant="body2" component="p" marginLeft={0.5}>
              {time}
              {/* This will need to be passed the successfully booked time*/}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" component="p">
              {players}
              {/* This will need to be passed the number of players*/}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default CourseCard;
