import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { SearchThings, UserList } from "../components";
import "../styles/AllUsers.css";

const NewUsers = () => {
  const [newUsers, setNewUsers] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchedResults = newUsers.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.email.toLowerCase().includes(searchText.toLowerCase()) ||
            item.ID.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchedResults);
      }, 500)
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/users/all-users", {
        headers: { "x-auth-token": token },
      })
      .then((response) => {
        setNewUsers(response.data.filter((user) => user.status === null));
      })
      .catch((error) => alert(error));

    // const fetchUsers = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:5000/api/users/all-users");
    //     setNewUsers(response.data.filter((user) => user.status === null));
    //     console.log(response);
    //     console.log("Success");
    //   } catch (error) {
    //     console.log("Error");
    //   }
    // };
    // fetchUsers();
  }, []);
  return (
    <>
      <div className="all-users-container">
        <SearchThings
          searchText={searchText}
          handleSearchChange={handleSearchChange}
        />
        {/* <div className="search-input-field">
          <label htmlFor="searchField">Search</label>
          <input
            type="text"
            id="searchField"
            name="searchField"
            className="searchField"
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Search"
          />
        </div> */}
        {searchText ? (
          <UserList users={searchedResults} title="Searched Results" />
        ) : (
          <UserList users={newUsers} title="All New Users" />
        )}
      </div>
    </>
  );
};

export default NewUsers;
