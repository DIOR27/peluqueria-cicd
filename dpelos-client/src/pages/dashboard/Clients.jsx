import { useState } from "react";
import { Sheet } from "../../components/ui/Sheet";
import { Search } from "lucide-react";
import ClientsTable from "../../components/dashboard/clients/ClientsTable";
import useClientStore from "../../stores/clientStore";

export default function Clients() {
  const { clients } = useClientStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClientClick = (client) => {
    setSelectedClient(client);
    setIsSheetOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <h1 className="text-2xl font-bold">Clientes</h1>
          <div className="absolute top-0 -right-10 px-1 bg-amber-400 rounded text-xs font-bold">
            BETA
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar clientes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <ClientsTable
        clients={filteredClients}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        handleClientClick={handleClientClick}
      />

      <Sheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        title={selectedClient?.name}
      >
        {selectedClient ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Información del Cliente</h3>
              <div className="mt-4 space-y-2">
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {selectedClient.email}
                </p>
                <p>
                  <span className="font-medium">Teléfono:</span>{" "}
                  {selectedClient.phone}
                </p>
                <p>
                  <span className="font-medium">Última visita:</span>{" "}
                  {selectedClient.lastVisit}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium">Historial de Citas</h3>
              <div className="mt-4">
                <p className="text-gray-500">No hay citas registradas</p>
              </div>
            </div>
          </div>
        ) : null}
      </Sheet>
    </div>
  );
}
