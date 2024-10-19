import { useState } from "react";
import React from "react";

import CreatableSelect from "react-select/creatable";

function InputText({
  labelTitle,
  labelStyle,
  type,
  containerStyle,
  defaultValue,
  placeholder,
  updateFormValue,
  updateType,
}) {
  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content " + labelStyle}>
          {labelTitle}
        </span>
      </label>
      <input
        type={type || "text"}
        value={defaultValue}
        placeholder={placeholder || ""}
        onChange={(e) => updateFormValue({ updateType, value: e.target.value })}
        className="input input-bordered w-full "
      />
    </div>
  );
}

export default InputText;

const components = {
  DropdownIndicator: null,
};

const createOption = (label) => ({
  label,
  value: label,
});

export const Selectable = ({ value, setValue }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue((prev) => [...prev, createOption(inputValue)]);
        setInputValue("");
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  return (
    <CreatableSelect
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={(newValue) => setValue(newValue)}
      onInputChange={(newValue) => setInputValue(newValue)}
      onKeyDown={handleKeyDown}
      placeholder="Type category item and press enter..."
      value={value}
      className="input border-none w-full mt-4"
    />
  );
};
