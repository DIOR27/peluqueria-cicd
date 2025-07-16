import { useEffect } from "react";
import useAppointmentStore from "../../../stores/appointmentStore";
import { Button } from "../../ui/Button";
import { esFechaHoraPasada } from "../../../lib/utils";

export default function AppointmentDetail({
  appointment,
  onClose,
  onEditClick,
}) {
  const { getAppointmentDetails, appointmentDetails, statusColors } = useAppointmentStore();

  useEffect(() => {
    const getDetails = async () => {
      if (appointment.id) {
        await getAppointmentDetails(appointment.id);
      }
    };
    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!appointmentDetails) {
    return null;
  }

  const { servicio, especialista, fecha, hora, estado } = appointmentDetails;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{`Información de la Cita - ${appointment.codigo_reserva
          }`}</h3>
        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Servicio</h4>
            <p className="mt-1">{servicio.nombre}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Especialista</h4>
            <p className="mt-1">{`${especialista.nombre} ${especialista.apellido}`}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Fecha y Hora</h4>
            <p className="mt-1">
              {/* {new Date(fecha).toLocaleDateString()} a las {hora} */}
              {fecha} a las {hora}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Estado</h4>
            <span
              className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[estado]} capitalize`}
            >
              {estado}
            </span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Precio</h4>
            <p className="mt-1">${servicio.precio}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Cerrar
        </Button>
        {!esFechaHoraPasada(fecha, hora) ? (
          <Button onClick={onEditClick}>Editar</Button>
        ) : null}
      </div>
    </div>
  );
}
