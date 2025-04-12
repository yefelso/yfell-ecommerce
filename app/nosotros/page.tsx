import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Target } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Sobre YFELL</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Conoce nuestra historia, misión y el equipo detrás de YFELL.
        </p>
      </div>

      {/* History Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
      <div className="relative h-96 md:h-[500px] lg:h-[700px] rounded-lg overflow-hidden">
  <Image src="/images/History/History_img.png" alt="Historia de YFELL" fill className="object-cover" />
</div>


        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Nuestra Historia</h2>
          <p className="text-muted-foreground">
            YFELL nació en 2020 con una visión clara: ofrecer productos exclusivos de alta calidad a precios accesibles.
            Lo que comenzó como un pequeño emprendimiento familiar, rápidamente se convirtió en una marca reconocida por
            su compromiso con la excelencia y la satisfacción del cliente.
          </p>
          <p className="text-muted-foreground">
            A lo largo de los años, hemos crecido y evolucionado, pero nuestra esencia sigue siendo la misma: pasión por
            lo que hacemos y dedicación para ofrecer lo mejor a nuestros clientes.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-full bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Misión</h3>
            </div>
            <p className="text-muted-foreground">
              Nuestra misión es proporcionar productos exclusivos y de alta calidad que mejoren la vida cotidiana de
              nuestros clientes, manteniendo siempre un compromiso con la excelencia, la innovación y el servicio
              excepcional.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-full bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Visión</h3>
            </div>
            <p className="text-muted-foreground">
              Aspiramos a ser reconocidos como líderes en nuestro sector, estableciendo nuevos estándares de calidad y
              servicio. Buscamos expandir nuestra presencia global mientras mantenemos nuestros valores fundamentales y
              contribuimos positivamente a las comunidades donde operamos.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 rounded-full bg-primary/10 mb-4">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Nuestro Equipo</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conoce a las personas apasionadas que hacen posible YFELL.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Ana Rodríguez", role: "Fundadora & CEO", image: "/images/Nosotros/Ana Rodríguez.png" },
            { name: "Carlos Méndez", role: "Director de Operaciones", image: "/images/Nosotros/Carlos Méndez.png" },
            { name: "Laura Gómez", role: "Diseñadora de Productos", image: "/images/Nosotros/Laura Gómez.png" },
          ].map((member, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-64 w-full">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Nuestros Valores</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          Los principios que guían cada decisión que tomamos.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Calidad",
              description: "Nos comprometemos a ofrecer productos de la más alta calidad, cuidando cada detalle.",
            },
            {
              title: "Integridad",
              description: "Actuamos con honestidad y transparencia en todas nuestras operaciones y relaciones.",
            },
            {
              title: "Innovación",
              description: "Buscamos constantemente nuevas formas de mejorar y sorprender a nuestros clientes.",
            },
            {
              title: "Servicio",
              description: "Nos esforzamos por brindar una experiencia excepcional en cada interacción.",
            },
            {
              title: "Sostenibilidad",
              description:
                "Trabajamos para minimizar nuestro impacto ambiental y contribuir positivamente a la sociedad.",
            },
            {
              title: "Pasión",
              description: "Amamos lo que hacemos y eso se refleja en cada producto y servicio que ofrecemos.",
            },
          ].map((value, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center space-y-4">
                <h3 className="text-xl font-bold">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
