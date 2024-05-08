import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import CourseCard from "./Components/CourseCard";
import CourseList from "./Components/CourseList";
import DateCalendarValue from "./Components/DateCalendar";


export default function Main(props) {
  const handleSelectionChange = (selectedValue) => {
    console.log("Selected value:", selectedValue);
  }
  return (
        
      <Container style={{marginTop: '30px'}}>
        <h1>Book a Tee Time</h1>

          <DateCalendarValue />
    
      </Container>
   
  );
}
