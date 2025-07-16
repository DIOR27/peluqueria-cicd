import { Button } from "../../ui/Button";
import { Sheet } from "../../ui/Sheet";
import { Formik, Form } from "formik";
import FormInput from "../../ui/FormInput";
import FormSelect from "../../ui/FormSelect";
import * as Yup from "yup";
import FormChangeMonitor from "./FormChangeMonitor";
import useServiceStore from "../../../stores/serviceStore";
import useSpecialistStore from "../../../stores/specialistStore";
import { useEffect } from "react";
import useAppointmentStore from "../../../stores/appointmentStore";
import { getSpecialistsOptions } from "../../../lib/utils";

export default function AppointmentForm({
  isOpen,
  onClose,
  appointment = null,
}) {
  const { services, getServices } = useServiceStore();
  const { specialists, getSpecialists } = useSpecialistStore();
  const { availableTimeSlots, createAppointment, getAvailableTimes } =
    useAppointmentStore();
  const initialValues = {
    clientName: "",
    clientEmail: "",
    service: "",
    specialist: "",
    date: "",
    time: "",
  };
  const validationSchema = Yup.object({
    clientName: Yup.string().required("El nombre del cliente es requerido"),
    clientEmail: Yup.string()
      .email("Formato de email inválido")
      .required("El email es requerido"),
    service: Yup.string().required("El servicio es requerido"),
    specialist: Yup.string().required("El especialista es requerido"),
    date: Yup.string().required("La fecha es requerida"),
    time: Yup.string().required("La hora es requerida"),
  });

  useEffect(() => {
    getSpecialists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const servicesOptions = services
    ?.filter((service) => service.activo)
    .map((service) => ({
      value: service.id,
      label: `${service.nombre} (${service.duracion_estimada} mins)`,
    }));
  const timeSlotsOptions = availableTimeSlots?.map((timeSlot) => ({
    value: timeSlot,
    label: timeSlot,
  }));

  const onSubmit = async (values, { setSubmitting }) => {
    const result = await createAppointment(values);
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

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      title={appointment ? "Editar Cita" : "Nueva Cita"}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}

      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <FormChangeMonitor
              fieldsToWatch={["service", "specialist", "date"]}
              onConditionMet={fetchAvailableSlots}
            />
            <FormInput
              label="Nombre del Cliente"
              name="clientName"
              placeholder="Ingresa el nombre del cliente"
            />
            <FormInput
              label="Email del Cliente"
              name="clientEmail"
              placeholder="example@gmail.com"
            />
            <div className="flex flex-col gap-4 mb-4">
              <FormSelect
                label="Servicio"
                name="service"
                options={servicesOptions}
                placeholder="Selecciona un servicio"
                isClearable
                onValueChange={() => {
                  setFieldValue("specialist", null);
                }}
              />

              <FormSelect
                label="Especialista"
                name="specialist"
                options={getSpecialistsOptions(values.service, specialists)}
                placeholder="Selecciona un especialista"
                isClearable
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <FormInput label="Fecha" name="date" type="date" />
              {/* <FormInput label="Hora" name="time" type="time" /> */}
              <FormSelect
                label="Hora"
                name="time"
                options={timeSlotsOptions}
                placeholder="Hora"
                isClearable
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando" : "Crear"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Sheet>
  );
}
