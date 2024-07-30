import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
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
import Consultations from "./components/Consultations";
import PrivateRoute from "./components/PrivateRoute";
import AuthProvider from "./contexts/AuthContext";
import "./styles/App.css";
// import React from "react";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <AuthProvider>
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
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/course-sequence"
                  element={
                    <PrivateRoute>
                      <CourseSequence />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/gradesheet"
                  element={
                    <PrivateRoute>
                      <GradeSheet />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/courses"
                  element={
                    <PrivateRoute>
                      <Courses />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/consultations"
                  element={
                    <PrivateRoute>
                      <Consultations />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
