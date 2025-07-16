// Para gestionar las citas
import { create } from 'zustand';
import { toast } from 'react-toastify';
import api from '../../api';
import useServiceStore from './serviceStore';
import useSpecialistStore from './specialistStore';

const useAppointmentStore = create((set) => ({
  appointments: [],
  appointmentDetails: null,
  filters: {
    status: '',
    specialist: ''
  },
  availableTimeSlots: [],
  statusOptions: [
    { value: "pendiente", label: "Pendiente" },
    { value: "confirmada", label: "Confirmada" },
    { value: "completada", label: "Completada" },
    { value: "cancelada", label: "Cancelada" },
  ],
  statusColors: {
    confirmada: "bg-green-100 text-green-800",
    pendiente: "bg-yellow-100 text-yellow-800",
    completada: "bg-blue-100 text-blue-800",
    cancelada: "bg-red-100 text-red-800",
  },
  setFilters: (filters) => set({ filters }),
  getFilteredAppointments: (state) => {
    return state.appointments.filter(appointment => {
      if (state.filters.status && appointment.estado !== state.filters.status) return false;
      if (state.filters.specialist && appointment.especialista_id !== state.filters.specialist) return false;
      return true;
    }).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  },
  resetTimeSlots: () => set({ availableTimeSlots: [] }),
  resetAppointmentDetails: () => set({ appointmentDetails: null }),
  getAppointments: async () => {
    try {
      const response = await api.get('/reservas/');
      set({ appointments: response.data });
    } catch (error) {
      toast.error("Error al obtener las reservas");
      console.error(error);
    }
  },
  getAvailableTimes: async (data) => {
    const { fecha, especialista_id, servicio_id } = data;

    try {
      const response = await api.post(
        '/reservas/horarios_disponibles/',
        { fecha, especialista_id, servicio_id }
      );

      let availableTimeSlots = response?.data || [];

      // Verificamos si la fecha seleccionada es hoy
      const today = new Date();
      const todayString = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD

      const isToday = fecha === todayString;

      // Si es hoy, filtramos los horarios para que sean posteriores a la hora actual + 1 hora
      if (isToday) {
        // Calcular la hora actual + 1 hora de buffer
        const bufferTime = new Date();
        bufferTime.setHours(bufferTime.getHours() + 1);

        // Filtramos los horarios
        availableTimeSlots = availableTimeSlots.filter(horaString => {
          // Creamos una fecha combinando la fecha seleccionada con la hora del slot
          const fechaHoraString = `${fecha}T${horaString}`;
          const fechaHora = new Date(fechaHoraString);

          return fechaHora >= bufferTime;
        });
      }

      set({ availableTimeSlots });
    } catch (error) {
      const message = error?.response?.data?.error || "Error al obtener horas disponibles";
      toast.error(message);
      console.error(error);
      set({ availableTimeSlots: [] });
    }
  },
  createAppointment: async (data) => {
    const {
      clientEmail,
      clientName,
      date: fecha,
      time: hora,
      specialist: especialista_id,
      service: servicio_id
    } = data;

    try {
      const response = await api.post(
        '/reservas/',
        { clientEmail, clientName, fecha, hora, especialista_id, servicio_id }
      );
      set((state) => ({
        appointments: [...state.appointments, response.data.reserva]
      }));
      toast.success("Reserva creada exitosamente.");
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.error || "Error al crear la cita.");
      console.error(error);
      return false;
    }
  },
  getAppointmentDetails: async (appointmentId) => {
    try {
      const response = await api.get(`/reservas/${appointmentId}`);
      const details = response.data;
      const services = useServiceStore.getState().services;
      const specialists = useSpecialistStore.getState().specialists;
      details.especialista = specialists.find(spec => spec.id === details.especialista_id);
      details.servicio = services.find(service => service.id === details.servicio_id);
      set({ appointmentDetails: details });
    } catch (error) {
      toast.error("Error al obtener informacion de la cita.");
      console.error(error);
    }
  },
  updateAppointment: async (data) => {
    const {
      id,
      codigo_reserva,
      specialist: especialista_id,
      date: fecha,
      time: hora,
      service: servicio_id,
      status: estado,
    } = data;
    try {
      const response = await api.put(
        `/reservas/${id}/`,
        { codigo_reserva, especialista_id, fecha, hora, servicio_id, estado }
      );
      const updatedAppointmentData = response.data;
      set((state) => ({
        appointments: state.appointments.map(apt => apt.id === updatedAppointmentData.id ? updatedAppointmentData : apt)
      }));
      toast.success("Reserva actualizada exitosamente.");
      return true;
    } catch (error) {
      toast.error("Error al modificar la cita.");
      console.error(error);
      return false;
    }
  },
  updateAppointmentStatus: async (data) => {
    const { id, status } = data;

    try {
      await api.put(`/reservas/actualizar/${id}/${status}/`);
      set((state) => ({
        appointments: state.appointments
          .map(appointment => appointment.id === id ? { ...appointment, estado: status } : appointment)
      }));
    } catch (error) {
      toast.error("Error al modificar la cita.");
      console.error(error);
    }
  }

}));

export default useAppointmentStore;
