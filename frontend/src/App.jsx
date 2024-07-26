import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import SideNav from "./components/SideNav";
import Profile from "./components/Profile";
import CourseSequence from "./components/CourseSequence";
import GradeSheet from "./components/GradeSheet";
import Courses from "./components/Courses";
import { useState } from "react";
import "./styles/App.css";

// import React from "react";
const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="main-body-container">
          <SideNav sidebarOpen={sidebarOpen} />
          <div className="content-body-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/course-sequence" element={<CourseSequence />} />
              <Route path="/gradesheet" element={<GradeSheet />} />
              <Route path="/courses" element={<Courses />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
