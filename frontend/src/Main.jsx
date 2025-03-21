import * as React from "react";
import Container from "@mui/material/Container";
import DateCalendarValue from "./Components/DateCalendar";
import { Box } from "@mui/material";

export default function Main(props) {
  const handleDateChange = (event) => {
    console.log("Event Information:", event);
    //Do something with the event info
  };

  // The Book button needs to pass the users credentials (username and password) as well as the time from the DateCalendarValue to the backend applciation (Postman?)
  return (
    <Container style={{ marginTop: "30px" }}>
      <h1>Book a Tee Time</h1>
      <Container>
        <DateCalendarValue onDateChange={handleDateChange} />
      </Container>
      <Box display="flex" justifyContent="center" marginTop="20px">
        <button
          style={{
            margin: "15px",
            padding: "10px 15px",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          BOOK
        </button>
      </Box>
    </Container>
  );
}
