// Para gestionar los estilistas/especialistas de la peluueria
import { create } from 'zustand';
import api from '../../api';
import { toast } from 'react-toastify';

// const mockSpecialists = [
//   {
//     id: 1,
//     name: "Carlos Rodríguez",
//     position: "Master Barber",
//     email: "carlos@dpelos.com",
//     phone: "123456789",
//     // schedule: "Lunes a Viernes: 9:00 - 18:00",
//     bio: "Con más de 15 años de experiencia en el mundo de la barbería, especializado en cortes clásicos y modernos.",
//     isActive: true,
//     services: [1, 2, 3] // IDs de los servicios que ofrece
//   },
//   {
//     id: 2,
//     name: "Miguel Ángel",
//     position: "Senior Barber",
//     email: "miguel@dpelos.com",
//     phone: "987654321",
//     // schedule: "Lunes a Sábado: 10:00 - 19:00",
//     bio: "Experto en afeitado tradicional y perfilado de barba, con un enfoque en la atención personalizada.",
//     isActive: true,
//     services: [1, 2, 3, 4]
//   },
//   {
//     id: 3,
//     name: "Daniel Torres",
//     position: "Colorist & Stylist",
//     email: "daniel@dpelos.com",
//     phone: "456789123",
//     // schedule: "Martes a Sábado: 11:00 - 20:00",
//     bio: "Especialista en coloración y tratamientos capilares, siempre a la vanguardia de las últimas tendencias.",
//     isActive: true,
//     services: [4, 5]
//   },
//   {
//     id: 4,
//     name: "Roberto Sánchez",
//     position: "Barber & Stylist",
//     email: "roberto@dpelos.com",
//     phone: "789123456",
//     // schedule: "Miércoles a Domingo: 12:00 - 21:00",
//     bio: "Joven talento con gran habilidad para cortes modernos y estilos innovadores.",
//     isActive: false,
//     services: [1, 3]
//   }
// ];

const useSpecialistStore = create((set) => ({
  specialists: [],
  createSpecialist: async (specialist) => {
    const {
      name: nombre,
      lastname: apellido,
      position: especialidad,
      bio: descripcion,
      isActive: activo,
      services: servicios,
    } = specialist;
    try {
      const response = await api.post(
        '/especialistas/',
        { nombre, apellido, especialidad, descripcion, activo, servicios }
      );
      const specialist = response.data;

      set((state) => ({
        specialists: [...state.specialists, specialist]
      }));
      toast.success("Especialista creado exitosamente.");
    } catch (error) {
      toast.error("Error al crear el especialista.");
      console.error("Error creating specialist:", error);
    }
  },
  getSpecialists: async () => {
    try {
      const response = await api.get('/especialistas/');
      const specialists = response.data;

      set({ specialists });
    } catch (error) {
      toast.error("Error al obtener los especialistas.");
      console.error("Error fetching specialists:", error);
    }
  },
  editSpecialist: async (specialist) => {
    const {
      id,
      name: nombre,
      lastname: apellido,
      position: especialidad,
      bio: descripcion,
      isActive: activo,
      services: servicios,
    } = specialist;
    try {
      const response = await api.put(
        `/especialistas/${id}/`,
        { nombre, apellido, especialidad, descripcion, activo, servicios }
      );
      const updatedSpecialist = response.data;

      set((state) => ({
        specialists: state.specialists.map((spec) => (spec.id === id ? updatedSpecialist : spec))
      }));
      toast.success("Especialista editado exitosamente.");
    } catch (error) {
      toast.error("Error al editar el especialista.");
      console.error("Error editing specialist:", error);
    }
  },
  toggleStatus: async (data) => {
    const { id, status } = data;
    const nextStatus = status ? 0 : 1;
    try {
      await api.put(`/especialistas/${id}/activo/${nextStatus}/`);
      set((state) => ({
        specialists: state.specialists.map((spec) =>
          spec.id === id ? { ...spec, activo: !status } : spec
        )
      }));

    } catch (error) {
      toast.error("Error al cambiar el estado del especialista.");
      console.error("Error toggling specialist status:", error);
    }
  }

}));

export default useSpecialistStore;
