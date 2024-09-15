// import React from "react";
import Select from "react-select";
import "../styles/Components.css";

const MultiSelect = ({ options, onChange, placeholder }) => {
  return (
    <div className="multi-select-container">
      <Select
        isMulti
        options={options}
        onChange={onChange}
        placeholder={placeholder ? placeholder : "Select.."}
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
