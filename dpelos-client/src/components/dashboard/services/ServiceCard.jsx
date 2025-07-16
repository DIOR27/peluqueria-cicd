import { Clock, DollarSign, MoreVertical, User } from "lucide-react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSeparator,
} from "@headlessui/react";
import useServiceStore from "../../../stores/serviceStore";

export default function ServiceCard({ service, handleServiceClick }) {
  const toggleServiceStatus = useServiceStore(state => state.toggleServiceStatus);

  const handleToggleStatus = async () => {
    await toggleServiceStatus({ id: service.id, status: service.activo });
  };

  return (
    <div
      className={`bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow ${!service.activo ? "opacity-60" : ""
        }`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {service.nombre}
            </h3>
            <span
              className={`text-xs font-medium ${service.activo ? "text-green-600" : "text-gray-500"
                }`}
            >
              {service.activo ? "Activo" : "Inactivo"}
            </span>
          </div>
          <div className="relative">
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
                    onClick={() => handleServiceClick(service)}
                  >
                    Ver detalles
                  </button>
                </MenuItem>
                <MenuItem className="w-[180px] px-4 py-2 cursor-pointer data-[focus]:bg-gray-100">
                  <button
                    className="text-left font-medium"
                    onClick={() => handleServiceClick(service, true)}
                  >
                    Editar
                  </button>
                </MenuItem>
                <MenuSeparator className="h-px bg-gray-200" />
                <MenuItem className="w-[180px] px-4 py-2 cursor-pointer data-[focus]:bg-gray-100">
                  <button
                    className={`text-left font-medium ${service.activo ? "text-red-500" : "text-green-500"
                      } `}
                    onClick={handleToggleStatus}
                  >
                    {service.activo ? "Desactivar" : "Activar"}
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">{service.descripcion}</p>
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{service.duracion_estimada} min.</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>{service.precio} </span>
          </div>
        </div>
      </div>
    </div>
  );
}
