import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { SearchThings, UserList } from "../components/";
import axios from "axios";
import "../styles/AllUsers.css";

const ExistingUsers = () => {
  const [teacher, setTeacher] = useState(null);
  const [student, setStudent] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      await axios
        .get("http://localhost:5000/api/users/all-users", {
          headers: { "x-auth-token": token },
        })
        .then((response) => {
          setTeacher(response.data.filter((user) => user.status === "teacher"));
          setStudent(response.data.filter((user) => user.status === "student"));
        })
        .catch((error) => alert(error));
    };
    fetchUsers();
  }, []);

  return (
    <>
      <div className="all-users-container">
        <SearchThings />
        <UserList users={teacher} title="Teachers" />
        <br />
        <UserList users={student} title="Students" />
      </div>
    </>
  );
};

export default ExistingUsers;
