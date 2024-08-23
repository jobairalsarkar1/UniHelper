import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Contact from "./pages/Contact";
// import AdminCourses from "./pages/AdminCourses";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import SideNav from "./components/SideNav";
// import Profile from "./components/Profile";
// import CourseSequence from "./components/CourseSequence";
// import GradeSheet from "./components/GradeSheet";
// import Courses from "./components/Courses";
// import Consultations from "./components/Consultations";
// import NewUsers from "./components/NewUsers";
// import ExistingUsers from "./components/ExistingUsers";
// import UpdateUserInfo from "./components/UpdateUserInfo";
// import PrivateRoute from "./components/PrivateRoute";
import AuthProvider from "./contexts/AuthContext";
import {
  PrivateRoute,
  Navbar,
  SideNav,
  UpdateUserInfo,
  CourseSequence,
  GradeSheet,
  Consultations,
  Courses,
  NotFound,
} from "./components";
import {
  Home,
  Contact,
  Register,
  Login,
  Profile,
  AdminCourses,
  AdminDepartment,
  NewUsers,
  ExistingUsers,
  CourseDetails,
} from "./pages";
import "./styles/App.css";

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
            <SideNav sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="content-body-container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/profile"
                  element={<PrivateRoute component={<Profile />} />}
                />
                <Route
                  path="/new-users"
                  element={<PrivateRoute component={<NewUsers />} />}
                />
                <Route
                  path="/user/:userId"
                  element={<PrivateRoute component={<UpdateUserInfo />} />}
                />
                <Route
                  path="/existing-users"
                  element={<PrivateRoute component={<ExistingUsers />} />}
                />
                <Route
                  path="/admin-courses"
                  element={<PrivateRoute component={<AdminCourses />} />}
                />
                <Route
                  path="/admin-departments"
                  element={<PrivateRoute component={<AdminDepartment />} />}
                />
                <Route
                  path="/course-sequence"
                  element={<PrivateRoute component={<CourseSequence />} />}
                />
                <Route
                  path="/gradesheet"
                  element={<PrivateRoute component={<GradeSheet />} />}
                />
                <Route
                  path="/courses-details"
                  element={<PrivateRoute component={<CourseDetails />} />}
                />
                <Route
                  path="/classroom"
                  element={<PrivateRoute component={<Courses />} />}
                />
                <Route
                  path="/consultations"
                  element={<PrivateRoute component={<Consultations />} />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
