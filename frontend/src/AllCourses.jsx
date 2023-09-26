import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const customCourses = [
    {
        id: 1,
        title: "Confederation Park",
        description: "Butts",
        imageSrc: "src/components/Images/confederation-hero.jpg",
        link: "http://localhost:5173/confed"
    },
    {
        id: 2,
        title: "Lakeview",
        description: "Butts",
        imageSrc: "src/components/Images/lakeview-golf-course-L-5.jpg",
    },
    {
        id: 3,
        title: "Maple Ridge",
        description: "Butts",
        imageSrc: "src/components/Images/MR.jpg",
    },
    {
        id: 4,
        title: "McCall Lake",
        description: "Butts",
        imageSrc: "src/components/Images/MLake.jpg",
    },
    {
        id: 5,
        title: "McCall Par 3",
        description: "Butts",
        imageSrc: "src/components/Images/Par3.jpg",
    },
    {
        id: 6,
        title: "Shaganappi Point",
        description: "Butts",
        imageSrc: "src/components/Images/shagAll.jpg",
    },
    {
        id: 7,
        title: "Shaganappi valley Nine",
        description: "Butts",
        imageSrc: "src/components/Images/shag.jpg",
    },
    
    
]

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Album() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="md">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Calgary Public Courses 
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Discover the beauty of Calgary's public golf courses, where lush
              fairways meet stunning mountain vistas. Whether you're a seasoned
              golfer or new to the game, our courses offer something for
              everyone. From the tree-lined fairways of Confederation Park Golf
              Course to the challenging layout at Lakeview Golf Course, you'll
              find the perfect tee time to suit your skill level. Explore
              Calgary's diverse golfing opportunities and enjoy a day on the
              green.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" href="http://localhost:5173/bookings">Book Now</Button>
              
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {customCourses.map((card) => (
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
                    <Typography>
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href={card.link}>View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
