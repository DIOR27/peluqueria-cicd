import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const esFechaHoraPasada = (fecha, hora) => {
  const fechaHoraString = `${fecha}T${hora}`;
  const fechaHora = new Date(fechaHoraString);
  const ahora = new Date();
  return fechaHora < ahora;
};

export const getSpecialistsOptions = (selectedServiceId, specialists) => {
  const activeAndService = (specialist) => specialist.activo && specialist.servicios_asociados.find(service => service.id === selectedServiceId);
  const activeOnly = (specialist) => specialist.activo;
  const valueAndLabel = (specialist) => ({
    value: specialist.id,
    label: `${specialist.nombre} ${specialist.apellido}`,
  });

  const filteredSpecialists = specialists.filter(selectedServiceId ? activeAndService : activeOnly);
  return filteredSpecialists.map(valueAndLabel);
};
