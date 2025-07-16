import { Button } from "./ui/Button";
import { Link } from "react-router-dom";

const services = [
  { name: "Corte de cabello", href: "#" },
  { name: "Afeitado", href: "#" },
  { name: "Perfilado de barba", href: "#" },
  { name: "Degradados", href: "#" },
];

export default function BookAppointmentNow() {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          ¡AGENDA TU CITA AHORA!
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {services.map((service) => (
            <Button
              size="sm"
              key={service.name}
              variant="outline"
              className="text-white border-white hover:bg-white/10 rounded-full"
            >
              {service.name}
            </Button>
          ))}
        </div>

        <Link to="/agendar">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gold-500 hover:text-white rounded-full"
          >
            Agendar cita
          </Button>
        </Link>
      </div>
    </section>
  );
}