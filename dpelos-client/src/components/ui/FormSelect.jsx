import { useField, useFormikContext } from "formik";
import { memo } from "react";
import Select from "./Select";

const FormSelect = memo((props) => {
  const [field, meta, helpers] = useField(props);
  const { setFieldValue } = useFormikContext();

  // Asegurarnos de que el valor tenga el formato correcto para react-select
  const value = field.value
    ? props.options.find((option) => option.value === field.value)
    : null;

  return (
    <div>
      <Select
        {...field}
        {...props}
        value={value}
        onChange={(selectedOption) => {
          const newValue = selectedOption ? selectedOption.value : null;
          setFieldValue(props.name, newValue);
          // helpers.setTouched(true);
          if (typeof props.onValueChange === 'function') {
            props.onValueChange(selectedOption);
          }
        }}
        onBlur={() => {
          helpers.setTouched(true);
        }}
      />
      {meta.touched && meta.error ? (
        <div className="error text-red-500 text-xs">{meta.error}</div>
      ) : null}
    </div>
  );
});

FormSelect.displayName = "FormSelect";

export default FormSelect;
