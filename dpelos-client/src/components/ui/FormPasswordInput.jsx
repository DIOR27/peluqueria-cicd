import { useField } from "formik";
import PasswordInput from "./PasswordInput";

export default function FormPasswordInput({ name, ...props }) {
  const [field, meta] = useField(name);
  return (
    <div className="mb-4">
      <PasswordInput {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-xs">{meta.error}</div>
      ) : null}
    </div>
  );
}
