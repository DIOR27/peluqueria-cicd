import { cn } from "../../lib/utils";

export default function Input({
  label,
  value,
  onChange,
  name,
  type = "text",
  required = false,
  className,
  placeholder,
  helperText,
  ...props
}) {
  return (
    <div className="w-full">
      {label ? (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      ) : null}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black",
          className
        )}
        {...props}
      />
      {helperText ? (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
}
