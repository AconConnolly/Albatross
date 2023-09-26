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
import SignIn from "./SignIn";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { mainNavbarItems } from "./Components/Navbar/NavbarList";
import { NavbarStyles } from "./Components/Navbar/NavbarStyles";
import { useParams, useNavigate } from "react-router-dom";
import AppWrapper from "./AppWrapper";
import SignUp from "./SignUp";
import AllCourses from "./AllCourses";
import Confed from "./Components/Calgary Courses/Confed"

// TODO remove, this demo shouldn't need to reset the theme.

export default function Dashboard() {
  return (
    <>
      <AppWrapper>
        <Routes>
          <Route path="/home" element={<Main />} />
          <Route path="/bookings" element={<Main />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/confed" element={<Confed />} />

        </Routes>
      </AppWrapper>
      
    </>
  );
}
