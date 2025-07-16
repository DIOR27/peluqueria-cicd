import { Edit, Trash2 } from "lucide-react";
import { Button } from "../../ui/Button";

export default function ServiceDetails({ selectedService, handleDelete, handleEdit }) {
  return (
    <div>
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Descripción</h4>
          <p className="mt-1">{selectedService.descripcion}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Duración</h4>
            <p className="mt-1">{selectedService.duracion_estimada}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Precio</h4>
            <p className="mt-1">{selectedService.precio}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-medium text-gray-500">Estado:</h4>
          <span className={`text-sm ${selectedService.activo ? "text-green-600" : "text-gray-500"
            }`}>
            {selectedService.isActive ? "Activo" : "Inactivo"}
          </span>
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
        <Button onClick={() => handleEdit(selectedService)}>
          <Edit className="w-4 h-4 mr-2" />
          Editar
        </Button>
      </div>
    </div>
  );
}
