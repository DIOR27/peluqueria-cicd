import { Field } from "formik";
import FormInput from "../../ui/FormInput";
import { Checkbox, Field as HeadlessField, Label } from "@headlessui/react";
import { CheckIcon } from "lucide-react";

const WorkingHoursField = ({ day, values, setFieldValue }) => {
  const hours = values[day];

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 mb-4">
        <Field name={`${day}.activo`}>
          {({ field }) => (
            <HeadlessField className="flex items-center gap-2">
              <Checkbox
                checked={field.value}
                onChange={(value) => {
                  setFieldValue(`${day}.activo`, value);
                }}
                className="group block size-4 rounded border bg-white data-[checked]:bg-black"
              >
                <CheckIcon className="size-3.5 text-white" />
              </Checkbox>
              <Label className="text-sm text-gray-700 capitalize w-24">
                {day}
              </Label>
            </HeadlessField>
          )}
        </Field>
      </div>
      <div className="flex items-center gap-2">
        <FormInput
          type="time"
          name={`${day}.hora_inicio`}
          disabled={!hours.activo}
          className="disabled:opacity-50 w-34"
        />
        <span className="text-gray-500">a</span>
        <FormInput
          type="time"
          name={`${day}.hora_fin`}
          disabled={!hours.activo}
          className="disabled:opacity-50 w-34"
        />
      </div>
    </div>
  );
};

export default WorkingHoursField;
