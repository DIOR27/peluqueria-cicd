import { useEffect } from "react";
import { useFormikContext } from "formik";
import useAppointmentStore from "../../../stores/appointmentStore";

export default function FormChangeMonitor({ fieldsToWatch, onConditionMet }) {
  const { values, initialValues, setFieldValue } = useFormikContext();
  const { resetTimeSlots } = useAppointmentStore();

  useEffect(() => {
    // Verifica si todos los campos que necesitas observar tienen valores
    const allFieldsHaveValues = fieldsToWatch.every(
      (field) =>
        values[field] !== null &&
        values[field] !== undefined &&
        values[field] !== ""
    );

    // Verifica si alguno de los valores ha cambiado desde initialValues
    const hasChanged = fieldsToWatch.some(
      (field) => values[field] !== initialValues[field]
    );

    if (allFieldsHaveValues) {
      onConditionMet(values);
    }

    if (hasChanged) {
      resetTimeSlots();
      setFieldValue("time", null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...fieldsToWatch.map((field) => values[field])]);

  return null;
}
