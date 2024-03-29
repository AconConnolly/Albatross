import React, { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import CourseSelection from "./CourseSelection";
import Container from "@mui/material/Container";

export default function StaticDateTimePickerLandscape(props) {
  const [value, setValue] = React.useState(null);
  const onDatePicked = (event) => {
    setValue(event);
    let onlyDate = event.$d.toISOString();
    props.onChange(onlyDate);
    console.log("Date Changed", event, onlyDate);
  };

  React.useEffect(() => {
    if (props.initialValue !== 0 && value === null) {
      setValue(props.initialValue);
      console.log("Initial Date is", props.initialValue);
    }
  }, [props.initialValue, value, setValue]);


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
        label={props.label}
        value={value}
        onChange={onDatePicked}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
