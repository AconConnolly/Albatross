import React from "react";
import CourseCard from "./CourseCard";
import Grid from "@mui/material/Grid";

const CourseList = () => {
  const courses = [
    {
      title: "Confederation Park",
      time: "8:00 am",
      players: "4",
      imageSrc: "src/components/confederation-hero.jpg",
      altText: "confedImg",
    },
    {
      title: "Maple Ridge",
      time: "8:00 am",
      players: "4",
      imageSrc: "src/components/maple-ridge-19.jpg",
      altText: "MapleImg",
    },
    {
      title: "Lakeview",
      time: "8:00 am",
      players: "4",
      imageSrc: "src/components/lakeview-golf-course-L-5.jpg",
      altText: "lakeviewImg",
    },
    {
      title: "Shaganappi Point",
      time: "8:00 am",
      players: "4",
      imageSrc: "src/components/shag.jpg",
      altText: "shagImg",
    },
  ];

  return (
    <Grid container spacing={2}>
      {courses.map((course, index) => (
        <CourseCard
          key={index}
          title={course.title}
          time={course.time}
          players={course.players}
          imageSrc={course.imageSrc}
          altText={course.altText}
        />
      ))}
    </Grid>
  );
};

export default CourseList;
