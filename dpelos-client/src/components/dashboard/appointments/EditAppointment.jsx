import { Button } from "../../ui/Button";
import { Form, Formik } from "formik";
import FormInput from "../../ui/FormInput";
import * as Yup from "yup";
import FormSelect from "../../ui/FormSelect";
import { useEffect } from "react";
import useServiceStore from "../../../stores/serviceStore";
import useSpecialistStore from "../../../stores/specialistStore";
import useAppointmentStore from "../../../stores/appointmentStore";
import FormChangeMonitor from "./FormChangeMonitor";
import { getSpecialistsOptions } from "../../../lib/utils";

const validationSchema = Yup.object({
  service: Yup.string().required("El servicio es requerido"),
  specialist: Yup.string().required("El especialista es requerido"),
  date: Yup.string().required("La fecha es requerida"),
  time: Yup.string().required("La hora es requerida"),
  status: Yup.string().required("El estado es requerido"),
});

export default function EditAppointment({ onClose, appointment = null }) {
  const {
    getAppointmentDetails,
    appointmentDetails,
    availableTimeSlots,
    getAvailableTimes,
    updateAppointment,
    statusOptions
  } = useAppointmentStore();
  const { services } = useServiceStore();
  const { specialists } = useSpecialistStore();

  const initialValues = {
    service: appointmentDetails?.servicio_id || "",
    specialist: appointmentDetails?.especialista_id || "",
    status: appointmentDetails?.estado || "",
    date: appointmentDetails?.fecha || "",
    time: appointmentDetails?.hora || "",
  };

  useEffect(() => {
    const getDetails = async () => {
      if (appointment.id) {
        const { id, fecha, servicio_id, especialista_id } = appointment;
        await getAppointmentDetails(id);
        await getAvailableTimes({ fecha, especialista_id, servicio_id });
      }
    };

    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointment]);

  const onSubmit = async (values, { setSubmitting }) => {
    const dataToSubmit = {
      id: appointment.id,
      codigo_reserva: appointment.codigo_reserva,
      ...values,
    };

    const result = await updateAppointment(dataToSubmit);

    if (result) {
      onClose();
    }
    setSubmitting(false);
  };

  const fetchAvailableSlots = async (values) => {
    const {
      date: fecha,
      specialist: especialista_id,
      service: servicio_id,
    } = values;

    await getAvailableTimes({ fecha, especialista_id, servicio_id });
  };

  const servicesOptions = services
    ?.filter((service) => service.activo)
    .map((service) => ({
      value: service.id,
      label: `${service.nombre} (${service.duracion_estimada} mins)`,
    }));
  const timeSlotsOptions = [
    ...(availableTimeSlots || []).map((timeSlot) => ({
      value: timeSlot,
      label: timeSlot,
    })),
    // Add current appointment time if it exists and isn't in available slots
    ...(appointmentDetails?.hora &&
      !availableTimeSlots?.includes(appointmentDetails.hora)
      ? [
        {
          value: appointmentDetails.hora,
          label: appointmentDetails.hora,
        },
      ]
      : []),
  ];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form>
          <FormChangeMonitor
            fieldsToWatch={["service", "specialist", "date"]}
            onConditionMet={fetchAvailableSlots}
          />
          <div className="flex flex-col gap-4 mb-4">
            <FormSelect
              label="Servicio"
              name="service"
              options={servicesOptions}
              placeholder="Selecciona un servicio"
              onValueChange={() => {
                setFieldValue("specialist", null);
              }}
              isClearable
            />

            <FormSelect
              label="Especialista"
              name="specialist"
              options={getSpecialistsOptions(values.service, specialists)}
              placeholder="Selecciona un especialista"
              isClearable
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Fecha" name="date" type="date" />
            {/* <FormInput label="Hora" name="time" type="time" /> */}
            <FormSelect
              label="Hora"
              name="time"
              options={timeSlotsOptions}
              placeholder="Hora"
              isClearable
              hideSelectedOptions
            />
          </div>

          <FormSelect
            label="Estado"
            name="status"
            options={statusOptions}
            placeholder="Selecciona un estado"
            value={statusOptions.find(
              (status) => status.value === appointment?.status
            )}
            isClearable
          />

          <div className="flex justify-end gap-2 mt-8">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando" : "Actualizar"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

