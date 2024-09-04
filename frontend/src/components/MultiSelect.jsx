// MultiSelect.js
// import React from "react";
import Select from "react-select";
import "../styles/Components.css";
// import "./MultiSelect.css"; // Import the external CSS file

const MultiSelect = ({ options, onChange }) => {
  return (
    <div className="multi-select-container">
      <Select
        isMulti
        options={options} // Accept options as a prop
        onChange={onChange} // Pass the onChange handler
        placeholder="Select users..."
        className="basic-multi-select"
        classNamePrefix="select"
        theme={(theme) => ({
          ...theme,
          borderRadius: 5,
          colors: {
            ...theme.colors,
            primary25: "#f0f0f0",
            primary: "#007bff",
          },
        })}
        getOptionLabel={(option) => (
          <div className="option-label">
            {option.ID} {option.name} ({option.status[0].toUpperCase()})
          </div>
        )}
        getOptionValue={(option) => option._id}
      />
    </div>
  );
};

export default MultiSelect;
