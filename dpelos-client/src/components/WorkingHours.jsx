import { Link } from "react-router-dom";
import { Image } from "./ui/Image";
import emptyRoom from "../assets/empty-room.jpg";
import { Clock } from "lucide-react";
import { Button } from "./ui/Button";

export default function WorkingHours() {
  return (
    <section className="py-16 md:py-20 container mx-auto px-6 rounded-lg" id="our-schedule">
      <div className="flex gap-8">
        <div className="w-1/2 h-[500px] hidden md:block" >
          <Image alt="Horario de atención" src={emptyRoom} fill className="rounded-lg" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl md:text-5xl font-bold">HORARIO DE ATENCION</h2>
            <p className="text-gray-500">
              Descubre los horarios de atención de D'Pelos para que puedas agendar tu cita.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-500" />
                <h3 className="text-lg font-bold">Lunes a Viernes</h3>
              </div>
              <p>09:00 - 18:00</p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-500" />
                <h3 className="text-lg font-bold">Sábados</h3>
              </div>
              <p>09:00 - 14:00</p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-500" />
                <h3 className="text-lg font-bold">Domingos</h3>
              </div>
              <p>CERRADO</p>
            </div>
            <div>
              <Link to="/agendar">
                <Button className="rounded-full">
                  Agendar cita
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}