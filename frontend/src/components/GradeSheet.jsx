import { useContext, useEffect, useState } from "react";
import { AllStudents, SearchThings } from "../components";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const GradeSheet = () => {
  const { userOne } = useContext(AuthContext);
  const [students, setStudents] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/users/all-users", {
          headers: { "x-auth-token": token },
        });
        setStudents(response.data.filter((user) => user.status === "student"));
      } catch (error) {
        console.error(`Something went wrong ${error.message}`);
      }
    };
    fetchStudents();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchedResults = students.filter(
          (student) =>
            student.name.toLowerCase().includes(searchText.toLowerCase()) ||
            student.email.toLowerCase().includes(searchText.toLowerCase()) ||
            student.ID.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchedResults);
      }, 500)
    );
  };

  return (
    <div className="gradeSheet-container">
      <div className="gradeSheet-inner-container">
        {userOne.status === "admin" && (
          <>
            <SearchThings
              searchText={searchText}
              handleSearchChange={handleSearchChange}
            />
            {searchText ? (
              <>
                <AllStudents
                  students={searchedResults}
                  redirectTo="/gradesheet/admin"
                />
              </>
            ) : (
              <>
                <AllStudents
                  students={students}
                  redirectTo="/gradesheet/admin"
                />
              </>
            )}
          </>
        )}
        {userOne.status === "student" && (
          <>
            <h1>Student View</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default GradeSheet;
