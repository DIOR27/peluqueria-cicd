import { useState, useEffect } from "react";
import { Button } from "../../components/ui/Button";
import { Sheet } from "../../components/ui/Sheet";
import { Search } from "lucide-react";
import useSpecialistStore from "../../stores/specialistStore";
import SpecialistCard from "../../components/dashboard/specialists/SpecialistCard";
import EditSpecialist from "../../components/dashboard/specialists/EditSpecialist";
import SpecialistDetails from "../../components/dashboard/specialists/SpecialistDetails";
import useServiceStore from "../../stores/serviceStore";
import NewSpecialist from "../../components/dashboard/specialists/NewSpecialist";
import Input from "../../components/ui/Input";

export default function Specialists() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isNewSpecialist, setIsNewSpecialist] = useState(false);

  const { specialists, getSpecialists } = useSpecialistStore();
  const { getServices } = useServiceStore();

  useEffect(() => {
    getSpecialists();
    getServices();
  }, [getServices, getSpecialists]);

  const filteredSpecialists = specialists.filter(
    (specialist) =>
      specialist.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      specialist.especialidad.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSpecialistClick = (specialist, isEdit) => {
    setSelectedSpecialist(specialist);
    setIsEditing(isEdit);
    setIsSheetOpen(true);
  };

  const handleNewSpecialist = () => {
    setSelectedSpecialist(null);
    setIsNewSpecialist(true);
    setIsSheetOpen(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsNewSpecialist(false);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setSelectedSpecialist(null);
    setIsEditing(false);
    setIsNewSpecialist(false);
  };

  const handleDelete = () => {
    // Aquí irá la lógica para eliminar el especialista
    console.log("Eliminar especialista:", selectedSpecialist.id);
    handleCloseSheet();
  };

  const editing = selectedSpecialist && isEditing;
  const viewing = selectedSpecialist && !isEditing;
  const newSpecialist = isNewSpecialist && !isEditing && !selectedSpecialist;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Especialistas</h1>
        <Button onClick={handleNewSpecialist}>Nuevo Especialista</Button>
      </div>

      <div className="mb-6">
        <div className="relative w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2"
            placeholder="Buscar especialistas..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpecialists.map((specialist) => (
          <SpecialistCard
            key={specialist.id}
            specialist={specialist}
            handleSpecialistClick={handleSpecialistClick}
          />
        ))}
      </div>

      <Sheet
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
        title={
          newSpecialist
            ? "Nuevo Especialista"
            : selectedSpecialist?.name || "Detalles del Especialista"
        }
      >
        {editing ? (
          <EditSpecialist
            selectedSpecialist={selectedSpecialist}
            handleClose={handleCloseSheet}
          />
        ) : null}

        {viewing ? (
          <SpecialistDetails
            selectedSpecialist={selectedSpecialist}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ) : null}

        {newSpecialist ? (
          <NewSpecialist handleClose={handleCloseSheet} />
        ) : null}
      </Sheet>
    </div>
  );
}
