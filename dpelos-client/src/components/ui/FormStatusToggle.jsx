import { useFormikContext } from "formik";
import { Toggle } from "./Toggle";

const FormStatusToggle = () => {
  const { values, setFieldValue } = useFormikContext();

  return (
    <Toggle
      checked={values.isActive}
      onChange={(value) => setFieldValue("isActive", value)}
      label="Estado"
    />
  );
};

export default FormStatusToggle;
