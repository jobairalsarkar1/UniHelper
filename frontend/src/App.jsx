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
  NotFound,
  AdvisedCourses,
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
  AdvisingPannel,
  Classroom,
  EditCourse,
  SeatStatus,
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
          <Navbar
            toggleSidebar={toggleSidebar}
            setSidebarOpen={setSidebarOpen}
          />
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
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/new-users"
                  element={
                    <PrivateRoute>
                      <NewUsers />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/user/:userId"
                  element={
                    <PrivateRoute>
                      <UpdateUserInfo />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/existing-users"
                  element={
                    <PrivateRoute>
                      <ExistingUsers />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin-courses"
                  element={
                    <PrivateRoute>
                      <AdminCourses />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/edit-course/:courseId"
                  element={
                    <PrivateRoute>
                      <EditCourse />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin-departments"
                  element={
                    <PrivateRoute>
                      <AdminDepartment />
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
                  path="/advising-pannel"
                  element={
                    <PrivateRoute>
                      <AdvisingPannel />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/seat-status"
                  element={
                    <PrivateRoute>
                      <SeatStatus />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/courses-details"
                  element={
                    <PrivateRoute>
                      <CourseDetails />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/advised-courses"
                  element={
                    <PrivateRoute>
                      <AdvisedCourses />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/classroom"
                  element={
                    <PrivateRoute>
                      <Classroom />
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
