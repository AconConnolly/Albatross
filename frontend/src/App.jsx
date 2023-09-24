import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Skeleton from "@mui/material/Skeleton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Main from "./Main";
import { Stack } from "@mui/material";
import { AccessTime, Tour } from "@mui/icons-material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Course from "./pages/Course";



const drawerWidth = 240;

//
// const theme = createTheme({
//   components: {
//     MuiTypography: {
//       variants: [
//         {
//           props: {
//             variant: "body2",
//           },
//           style: {
//             fontSize: 11,
//           },
//         },
//         {
//           props: {
//             variant: "body3",
//           },
//           style: {
//             fontSize: 9,
//           },
//         },
//       ],
//     },
//   },
// });

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
<BrowserRouter>
<Routes>
  <Route path="/" element= {
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Albatross
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <Stack spacing={1}>
            <Skeleton
              variant="rectangular"
              animation={false}
              sx={{ padding: "8px" }}
              width={210}
              height={30}
            />
            <Skeleton
              variant="rectangular"
              animation={false}
              sx={{ padding: "8px" }}
              width={210}
              height={30}
            />
            <Skeleton
              variant="rectangular"
              animation={false}
              sx={{ padding: "8px" }}
              width={210}
              height={30}
            />
            <Skeleton
              variant="rectangular"
              animation={false}
              sx={{ padding: "8px" }}
              width={210}
              height={30}
            />
            <Divider sx={{ my: 1 }} />
            <Skeleton
              variant="rectangular"
              animation={false}
              width={210}
              height={30}
            />
            <Skeleton
              variant="rectangular"
              animation={false}
              width={210}
              height={30}
            />
            <Skeleton
              variant="rectangular"
              animation={false}
              width={210}
              height={30}
            />
            <Skeleton
              variant="rectangular"
              animation={false}
              width={210}
              height={30}
            />
          </Stack>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Main />
        </Box>
      </Box>
    </ThemeProvider>
  }
  />
  <Route path="/:id" element={<Course/>}/>
    </Routes>
    </BrowserRouter>
  );
}
