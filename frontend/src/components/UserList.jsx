import { Link } from "react-router-dom";
import "../styles/AllUsers.css";

const UserList = ({ users, title }) => {
  return (
    <div className="user-list-div">
      <h2 className="user-title">{title}</h2>
      <hr style={{ marginBottom: "0.3rem" }} />
      {users?.length > 0 ? (
        <>
          <ul className="user-info-list">
            <li className="list-header user-info-items user-info-item-id">
              ID
            </li>
            <li className="list-header user-info-items">Name</li>
            <li className="list-header user-info-items">Email</li>
            <li className="list-header user-info-items">ST</li>
            <li className="list-header user-info-items">Action</li>
          </ul>
          {users.map((user) => (
            <ul key={user._id} className="user-info-list-inner">
              <li className="user-info-items user-info-item-id">{user.ID}</li>
              <li className="user-info-items">{user.name}</li>
              <li className="user-info-items">
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </li>
              <li className="user-info-items">
                {user.status ? user.status[0].toUpperCase() : "N/A"}
              </li>
              <li className="user-info-items">
                <Link to={`/user/${user._id}`} className="edit-btn">
                  Edit
                </Link>
              </li>
            </ul>
          ))}
        </>
      ) : (
        <>
          <h2 className="no-users-data">No Users Found.</h2>
        </>
      )}
    </div>
  );
};

export default UserList;
