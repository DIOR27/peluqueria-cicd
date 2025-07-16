import { create } from 'zustand';
import { toast } from 'react-toastify';
import api from '../../api';

const useSettingsStore = create((set) => ({
  businessInformation: {},
  workingHours: {
    Lunes: { "dia_display": "Lunes", "dia": "LU", "hora_inicio": "09:00:00", "hora_fin": "18:00:00", "activo": true },
    Martes: { "dia_display": "Martes", "dia": "MA", "hora_inicio": "09:00:00", "hora_fin": "18:00:00", "activo": true },
    Miércoles: { "dia_display": "Miércoles", "dia": "MI", "hora_inicio": "09:00:00", "hora_fin": "18:00:00", "activo": true },
    Jueves: { "dia_display": "Jueves", "dia": "JU", "hora_inicio": "09:00:00", "hora_fin": "18:00:00", "activo": true },
    Viernes: { "dia_display": "Viernes", "dia": "VI", "hora_inicio": "09:00:00", "hora_fin": "18:00:00", "activo": true },
    Sábado: { "dia_display": "Sábado", "dia": "SA", "hora_inicio": "09:00:00", "hora_fin": "15:00:00", "activo": true },
    Domingo: { "dia_display": "Domingo", "dia": "DO", "hora_inicio": "09:00:00", "hora_fin": "18:00:00", "activo": false },
  },
  getBusinessInformation: async () => {
    try {
      const response = await api.get('/informacionnegocio/');
      set({ businessInformation: response?.data?.[0] || {} });
    } catch (error) {
      toast.error("Error al obtener la información del negocio.");
      console.error(error);
    }
  },
  setBusinessInformation: async (businessInformation) => {
    const {
      name: nombre,
      address: direccion,
      phone: telefono,
      email,
    } = businessInformation;
    try {
      const response = await api.post(
        '/informacionnegocio/',
        { nombre, direccion, telefono, email }
      );
      set({ businessInformation: { ...response?.data } });
    } catch (error) {
      toast.error("Error al ingresar la información del negocio.");
      console.error(error);
    }
  },
  updateBusinessInformation: async (businessInformation) => {
    const {
      id,
      name: nombre,
      address: direccion,
      phone: telefono,
      email,
    } = businessInformation;
    try {
      await api.put(
        `/informacionnegocio/${id}/`,
        { nombre, direccion, telefono, email }
      );
      toast.success("Información del negocio guardada exitosamente.");
    } catch (error) {
      toast.error("Error al obtener la información del negocio.");
      console.error(error);
    }
  },
  setWorkingHours: async (daysInfo) => {
    const daysFilteredById = Object.values(daysInfo).reduce((acc, curr) => {
      const isToUpdate = curr.id;
      if (isToUpdate) {
        acc.toUpdate.push(curr);
      } else {
        acc.toSet.push(curr);
      }
      return acc;
    }, { toSet: [], toUpdate: [] });

    // const daysMapped = Object.entries(daysInfo).map(([day, data]) => {
    //   const { open: hora_inicio, close: hora_fin, isActive: activo } = data;
    //   return { dia: daysMap[day], hora_inicio, hora_fin, activo };
    // });

    try {
      if (daysFilteredById.toUpdate.length) {
        await Promise.all(daysFilteredById.toUpdate.map(day => {
          const { dia, hora_inicio, hora_fin, activo } = day;
          return api.put(`/horariotrabajo/${day.id}/`, { dia, hora_inicio, hora_fin, activo });
        }));
      }

      if (daysFilteredById.toSet.length) {
        await Promise.all(daysFilteredById.toSet.map(day => {
          const { dia, hora_inicio, hora_fin, activo } = day;
          return api.post('/horariotrabajo/', { dia, hora_inicio, hora_fin, activo });
        }));
      }

      toast.success("Información de horarios guardada exitosamente.");
    } catch (error) {
      toast.error("Error al ingresar información de horarios.");
      console.error(error);
    }
  },
  getWorkingHours: async () => {
    try {
      const response = await api.get('/horariotrabajo/');
      for (const dayData of response.data) {
        set((state) => ({
          workingHours: {
            ...state.workingHours,
            [dayData.dia_display]: dayData
          }
        }));
      }
    } catch (error) {
      toast.error("Error al obtener información de horarios.");
      console.error(error);
    }
  },
}));

export default useSettingsStore;
