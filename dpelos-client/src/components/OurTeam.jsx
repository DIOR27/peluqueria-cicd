import { Image } from "./ui/Image";
import carlos from "../assets/barber-8.jpg";
import miguel from "../assets/barber-6.jpg";
import daniel from "../assets/barber-7.jpg";
import roberto from "../assets/barber-5.jpg";

const teamMembers = [
  {
    name: "Carlos Rodríguez",
    position: "Master Barber",
    image: carlos,
  },
  {
    name: "Miguel Ángel",
    position: "Senior Barber",
    image: miguel,
  },
  {
    name: "Daniel Torres",
    position: "Colorist & Stylist",
    image: daniel,
  },
  {
    name: "Roberto Sánchez",
    position: "Barber & Stylist",
    image: roberto,
  },
];

export default function OurTeam() {
  return (
    <section className="py-16 md:py-20 container mx-auto px-6" id="our-team">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">NUESTRO EQUIPO</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Profesionales apasionados por su trabajo, dedicados a brindarte el mejor servicio y las últimas tendencias en cortes y estilos.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="group">
            <div className="relative aspect-square mb-4 overflow-hidden rounded-xl">
              <Image
                src={member.image}
                alt={`${member.name} - ${member.position}`}
                fill
                className="group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
              <p className="text-gold-500 mt-1">{member.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
