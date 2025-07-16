import { Image } from "./ui/Image";
import clasicHaircut from "../assets/clasic-cut.jpg";
import fadeOut from "../assets/fade-out.jpg";
import shaving from "../assets/shaving.jpg";
import beardTrim from "../assets/beard-trim.jpg";

const services = [
  {
    name: "Corte de Cabello",
    description: "Cortes modernos y clásicos adaptados a tu estilo y tipo de cabello.",
    price: "desde $15",
    image: clasicHaircut
  },
  {
    name: "Afeitado Tradicional",
    description: "Afeitado clásico con navaja y toallas calientes para una experiencia premium.",
    price: "desde $12",
    image: shaving
  },
  {
    name: "Perfilado de Barba",
    description: "Dale forma y estilo a tu barba con nuestro servicio de perfilado profesional.",
    price: "desde $10",
    image: beardTrim
  },
  {
    name: "Coloración",
    description: "Servicios de coloración y tratamientos para un look renovado.",
    price: "desde $25",
    image: fadeOut
  }
];

export default function OurServices() {
  return (
    <section className="py-16 md:py-20 container mx-auto px-6" id="our-services">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">NUESTROS SERVICIOS</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Ofrecemos una amplia gama de servicios de barbería y estilismo para que luzcas impecable en cada ocasión.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div key={index} className="group bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                alt={service.name}
                src={service.image}
                fill
                className="group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <p className="text-gold-500 font-semibold">{service.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
