import { Edit, Scissors, Trash2 } from "lucide-react";
import { Button } from "../../ui/Button";

export default function SpecialistDetails({ selectedSpecialist, handleDelete, handleEdit }) {
  return (
    <div>
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Cargo</h4>
          <p className="mt-1">{selectedSpecialist.especialidad}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Biografía</h4>
          <p className="mt-1">{selectedSpecialist.descripcion}</p>
        </div>
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-medium text-gray-500">Estado:</h4>
          <span className={`text-sm ${selectedSpecialist.activo ? "text-green-600" : "text-gray-500"
            }`}>
            {selectedSpecialist.activo ? "Activo" : "Inactivo"}
          </span>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Servicios</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedSpecialist?.servicios_asociados?.map(service => (
              <span key={service.id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold-100 text-gold-800">
                <Scissors className="w-3 h-3 mr-1" />
                {service.nombre}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button
          variant="outline"
          onClick={handleDelete}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Eliminar
        </Button>
        <Button onClick={handleEdit}>
          <Edit className="w-4 h-4 mr-2" />
          Editar
        </Button>
      </div>
    </div>
  );
}
