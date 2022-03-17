import React from "react";

const CustomSelector = (props) => {
  const { name, options, defaultValue, onChange, className, ...rest } = props;

  return (
    <div>
      <select
        id={name}
        name={name}
        className={className}
        defaultValue={defaultValue}
        onChange={onChange}
        {...rest}
      >
        {
          options.map(option => {
            return (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            );
          })
        }
      </select>
    </div>
  )
}

export default CustomSelector;
