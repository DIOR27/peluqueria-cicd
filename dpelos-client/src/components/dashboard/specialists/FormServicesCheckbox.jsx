import { Checkbox, Field as HeadlessField, Label } from "@headlessui/react";
import { CheckIcon } from "lucide-react";
import { useFormikContext } from "formik";

const FormServicesCheckbox = ({ services }) => {
  const { values, setFieldValue } = useFormikContext();

  const handleServiceChange = (serviceId) => {
    const currentServices = values.services || [];
    const newServices = currentServices.includes(serviceId)
      ? currentServices.filter((id) => id !== serviceId)
      : [...currentServices, serviceId];

    setFieldValue("services", newServices);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      {services.map((service) => (
        <HeadlessField key={service.id} className="flex items-center gap-2">
          <Checkbox
            checked={values.services?.includes(service.id)}
            onChange={() => handleServiceChange(service.id)}
            className="group block size-4 rounded border bg-white data-[checked]:bg-black"
          >
            <CheckIcon className="size-3.5 text-white" />
          </Checkbox>
          <Label className="text-sm text-gray-700">{service.nombre}</Label>
        </HeadlessField>
      ))}
    </div>
  );
};

export default FormServicesCheckbox;
