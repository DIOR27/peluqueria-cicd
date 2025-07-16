import { useFormikContext } from "formik";
import { Toggle } from "../../ui/Toggle";

export default function FormToggle({ field }) {
  const { setFieldValue } = useFormikContext();
  return (
    <Toggle
      name={field.name}
      onChange={(value) => setFieldValue(field.name, value)}
      checked={field.value}
    />
  );
}
