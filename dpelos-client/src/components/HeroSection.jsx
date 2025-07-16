import { Button } from "./ui/Button";
import { Image } from "./ui/Image";
import { Link } from "react-router-dom";
import beardTrim from "../assets/haircut-beard-trim.jpg";
import trimmingHair from "../assets/trimming-hair.jpg";
import shavingBeard from "../assets/shaving-beard.jpg";

export default function HeroSection() {
  return (
    <section className="py-16 md:py-20 container mx-auto px-6">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2 space-y-8">
          <h2 className="text-5xl md:text-7xl font-bold">REINVENTA TU IMAGEN, <br /> <span className="text-gold-400">TRANSFORMA TU CONFIANZA.</span></h2>
          <p className="text-gray-600">
            En D'Pelos no solo cortamos cabello, creamos experiencias que te harán sentir renovado y con estilo.
          </p>
          <Link to="/agendar">
            <Button size="lg" className="rounded-full">
              Agendar ahora
            </Button>
          </Link>
        </div>
        <div className="md:w-1/2">
          <div className="grid grid-cols-2 gap-4 h-[300px]">
            <div className="relative h-full">
              <Image
                src={beardTrim}
                alt="Barbería principal"
                fill
                className="rounded-lg"
                priority
              />
            </div>
            <div className="grid grid-rows-2 gap-4 h-full">
              <div>
                <Image
                  src={trimmingHair}
                  alt="Detalle de barbería"
                  fill
                  className="rounded-lg"
                />
              </div>
              <div>
                <Image
                  src={shavingBeard}
                  alt="Servicios de barbería"
                  fill
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
