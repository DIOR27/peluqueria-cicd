import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import OurServices from "../components/OurServices";
import WorkingHours from "../components/WorkingHours";
import OurTeam from "../components/OurTeam";
import Footer from "../components/Footer";
import BookAppointmentNow from "../components/BookAppointmentNow";

function Home() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 200); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 1s ease-in-out",
      }}
    >
      <div className="container mx-auto">
        <Header />
        <HeroSection />
        <OurServices />
        <WorkingHours />
        <OurTeam />
      </div>
      <BookAppointmentNow />
      <Footer />
    </div>
  );
}

export default Home;
