import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Truck, ShieldCheck, Clock, CreditCard } from "lucide-react"
import FeaturedProducts from "@/components/featured-products"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Hero/Hero_img.png"
            alt="YFELL Hero"
            fill
            className="object-cover"
            priority
          />
          {/* <div className="absolute inset-0 bg-black/20" /> */}
        </div>

        <div className="container mx-auto px-4 z-10 text-white">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">Descubre la Elegancia en Cada Detalle</h1>
            <p className="text-lg md:text-xl">
              Productos exclusivos diseñados para quienes aprecian la calidad y el estilo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="font-semibold">
                <Link href="/productos">Ver Productos</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-semibold bg-blue-500 text-white border border-white hover:bg-yellow-600"
              >
                <Link href="/nosotros">Conoce Más</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestros Servicios</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="flex flex-col items-center text-center p-6 space-y-4">
                <Truck className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-semibold">Envío Rápido</h3>
                <p className="text-muted-foreground">
                  Entregamos tus productos en tiempo récord para que los disfrutes cuanto antes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center text-center p-6 space-y-4">
                <ShieldCheck className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-semibold">Garantía de Calidad</h3>
                <p className="text-muted-foreground">
                  Todos nuestros productos cuentan con garantía para tu tranquilidad.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center text-center p-6 space-y-4">
                <CreditCard className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-semibold">Pago Seguro</h3>
                <p className="text-muted-foreground">
                  Múltiples métodos de pago con la mayor seguridad para tus transacciones.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center text-center p-6 space-y-4">
                <Clock className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-semibold">Atención 24/7</h3>
                <p className="text-muted-foreground">
                  Nuestro equipo está disponible para ayudarte en cualquier momento.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Productos Destacados</h2>
          <FeaturedProducts />
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/productos">Ver Todos los Productos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
<section className="py-16 bg-muted/30">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12">Lo Que Dicen Nuestros Clientes</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="shadow-lg rounded-xl border border-gray-200">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/20 h-12 w-12 flex items-center justify-center text-lg font-bold text-primary">
                {String.fromCharCode(64 + i)}
              </div>
              <div>
                <h4 className="font-semibold">Cliente {i}</h4>
                <p className="text-sm text-muted-foreground">Cliente Verificado</p>
              </div>
            </div>
            <p className="text-muted-foreground italic">
              "Los productos de YFELL superaron mis expectativas. La calidad es excepcional y el servicio al
              cliente es de primera."
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>


      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para descubrir nuestros productos?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Únete a nuestra comunidad de clientes satisfechos y descubre por qué YFELL es sinónimo de calidad y
            elegancia.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/productos">Explorar Ahora</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
