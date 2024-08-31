import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/AllUsers.css";
import UserList from "../components/UserList";

const ExistingUsers = () => {
  const [teacher, setTeacher] = useState(null);
  const [student, setStudent] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("/api/users/all-users", { headers: { "x-auth-token": token } })
      .then((response) => {
        setTeacher(response.data.filter((user) => user.status === "teacher"));
        setStudent(response.data.filter((user) => user.status === "student"));
      })
      .catch((error) => alert(error));
  }, []);

  return (
    <>
      <div className="all-users-container">
        <UserList users={teacher} title="Teachers" />
        <br />
        <UserList users={student} title="Students" />
      </div>
    </>
  );
};

export default ExistingUsers;
