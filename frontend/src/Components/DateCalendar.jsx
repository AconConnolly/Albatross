import React, { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import CourseSelection from "./CourseSelection";
import Container from "@mui/material/Container";

export default function DateCalendar(props) {
  const [value, setValue] = useState(null);
  const [initialValue, setSelectedDate] = useState(new Date());
  
  const onDatePicked = (event) => {
    setValue(event);
    setSelectedDate(event);
    let onlyDate = event.$d.toISOString();
    
    console.log("Date Changed", event, onlyDate);
    //Event Day, hour, and minute
    console.log (`Full info = ${event.$d} Day ${event.$D}, hour ${event.$H}, minute ${event.$m}, Month ${event.$d.getMonth() + 1}`);

    props.onDateChange(event);
  };

  useEffect(() => {
    if (props.initialValue !== 0 && value === null) {
      setValue(props.initialValue);
      console.log("Initial Date is", props.initialValue);
    } 
  }, [props.initialValue, value]);


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container style={{ marginBottom: "30px", alignContent: "center" }}>
        <CourseSelection onSelestyle={{ fontSize: "larger" }} />
      </Container>
      <StaticDateTimePicker
        orientation="landscape"
        className="customDateTimePicker"
        style={{
          width: "200px",
          gridAutoColumns: "unset",
          backgroundColor: "black",
        }}
        label={props.label}
        value={value}
        onChange={onDatePicked}
        renderInput={(params) => <TextField {...params} />}
      />
      {value && (
        <Container style={{ marginTop: '20px' }}>
          <p>Selected Date: {value.$d.toLocaleDateString()}</p>
          <p>Selected Time: {value.$d.toLocaleTimeString()}</p>
        </Container>
      )}
    </LocalizationProvider>
  );
}
