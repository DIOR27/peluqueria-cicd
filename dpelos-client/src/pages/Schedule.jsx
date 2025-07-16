import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppointmentForm from "../components/schedule/AppointmentForm";

const Schedule = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 200); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="schedule-page flex items-center justify-center overflow-hidden relative">
      <Link to="/" className="inline-flex items-center text-gray-700 hover:text-gold-500 mb-4 font-medium absolute top-6 left-6">
        <span className="mr-2 text-lg">←</span> Regresar a página de inicio
      </Link>
      <div
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease-in-out",
          width: "100%",
        }}
      >
        <AppointmentForm />
      </div>
    </div>
  );
};

export default Schedule;

