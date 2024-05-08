import * as React from "react";

import Main from "./Main";

import { BrowserRouter, Routes, Route } from "react-router-dom";


import SignIn from "./pages/SignIn";
import AppWrapper from "./AppWrapper";
import SignUp from "./pages/SignUp";
import AllCourses from "./pages/AllCourses";
import Confed from "./Components/Calgary Courses/Confed";
import McCall from "./Components/Calgary Courses/McCall";
import MapleRidge from "./Components/Calgary Courses/MapleRidge";
import ShagPoint from "./Components/Calgary Courses/ShagPoint"
import Bookings from "./Bookings";
import Lakeview from "./Components/Calgary Courses/Lakeview";

// TODO remove, this demo shouldn't need to reset the theme.

export default function Dashboard() {
  return (
    <>
      <AppWrapper>
        <Routes>
          <Route path="/home" element={<Main />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/confed" element={<Confed />} />
          <Route path="/mccall" element={<McCall />} />
          <Route path="/maple" element={<MapleRidge />} />
          <Route path="/shag" element={<ShagPoint />} />
          <Route path="/lake" element={<Lakeview />} />

        </Routes>
      </AppWrapper>
      
    </>
  );
}
