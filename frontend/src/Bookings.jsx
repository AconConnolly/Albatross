import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Main(props) {
  const handleSelectionChange = (selectedValue) => {
    console.log("Selected value:", selectedValue);
  };

  const bookedCards = [
    {
      id: 1,
      title: "Confederation Park",
      time: "Your booked time",
      imageSrc: "src/components/Images/confederation-hero.jpg",
    },
    {
      id: 2,
      title: "Lakeview",
      time: "Your booked time",
      imageSrc: "src/components/Images/lakeview-golf-course-L-5.jpg",
    },
    {
      id: 3,
      title: "Maple Ridge",
      time: "Your booked time",
      imageSrc: "src/components/Images/MR.jpg",
    },
    {
      id: 4,
      title: "McCall Lake",
      time: "Your booked time",
      imageSrc: "src/components/Images/MLake.jpg",
    },
    {
      id: 5,
      title: "McCall Par 3",
      time: "Your booked time",
      imageSrc: "src/components/Images/Par3.jpg",
    },
    {
      id: 6,
      title: "Shaganappi Point",
      time: "Your booked time",
      imageSrc: "src/components/Images/shagAll.jpg",
    },
    {
      id: 7,
      title: "Shaganappi valley Nine",
      time: "Your booked time",
      imageSrc: "src/components/Images/shag.jpg",
    },
  ];

  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container style={{ marginTop: "30px" }}>
        <h1>Your Bookings</h1>
        <h2>Confirmed Bookings</h2>
        <h2>Pending bookings</h2>
      </Container>

      <Container sx={{ py: 8 }} maxWidth="lg">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {bookedCards.map((card) => (
            <Grid item key={card.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: "56.25%",
                  }}
                  image={card.imageSrc}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {card.title}
                  </Typography>
                  <Typography>{card.time}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
    </ThemeProvider>
  );
}
