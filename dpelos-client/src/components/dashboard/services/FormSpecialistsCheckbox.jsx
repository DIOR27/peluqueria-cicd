import { Checkbox, Field as HeadlessField, Label } from "@headlessui/react";
import { CheckIcon } from "lucide-react";
import { useFormikContext } from "formik";

const FormSpecialistsCheckbox = ({ specialists }) => {
  const { values, setFieldValue } = useFormikContext();

  const handleSpecialistChange = (specialistId) => {
    const currentSpecialists = values.specialists || [];
    const newSpecialists = currentSpecialists.includes(specialistId)
      ? currentSpecialists.filter((id) => id !== specialistId)
      : [...currentSpecialists, specialistId];

    setFieldValue("specialists", newSpecialists);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {specialists.map((specialist) => (
        <HeadlessField key={specialist.id} className="flex items-center gap-2">
          <Checkbox
            checked={values.specialists?.includes(specialist.id)}
            onChange={() => handleSpecialistChange(specialist.id)}
            className="group block size-4 rounded border bg-white data-[checked]:bg-black"
          >
            <CheckIcon className="size-3.5 text-white" />
          </Checkbox>
          <Label className="text-sm text-gray-700">{specialist.name}</Label>
        </HeadlessField>
      ))}
    </div>
  );
};

export default FormSpecialistsCheckbox;
