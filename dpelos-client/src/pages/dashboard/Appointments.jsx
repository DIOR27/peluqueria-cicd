import { useState } from "react";
import useAppointmentStore from "../../stores/appointmentStore";
import { Button } from "../../components/ui/Button";
import NewAppointmentForm from "../../components/dashboard/appointments/NewAppointmentForm";
import AppointmentsFilters from "../../components/dashboard/appointments/AppointmentsFilters";
import AppointmentsTable from "../../components/dashboard/appointments/AppointmentsTable";

export default function Appointments() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const itemsPerPage = 10;
  const { getFilteredAppointments } = useAppointmentStore();
  const filteredAppointments = getFilteredAppointments(
    useAppointmentStore.getState()
  );

  return (
    <div className="space-y-6 p-6 min-h-full flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Citas</h1>
        <Button
          className="bg-gold-500 hover:bg-gold-600"
          onClick={() => setIsFormOpen(true)}
        >
          Nueva Cita
        </Button>
      </div>

      <AppointmentsFilters setCurrentPage={setCurrentPage} />

      <AppointmentsTable
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        filteredAppointments={filteredAppointments}
        setCurrentPage={setCurrentPage}
      />

      <NewAppointmentForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </div>
  );
}
