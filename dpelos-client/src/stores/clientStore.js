// Para gestionar los clientes
import { create } from 'zustand';

const mockClients = [
  { id: 1, name: "Juan Pérez", email: "juan@example.com", phone: "123456789", lastVisit: "2024-03-15" },
  { id: 2, name: "María García", email: "maria@example.com", phone: "987654321", lastVisit: "2024-03-14" },
  { id: 3, name: "Pedro López", email: "pedro@example.com", phone: "1122334455", lastVisit: "2024-03-13" },
  { id: 4, name: "Ana Torres", email: "ana@example.com", phone: "6677889900", lastVisit: "2024-03-12" },
  { id: 5, name: "Luis Martínez", email: "luis@example.com", phone: "5544332211", lastVisit: "2024-03-11" },
  { id: 6, name: "Laura Sánchez", email: "laura@example.com", phone: "9988776655", lastVisit: "2024-03-10" },
  { id: 7, name: "Miguel Ángel Herrera", email: "miguel@example.com", phone: "4455667788", lastVisit: "2024-03-09" },
  { id: 8, name: "Sofía Díaz", email: "sofia@example.com", phone: "3344556677", lastVisit: "2024-03-08" },
  { id: 9, name: "Diego García", email: "diego@example.com", phone: "2233445566", lastVisit: "2024-03-07" },
  { id: 10, name: "Camila Rodríguez", email: "camila@example.com", phone: "7788990011", lastVisit: "2024-03-06" },
  { id: 11, name: "Andrés Torres", email: "andres@example.com", phone: "6677889900", lastVisit: "2024-03-05" },
  { id: 12, name: "Valeria Herrera", email: "valeria@example.com", phone: "5544332211", lastVisit: "2024-03-04" },
  { id: 13, name: "Jorge Sánchez", email: "jorge@example.com", phone: "9988776655", lastVisit: "2024-03-03" },
  { id: 14, name: "Carolina Díaz", email: "carolina@example.com", phone: "3344556677", lastVisit: "2024-03-02" },
];

const useClientStore = create((set) => ({
  clients: mockClients,
}));

export default useClientStore;
