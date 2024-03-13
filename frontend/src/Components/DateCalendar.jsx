import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import CourseSelection from "./CourseSelection";
import Container from "@mui/material/Container";

export default function StaticDateTimePickerLandscape() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container style={{ marginBottom: "30px", alignContent: "center" }}>
        <CourseSelection style={{ fontSize: "larger" }} />
      </Container>
      <StaticDateTimePicker
        orientation="landscape"
        className="customDateTimePicker"
        style={{
          width: "200px",
          gridAutoColumns: "unset",
          backgroundColor: "black",
        }}
      ></StaticDateTimePicker>
    </LocalizationProvider>
  );
}
