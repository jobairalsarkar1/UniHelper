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
  // AllStudents,
  Scholarship,
  MedicalHelp,
  ForgetPassword,
  ResetPassword,
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
  ClassroomIndividual,
  EditSection,
  Finance,
  GradeSheetIndividual,
  AdminAdvising,
  // Facilities,
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
                <Route path="/" element={<Login />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route
                  path="/reset-password/:token"
                  element={<ResetPassword />}
                />
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
                  path="/edit-section/:sectionId"
                  element={
                    <PrivateRoute>
                      <EditSection />
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
                  path="/admin-advising"
                  element={
                    <PrivateRoute>
                      <AdminAdvising />
                    </PrivateRoute>
                  }
                />
                {/* <Route
                  path="/payslip"
                  element={
                    <PrivateRoute>
                      <AllStudents />
                    </PrivateRoute>
                  }
                /> */}
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
                  path="/gradesheet/admin/:studentId"
                  element={
                    <PrivateRoute>
                      <GradeSheetIndividual />
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
                <Route path="/seat-status" element={<SeatStatus />} />
                <Route path="/courses-details" element={<CourseDetails />} />
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
                  path="/classroom/:classroomId"
                  element={
                    <PrivateRoute>
                      <ClassroomIndividual />
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
                <Route
                  path="/finance"
                  element={
                    <PrivateRoute>
                      <Finance />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/scholarship"
                  element={
                    <PrivateRoute>
                      <Scholarship />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/medical-help"
                  element={
                    <PrivateRoute>
                      <MedicalHelp />
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
