import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import CourseSelection from "./CourseSelection";

export default function StaticDateTimePickerLandscape() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <StaticDateTimePicker
  orientation="landscape"
  className="customDateTimePicker"
  style={{
    width: '200px',
    gridAutoColumns: 'unset',
    backgroundColor: 'black' 
  }} >
  
  </StaticDateTimePicker>
  <CourseSelection style={{ marginTop: '400px'}}/>


    </LocalizationProvider>
  );
}
