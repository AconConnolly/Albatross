import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ImageCollage from "../Components/ImageCollage";
import CustomizedAccordions from "../Components/Accordian";

const Course = () => (
  <Container sx={{ width: 900 }}>
    <Typography variant="h3" component="h1" marginTop={3}>
      Shaganappi Point
    </Typography>
    <Box marginTop={3} sx={{ display: "flex" }}>
      <img src="src/components/ShagMain.jpg" alt="" height={375} />
      <ImageCollage />
    </Box>
    <Box>
      <Typography variant="h6" component="h4" marginTop={3}>
        About this course
      </Typography>
      <Typography variant="paragraph" component="p" marginTop={3}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium sit
        pariatur atque ullam, architecto quia nihil enim magni reprehenderit
        error recusandae placeat eius exercitationem labore voluptatibus
        quibusdam nam nobis cupiditate?
      </Typography>
    </Box>
    <Box>
      <Typography variant="h6" component="h4" marginTop={3}>
        Fequently Asked Questions
      </Typography>
     <CustomizedAccordions/>
    </Box>
  </Container>
);

export default Course;
