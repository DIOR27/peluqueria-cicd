import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from "@headlessui/react";
import AppointmentDetail from "./AppointmentDetail";
import EditAppointment from "./EditAppointment";
import { Button } from "../../ui/Button";
import { Sheet } from "../../ui/Sheet";
import useAppointmentStore from "../../../stores/appointmentStore";
import useServiceStore from "../../../stores/serviceStore";
import useSpecialistStore from "../../../stores/specialistStore";
import { esFechaHoraPasada } from "../../../lib/utils";

const tableHeaders = [
  "Servicio",
  "Especialista",
  "Fecha y Hora",
  "Estado",
  "Código",
  "Acciones",
];

export default function AppointmentsTable({
  currentPage,
  itemsPerPage,
  filteredAppointments,
  setCurrentPage,
}) {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const { getAppointments, resetAppointmentDetails, updateAppointmentStatus, statusColors } =
    useAppointmentStore();
  const { services } = useServiceStore();
  const { specialists } = useSpecialistStore();
  // const appointments = useAppointmentStore((state) => state.appointments);

  const handleRowClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsSheetOpen(true);
    setIsEditing(false);
  };

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setIsSheetOpen(true);
    setIsEditing(true);
  };

  useEffect(() => {
    getAppointments();
  }, [getAppointments]);

  const getSpecialistNameById = (specialistId) => {
    const specialist = specialists.find((spec) => spec.id === specialistId);
    return specialist ? `${specialist.nombre} ${specialist.apellido}` : "";
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-scroll min-h-full flex-1 flex flex-col">
        <table className="min-w-full divide-y divide-gray-200 min-h-full">
          <thead className="bg-gray-50">
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedAppointments.map((appointment) => (
              <tr
                key={appointment.id}
                onClick={() => handleRowClick(appointment)}
                className="cursor-pointer hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {services.find(
                      (service) => service.id === appointment.servicio_id
                    )?.nombre || ""}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {getSpecialistNameById(appointment.especialista_id)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {appointment.fecha}
                    {" | "}
                    {appointment.hora}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${statusColors[appointment.estado]
                      }`}
                  >
                    {appointment.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {appointment.codigo_reserva}
                  </div>
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Menu>
                    <MenuButton className="p-1 hover:bg-gray-100 rounded-full focus:outline-none">
                      <MoreVertical className="h-5 w-5 text-gray-500" />
                    </MenuButton>
                    <MenuItems
                      anchor="left start"
                      className="bg-white shadow-lg rounded-md flex flex-col border border-gray-200 text-sm text-gray-700 focus:outline-none"
                    >
                      <MenuItem className="w-[180px] px-4 py-2 cursor-pointer data-[focus]:bg-gray-100">
                        <button
                          className="text-left font-medium"
                          onClick={() => handleRowClick(appointment)}
                        >
                          Ver detalles
                        </button>
                      </MenuItem>
                      <MenuItem className="w-[180px] px-4 py-2 data-[focus]:bg-gray-100">
                        {!esFechaHoraPasada(
                          appointment.fecha,
                          appointment.hora
                        ) ? (
                          <button
                            className="text-left font-medium cursor-pointer"
                            onClick={() => handleEdit(appointment)}
                          >
                            Editar
                          </button>
                        ) : (
                          <div className="text-gray-400" title="Cita pasada">
                            Editar
                          </div>
                        )}
                      </MenuItem>
                      <MenuSeparator className="h-px bg-gray-200" />
                      {!esFechaHoraPasada(
                        appointment.fecha,
                        appointment.hora
                      ) && appointment.estado !== "cancelada" ? (
                        <MenuItem className="w-[180px] px-4 py-2 cursor-pointer data-[focus]:bg-gray-100">
                          <button
                            className="text-left font-medium text-red-500"
                            onClick={() =>
                              updateAppointmentStatus({ id: appointment.id, status: "cancelada" })
                            }
                          >
                            Cancelar
                          </button>
                        </MenuItem>
                      ) : null}
                      {esFechaHoraPasada(appointment.fecha, appointment.hora) &&
                        !["cancelada", "completada"].includes(
                          appointment.estado
                        ) ? (
                        <MenuItem className="w-[180px] px-4 py-2 cursor-pointer data-[focus]:bg-gray-100">
                          <button
                            className="text-left font-medium text-green-500"
                            onClick={() =>
                              updateAppointmentStatus({ id: appointment.id, status: "completada" })
                            }
                          >
                            Completar
                          </button>
                        </MenuItem>
                      ) : null}
                    </MenuItems>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 mt-auto">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-gray-700">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <Sheet
        isOpen={isSheetOpen}
        onClose={() => {
          setIsSheetOpen(false);
          setSelectedAppointment(null);
          setIsEditing(false);
          resetAppointmentDetails();
        }}
        title={`${isEditing ? "Editar Cita" : "Nueva Cita"}`}
      >
        {selectedAppointment && !isEditing ? (
          <AppointmentDetail
            appointment={selectedAppointment}
            setIsSheetOpen={setIsSheetOpen}
            handleEdit={handleEdit}
            onEditClick={() => {
              setIsEditing(true);
            }}
            onClose={() => {
              setIsSheetOpen(false);
              setSelectedAppointment(null);
              resetAppointmentDetails();
            }}
          />
        ) : null}

        {selectedAppointment && isEditing ? (
          <EditAppointment
            isOpen={isEditing}
            onClose={() => {
              setIsEditing(false);
              setSelectedAppointment(null);
              setIsSheetOpen(false);
              resetAppointmentDetails();
            }}
            appointment={selectedAppointment}
          />
        ) : null}
      </Sheet>
    </>
  );
}
