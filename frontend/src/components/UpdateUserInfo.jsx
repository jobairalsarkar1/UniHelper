import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/AllUsers.css";

const UpdateUserInfo = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ID: "",
    status: "",
    departmentId: "",
    profileImage: "",
  });
  // const [statusOptions, setStatusOptions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/users/user/${userId}`);
        setFormData(response.data);
      } catch (error) {
        alert(`Error fetching User ${error}`);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get("/api/departments/get-departments");
        setDepartments(response.data);
      } catch (error) {
        alert(`Error fetching departments ${error}`);
      }
    };
    fetchUserData();
    fetchDepartments();
  }, [userId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];
      if (allowedTypes.includes(fileType)) {
        setImage(file);
        setImageError("");
      } else {
        setImage(null);
        setImageError("Only JPEG, JPG, PNG types are allowed.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("ID", formData.ID);
    data.append("status", formData.status);
    data.append("departmentId", formData.departmentId);
    if (image) {
      data.append("profileImage", image);
    }
    console.log("Processing.....");
    try {
      await axios.put(`/api/users/update/${userId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/new-users");
      // alert("Operation Successfull.");
    } catch (error) {
      console.error("Error updating user info", error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="update-user-container">
      <div className="update-user-inner-container">
        <h1 className="update-userinfo-title">Update User Info</h1>
        {/* <h1>{userId}</h1> */}
        <hr />
        <form className="update-userinfo-form" onSubmit={handleSubmit}>
          <div className="form-items update-form-name">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
          </div>
          <div className="form-items update-form-email">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="form-items update-form-id">
            <label htmlFor="ID">ID:</label>
            <input
              type="text"
              id="ID"
              name="ID"
              value={formData.ID}
              onChange={handleChange}
              placeholder="ID"
            />
          </div>
          <div className="form-items update-form-status">
            <label htmlFor="status">Status:</label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              <option value="admin">Admin</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <div className="form-items update-form-department">
            <label htmlFor="departmentId">Department:</label>
            <select
              name="departmentId"
              id="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-items update-form-profile-image">
            <label htmlFor="profileImage">Profile Image:</label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              onChange={handleImageChange}
            />
            {imageError && (
              <p
                className="error-message"
                style={{
                  color: "red",
                  fontSize: "0.8rem",
                  textAlign: "center",
                }}
              >
                {imageError}
              </p>
            )}
          </div>
          <button type="submit" className="userinfo-update-btn">
            {updating ? "Updating" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserInfo;
