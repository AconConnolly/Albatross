import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ImageCollage from "../Components/ImageCollage";
import CustomizedAccordions from "../Components/CustomizedAccordions";

const Course = ({courseName, courseImage, aboutText, faqData}) => (
  <Container sx={{ width: 900 }}>
    <Typography variant="h3" component="h1" marginTop={3}>
      {courseName}
    </Typography>
    <Box marginTop={3} sx={{ display: "flex" }}>
      <img src={courseImage} alt={courseName} height={375} />
      <ImageCollage />
    </Box>
    <Box>
      <Typography variant="h6" component="h4" marginTop={3}>
        About this course
      </Typography>
      <Typography variant="paragraph" component="p" marginTop={3}>
        {aboutText}
      </Typography>
    </Box>
    <Box>
      <Typography variant="h6" component="h4" marginTop={3}>
        Fequently Asked Questions
      </Typography>
     <CustomizedAccordions faqData={faqData}/>
    </Box>
  </Container>
);

export default Course;
