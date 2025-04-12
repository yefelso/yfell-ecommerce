"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, Database } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Política de Privacidad</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          En Yfell, nos tomamos muy en serio la privacidad de tus datos personales.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <CardTitle>Seguridad</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Implementamos las más altas medidas de seguridad para proteger tu información personal.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Lock className="h-6 w-6 text-primary" />
              <CardTitle>Confidencialidad</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Tu información personal nunca será compartida con terceros sin tu consentimiento.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Eye className="h-6 w-6 text-primary" />
              <CardTitle>Transparencia</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Te informamos claramente sobre cómo utilizamos tus datos personales.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Database className="h-6 w-6 text-primary" />
              <CardTitle>Control</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Tienes control total sobre tus datos personales en todo momento.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Información que Recopilamos</h2>
          <p className="text-muted-foreground mb-4">
            Recopilamos información que nos proporcionas directamente cuando:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Creas una cuenta en nuestro sitio web</li>
            <li>Realizas una compra</li>
            <li>Te suscribes a nuestro boletín</li>
            <li>Contactas con nuestro servicio de atención al cliente</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Uso de la Información</h2>
          <p className="text-muted-foreground mb-4">
            Utilizamos la información recopilada para:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Procesar tus pedidos y pagos</li>
            <li>Enviarte actualizaciones sobre tu pedido</li>
            <li>Mejorar nuestros productos y servicios</li>
            <li>Enviarte información sobre promociones (solo si nos has dado permiso)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Protección de Datos</h2>
          <p className="text-muted-foreground">
            Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales contra accesos no autorizados, alteraciones, divulgación o destrucción.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Tus Derechos</h2>
          <p className="text-muted-foreground mb-4">
            Tienes derecho a:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Acceder a tus datos personales</li>
            <li>Corregir datos inexactos</li>
            <li>Solicitar la eliminación de tus datos</li>
            <li>Oponerte al procesamiento de tus datos</li>
            <li>Solicitar la portabilidad de tus datos</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Contacto</h2>
          <p className="text-muted-foreground">
            Si tienes alguna pregunta sobre nuestra política de privacidad, por favor contáctanos en:
            <br />
            <a href="mailto:privacidad@yfell.com" className="text-primary hover:underline">
              privacidad@yfell.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
} 