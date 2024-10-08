import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { MultiSelect } from "../components";
import axios from "axios";
import "../styles/Components.css";

const ClassroomMembers = ({
  classroomId,
  classroomMembers,
  setClassroomMembers,
}) => {
  const { userOne } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchTeachersSections = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/advising-panels/me-teacher-sections/${userOne._id}`,
          { headers: { "x-auth-token": token } }
        );
        if (response.status === 200) {
          const allStudents = response.data.reduce((acc, section) => {
            return [...acc, ...section.students];
          }, []);

          const uniqueStudents = Array.from(
            new Set(allStudents.map((student) => student._id))
          ).map((id) => {
            return allStudents.find((student) => student._id === id);
          });

          setStudents(uniqueStudents);
        }
      } catch (error) {
        console.error(error.response?.data?.message);
      }
    };
    fetchTeachersSections();
  }, [userOne._id]);

  const handleSelectChange = (selectedOptions) => {
    setSelectedStudents(selectedOptions || []);
  };

  const addMemberToClassroom = async () => {
    if (selectedStudents.length === 0) {
      return alert("To add you need to select!!!");
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/classrooms/add-members/${classroomId}`,
        { members: selectedStudents.map((student) => student._id) },
        { headers: { "x-auth-token": token } }
      );
      if (response === 200) {
        setClassroomMembers((prevMembers) => [
          ...prevMembers,
          response.data.users,
        ]);
        setSelectedStudents([]);
        setSuccess("Added successfully.");
      }
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };

  return (
    <div className="classroomMembers-container">
      <div className="classroomMembers-inner-container">
        {userOne.status === "teacher" && (
          <div className="classroomMembers-add-members-form">
            <MultiSelect
              options={students}
              onChange={handleSelectChange}
              placeholder={"Select Students.."}
            />
            <button
              type="button"
              className="classroomMembers-add-members-btn"
              onClick={addMemberToClassroom}
            >
              Add Member
            </button>
            {success && (
              <p style={{ fontSize: "0.8rem", textAlign: "center" }}>
                {success}
              </p>
            )}
          </div>
        )}

        <div className="classroomMembers-members-container">
          <span className="members-list-title">Members</span>
          <hr />
          <div className="classroomMembers-members-list">
            {classroomMembers?.map((member) => (
              <div key={member._id} className="classroomMembers-member">
                <div className="classroomMembers-member-info">
                  {member.profileImage ? (
                    <>
                      <img
                        src={member.profileImage}
                        alt="Profile Image"
                        className="classroomMember-profile-image"
                      />
                    </>
                  ) : (
                    <>
                      <p className="classroomMember-profile-image-alt">
                        {member.name[0]}
                      </p>
                    </>
                  )}
                  <span className="member-name">{member.name}</span>
                </div>
                {userOne.status === "teacher" && (
                  <button
                    type="button"
                    className="classroomMembers-remove-member-btn"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassroomMembers;
