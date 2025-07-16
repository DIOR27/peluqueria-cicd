import useAppointmentStore from "../../../stores/appointmentStore";
import useSpecialistStore from "../../../stores/specialistStore";
import Select from "../../ui/Select";

export default function AppointmentsFilters({ setCurrentPage }) {
  const { filters, setFilters, statusOptions } = useAppointmentStore();
  const { specialists } = useSpecialistStore();

  const handleFilterChange = (value, name) => {
    setFilters({ ...filters, [name]: value });
    setCurrentPage(1);
  };

  const specialistOptions = specialists.map((spec) => ({
    value: spec.id,
    label: `${spec.nombre} ${spec.apellido}`,
  }));

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <div className="flex gap-4">
        <div className="w-1/4">
          <Select
            label="Estado"
            options={statusOptions}
            onChange={(e) => handleFilterChange(e?.value ?? "", "status")}
            isClearable
          />
        </div>
        <div className="w-1/4">
          <Select
            label="Especialista"
            options={specialistOptions}
            onChange={(e) => handleFilterChange(e?.value ?? "", "specialist")}
            isClearable
          />
        </div>
      </div>
    </div>
  );
}
