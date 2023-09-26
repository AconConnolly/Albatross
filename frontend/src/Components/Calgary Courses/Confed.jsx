import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ImageCollage from "../../Components/ImageCollage";
import CustomizedAccordions from "../CustomizedAccordions";
import Course from "../../pages/Course";

function createData(age, day, weekEnd) {
  return { age, day, weekEnd };
}

const allConfedImages = [
  {
    img: "src/components/Images/confed5.jpg",
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    img: "src/components/Images/confed5.jpg",
    title: "Burger",
  },
  {
    img: "src/components/Images/confed5.jpg",
    title: "Camera",
  },
  {
    img: "src/components/Images/confed5.jpg",
    title: "Coffee",
    cols: 2,
  },
  {
    img: "src/components/Images/confed5.jpg",
    title: "Hats",
    cols: 2,
  },
  {
    img: "src/components/Images/confed5.jpg",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
  },
  {
    img: "src/components/Images/confed5.jpg",
    title: "Basketball",
  },
  {
    img: "src/components/Images/confed5.jpg",
    title: "Fern",
  },
  {
    img: "src/components/Images/confed5.jpg",
    title: "Mushrooms",
    rows: 2,
    cols: 2,
  },
  {
    img: "src/components/Images/confed5.jpg",
    title: "Tomato basil",
  },
  {
    img: "src/components/Images/confed5.jpg",
    title: "Sea star",
  },
  {
    img: "src/components/Images/confed5.jpg",
    title: "Bike",
    cols: 2,
  },
];

const confed = [
  createData("Regular", "$34.00", "$38.00"),
  createData("Senior (65+)", "$30.00", "$38.00"),
  createData("Junior (4-17)", "$23.75", "$23.75"),
  //23 and 23
];

const confedInfo = () => {
  const courseName = "Confederation Park";
  const courseImage = "src/components/confederation-hero.jpg";
  const aboutText = "Confed good";
  const faqData = [{ confed }];

  <Course
    courseImage={courseImage}
    courseName={courseName}
    aboutText={aboutText}
    faqData={faqData}
  />
  //   <Container sx={{ width: 1000 }} >
  //     <Typography variant="h3" component="h1" marginTop={3}>
  //       Confederation Park
  //     </Typography>
  //     <Box marginTop={3} sx={{ display: "flex" }} >
  //       <img src="src/components/Images/confederation-hero.jpg" alt="" height={375} width={575}/>
  //       <ImageCollage />
  //     </Box>
  //     <Box>
  //       <Typography variant="h6" component="h4" marginTop={3}>
  //         About this course
  //       </Typography>
  //       <Typography variant="paragraph" component="p" marginTop={3}>
  //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium sit
  //         pariatur atque ullam, architecto quia nihil enim magni reprehenderit
  //         error recusandae placeat eius exercitationem labore voluptatibus
  //         quibusdam nam nobis cupiditate?
  //       </Typography>
  //     </Box>
  //     <Box>
  //       <Typography variant="h6" component="h4" marginTop={3}>
  //         Fequently Asked Questions
  //       </Typography>
  //      <CustomizedAccordions/>
  //      <Typography
  //           variant="subtitle1"
  //           align="center"
  //           color="text.secondary"
  //           component="p"
  //           padding={5}
  //         >
  //           Something here to give the footer a purpose!
  //         </Typography>
  //     </Box>

  //   </Container>
};

export default confedInfo;
