import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";
import "./AppointmentForm.css";
import dpelosn from "../../assets/dpelosn.svg";
import useAppointmentStore from "../../stores/appointmentStore";

const initialValues = {
  servicio: '',
  especialista: '',
  fecha: "",
  hora: "",
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
};

const validationSchema = Yup.object({
  servicio: Yup.string().required("El servicio es requerido"),
  especialista: Yup.string().required("El especialista es requerido"),
  fecha: Yup.string().required("La fecha es requerida"),
  hora: Yup.string().required("La hora es requerida"),
  nombre: Yup.string().required("El nombre es requerido"),
  apellido: Yup.string().required("El apellido es requerido"),
  email: Yup.string().email("Correo inválido").required("El correo es requerido"),
  telefono: Yup.string().required("El teléfono es requerido"),
});

const AppointmentForm = () => {
  const { availableTimeSlots, getAvailableTimes } = useAppointmentStore();

  const [servicesOptions, setServicesOptions] = React.useState([]);
  const [specialistsOptions, setSpecialistsOptions] = React.useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/servicios/`)
      .then((res) => res.json())
      .then((data) => {
        const options = data.map((service) => ({
          value: service.id.toString(),
          label: service.nombre,
        }));
        setServicesOptions(options);
      })
      .catch((error) => console.error("Error cargando servicios:", error));

    fetch(`${import.meta.env.VITE_API_BASE_URL}/especialistas/`)
      .then((res) => res.json())
      .then((data) => {
        const options = data.map((specialist) => ({
          value: specialist.id.toString(),
          label: `${specialist.nombre} ${specialist.apellido}`,
        }));
        setSpecialistsOptions(options);
      })
      .catch((error) => console.error("Error cargando especialistas:", error));
  }, []);

  const fetchAvailableSlots = async (values) => {
    const {
      fecha,
      especialista: especialista_id,
      servicio: servicio_id,
    } = values;

    if (fecha && especialista_id && servicio_id) {
      await getAvailableTimes({ fecha, especialista_id, servicio_id });
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const fechaObj = new Date(values.fecha);
      const fechaFormateada = fechaObj.toISOString().split("T")[0];

      const horaFormateada =
        values.hora.length === 5 ? values.hora + ":00" : values.hora;

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/reservas/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            especialista_id: values.especialista,
            servicio_id: values.servicio,
            fecha: fechaFormateada,
            hora: horaFormateada,
            clientEmail: values.email,
            clientName: `${values.nombre} ${values.apellido}`,
            telefono: values.telefono,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Reserva creada exitosamente");
        resetForm();
      } else {
        alert("Error: " + (data.error || "No se pudo crear la reserva"));
      }
    } catch (error) {
      alert("Error de red: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Función para formatear la hora y quitar los segundos ":00"
  const formatHour = (hour) => {
    if (!hour) return "";
    return hour.length === 8 ? hour.slice(0, 5) : hour;
  };

  return (
    <section className="form-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange
      >
        {({ values, setFieldValue, isSubmitting }) => {
          useEffect(() => {
            fetchAvailableSlots(values);
          }, [values.servicio, values.especialista, values.fecha]);

          return (
            <Form className="appointment-form">
              <img src={dpelosn} alt="Logo D'Pelos" className="logo" />
              <p className="subtitulo">Reserva tu cita en nuestra peluqueria ahora!</p>
              <div className="form-row">
                <div className="form-col">
                  <FormInput
                    label="Nombre"
                    name="nombre"
                    placeholder="Digite su nombre"
                  />
                  <FormInput
                    label="Apellido"
                    name="apellido"
                    placeholder="Digite su apellido"
                  />
                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Digite su correo electrónico"
                  />
                  <FormInput
                    label="Teléfono"
                    name="telefono"
                    type="tel"
                    placeholder="Digite su teléfono"
                  />
                </div>
                <div className="form-col">
                  <FormSelect
                    label="Servicio"
                    name="servicio"
                    options={servicesOptions}
                    placeholder="Elija un servicio"
                  />
                  <FormSelect
                    label="Especialista"
                    name="especialista"
                    options={specialistsOptions}
                    placeholder="Elija un especialista"
                  />
                  <FormInput
                    label="Fecha"
                    name="fecha"
                    type="date"
                    placeholder="Seleccione una fecha"
                  />
                  <label className="block mb-1 font-semibold text-gray-700">Hora</label>
                  <div className="horas">
                    {availableTimeSlots && availableTimeSlots.length > 0 ? (
                      availableTimeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          className={`hour-button ${
                            values.hora === time ? "selected" : ""
                          }`}
                          onClick={() => setFieldValue("hora", time)}
                        >
                          {formatHour(time)}
                        </button>
                      ))
                    ) : (
                      <p className="text-gray-500">No hay horas disponibles</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="button-container">
                <button type="submit" className="agendar" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando" : "Agendar cita"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default AppointmentForm;
