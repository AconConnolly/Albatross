import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ImageCollage from "../ImageCollage";
import CustomizedAccordions from "../CustomizedAccordions";
import Course from "../../pages/Course";
import { courses } from "../ParentDataTable";

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



const MapleRidge = () => {
  const courseName = "Maple Ridge";
  const courseImage = "src/Components/Images/MLake.jpg";
  const aboutText = "Maple good";
  const faqData = courses["maple"];
  

  return ( 
  <Course
    courseImage={courseImage}
    courseName={courseName}
    aboutText={aboutText}
    faqData={faqData}
  />
 
  )
};

export default MapleRidge;
