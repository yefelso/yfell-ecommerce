"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, AlertCircle, ShoppingCart, CreditCard } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Términos y Condiciones</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Por favor, lee detenidamente estos términos y condiciones antes de utilizar nuestros servicios.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-primary" />
              <CardTitle>Acuerdo Legal</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Al utilizar nuestro sitio web, aceptas estos términos y condiciones en su totalidad.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-6 w-6 text-primary" />
              <CardTitle>Responsabilidad</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Nos reservamos el derecho de modificar estos términos en cualquier momento.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-6 w-6 text-primary" />
              <CardTitle>Compras</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Todas las compras están sujetas a disponibilidad y confirmación de pago.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <CreditCard className="h-6 w-6 text-primary" />
              <CardTitle>Pagos</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Aceptamos diversos métodos de pago seguros para tu comodidad.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Uso del Sitio Web</h2>
          <p className="text-muted-foreground">
            Al acceder y utilizar este sitio web, aceptas cumplir con estos términos y condiciones. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestro sitio web.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Registro y Cuenta</h2>
          <p className="text-muted-foreground mb-4">
            Para realizar compras, deberás:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Proporcionar información veraz y actualizada</li>
            <li>Mantener la confidencialidad de tu contraseña</li>
            <li>Notificarnos inmediatamente cualquier uso no autorizado de tu cuenta</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Productos y Precios</h2>
          <p className="text-muted-foreground mb-4">
            Nos reservamos el derecho de:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Modificar precios sin previo aviso</li>
            <li>Limitar la cantidad de productos por pedido</li>
            <li>Rechazar pedidos a nuestra discreción</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Envíos y Entregas</h2>
          <p className="text-muted-foreground">
            Los tiempos de entrega son estimados y pueden variar según la ubicación y disponibilidad del producto. No nos hacemos responsables por retrasos causados por terceros.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">5. Devoluciones y Reembolsos</h2>
          <p className="text-muted-foreground mb-4">
            Aceptamos devoluciones dentro de los 30 días posteriores a la recepción del producto, siempre que:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>El producto esté en su estado original</li>
            <li>Se presente el comprobante de compra</li>
            <li>Se cumplan las condiciones de devolución</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">6. Propiedad Intelectual</h2>
          <p className="text-muted-foreground">
            Todo el contenido de este sitio web, incluyendo textos, gráficos, logotipos, imágenes y software, es propiedad de Yfell y está protegido por las leyes de propiedad intelectual.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">7. Contacto</h2>
          <p className="text-muted-foreground">
            Para cualquier consulta sobre estos términos y condiciones, contáctanos en:
            <br />
            <a href="mailto:legal@yfell.com" className="text-primary hover:underline">
              legal@yfell.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
} 