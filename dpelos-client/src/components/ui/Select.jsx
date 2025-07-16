import ReactSelect from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "#000000" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 1px #000000" : "none",
    "&:hover": {
      borderColor: state.isFocused ? "#000000" : "#9ca3af",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#000000" : "white",
    color: state.isSelected ? "white" : "black",
    "&:hover": {
      backgroundColor: state.isSelected ? "#facc15" : "#facc15",
      color: state.isSelected ? "black" : "black",
    },
  }),
};

export default function Select({
  options,
  onChange,
  value,
  placeholder,
  isSearchable,
  isClearable,
  isMulti,
  label,
  helperText,
  onBlur,
  ...rest
}) {
  return (
    <div className="w-full">
      {label ? (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      ) : null}
      <ReactSelect
        {...rest}
        options={options}
        onChange={onChange}
        value={value} // {value: string, label: string}
        placeholder={placeholder}
        isSearchable={isSearchable}
        isMulti={isMulti}
        styles={customStyles}
        isClearable={isClearable}
        onBlur={onBlur}
      />
      {helperText ? (
        <p className="text-sm text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
}
