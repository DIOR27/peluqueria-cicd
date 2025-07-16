// Para gestionar los servicios que ofrece la peluqueria
import { create } from 'zustand';
import api from '../../api';
import { toast } from 'react-toastify';

const useServiceStore = create((set) => ({
  services: [],
  createService: async (newService) => {
    try {
      const {
        name: nombre,
        description: descripcion,
        price: precio,
        duration: duracion_estimada,
        isActive: activo,
      } = newService;
      const response = await api.post(
        '/servicios/',
        { nombre, descripcion, precio, duracion_estimada, activo },
      );
      const createdService = response.data;
      toast.success("Servicio creado exitosamente");
      set((state) => ({
        services: [...state.services, createdService],
      }));
    } catch (error) {
      toast.error("Error al crear el servicio. Por favor, verifica los datos.");
      console.error("Error creating service:", error);
    }
  },
  editService: async (service) => {
    const {
      id,
      name: nombre,
      description: descripcion,
      price: precio,
      duration: duracion_estimada,
      isActive: activo,
    } = service;
    try {
      const response = await api.put(
        `/servicios/${id}/`,
        { nombre, descripcion, precio, duracion_estimada, activo }
      );
      const updatedService = response.data;

      set((state) => ({
        services: state.services.map((service) => service.id === id ? updatedService : service)
      }));
      toast.success("Servicio editado exitsamente.");
    } catch (error) {
      toast.error("Error al editar el servicio.");
      console.error(error);
    }
  },
  getServices: async () => {
    try {
      const response = await api.get('/servicios/');
      const services = response.data;
      set({ services });
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  },
  toggleServiceStatus: async (data) => {
    const { id, status } = data;
    const nextStatus = status ? 0 : 1;
    try {
      await api.put(`/servicios/${id}/activo/${nextStatus}/`);
      set((state) => ({
        services: state.services.map((service) =>
          service.id === id ? { ...service, activo: !status } : service
        )
      }));
    } catch (error) {
      toast.error("Error al cambiar el estado del servicio.");
      console.error(error);
    }
  }
}));

export default useServiceStore;
