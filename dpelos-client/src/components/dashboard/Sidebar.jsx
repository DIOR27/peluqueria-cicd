import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import {
  Settings,
  Calendar,
  Users,
  Scissors,
  MoreVertical,
  LogOut,
  UserSquare,
} from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import useAuthStore from "../../stores/authStore";

const navigation = [
  { name: "Citas", href: "/panel", icon: Calendar },
  { name: "Clientes", href: "/panel/clientes", icon: Users },
  { name: "Especialistas", href: "/panel/especialistas", icon: Users },
  { name: "Servicios", href: "/panel/servicios", icon: Scissors },
  { name: "Configuración", href: "/panel/configuraciones", icon: Settings },
  { name: "Perfil", href: "/panel/perfil", icon: UserSquare },
];

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const userInitials = `${user?.first_name?.[0] || ''}${user?.last_name?.[0] || ''}`;

  return (
    <div className="flex h-full w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6">
        <h1 className="text-xl font-semibold">D'Pelos Admin</h1>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-gold-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="relative border-b border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 text-white font-medium">
            {userInitials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
          <Menu>
            <MenuButton className="p-1 hover:bg-gray-100 rounded-full focus:outline-none">
              <MoreVertical className="h-5 w-5 text-gray-500" />
            </MenuButton>
            <MenuItems
              anchor="top start"
              className="bg-white shadow-lg rounded-md flex flex-col gap-2 border border-gray-200 text-sm text-gray-700 focus:outline-none"
            >
              <MenuItem className="w-[180px] px-4 py-2 cursor-pointer">
                <button
                  onClick={logout}
                  className=" data-[focus]:bg-gray-100 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4 text-red-500" />
                  Cerrar sesión
                </button>
              </MenuItem>
              <MenuItem className="w-[180px] px-4 py-2 cursor-pointer">
                <Link
                  className=" data-[focus]:bg-gray-100 flex items-center gap-2"
                  to="/panel/configuraciones"
                >
                  <Settings className="h-4 w-4" />
                  Configuración
                </Link>
              </MenuItem>
              <MenuItem className="w-[180px] px-4 py-2 cursor-pointer">
                <Link
                  className=" data-[focus]:bg-gray-100 flex items-center gap-2"
                  to="/panel/perfil"
                >
                  <UserSquare className="h-4 w-4" />
                  Perfil
                </Link>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
}
