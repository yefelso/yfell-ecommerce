"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Clock, Package, MapPin } from "lucide-react"

export default function ShippingPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Política de Envíos</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Conoce nuestros tiempos de entrega, zonas de cobertura y políticas de envío.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Truck className="h-6 w-6 text-primary" />
              <CardTitle>Envío Rápido</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Entregas en 24-48 horas en zonas urbanas principales.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-primary" />
              <CardTitle>Tiempos de Entrega</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Procesamos pedidos en 24 horas hábiles.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-primary" />
              <CardTitle>Embalaje Seguro</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Todos los productos son empacados con materiales de alta calidad.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <MapPin className="h-6 w-6 text-primary" />
              <CardTitle>Cobertura Nacional</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Enviamos a todo el territorio nacional.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Tiempos de Entrega</h2>
          <p className="text-muted-foreground mb-4">
            Los tiempos de entrega varían según la ubicación:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Lima Metropolitana: 24-48 horas</li>
            <li>Provincias principales: 3-5 días hábiles</li>
            <li>Zonas rurales: 5-7 días hábiles</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Costos de Envío</h2>
          <p className="text-muted-foreground mb-4">
            Nuestros costos de envío se calculan según:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Ubicación del destinatario</li>
            <li>Peso y dimensiones del paquete</li>
            <li>Método de envío seleccionado</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Seguimiento de Envíos</h2>
          <p className="text-muted-foreground">
            Todos los envíos incluyen número de seguimiento que podrás rastrear a través de nuestra página web o la página del transportista.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Política de Devoluciones</h2>
          <p className="text-muted-foreground mb-4">
            En caso de devolución:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>El cliente asume el costo del envío de devolución</li>
            <li>El producto debe estar en su estado original</li>
            <li>Se debe presentar el comprobante de compra</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Zonas de Entrega</h2>
          <p className="text-muted-foreground">
            Realizamos entregas en todo el territorio nacional. Para zonas rurales o remotas, los tiempos de entrega pueden extenderse.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">6. Contacto</h2>
          <p className="text-muted-foreground">
            Para consultas sobre envíos, contáctanos en:
            <br />
            <a href="mailto:envios@yfell.com" className="text-primary hover:underline">
              envios@yfell.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
} 