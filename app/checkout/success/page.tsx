"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ShoppingBag } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function CheckoutSuccessPage() {
  const { user } = useAuth()
  const router = useRouter()

  // Si el usuario intenta acceder directamente a esta página sin haber completado una compra
  useEffect(() => {
    const hasCompletedCheckout = sessionStorage.getItem("checkoutCompleted")
    if (!hasCompletedCheckout) {
      router.push("/")
    }
  }, [router])

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 mb-4">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">¡Compra Exitosa!</CardTitle>
          <CardDescription>Tu pedido ha sido procesado correctamente</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center">
            Gracias por tu compra. Hemos enviado un correo electrónico con los detalles de tu pedido a tu dirección de
            correo electrónico.
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-center">
              Tu pedido será procesado y enviado en las próximas 24-48 horas. Recibirás actualizaciones sobre el estado
              de tu envío.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/productos">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continuar Comprando
            </Link>
          </Button>
          {user && (
            <Button variant="outline" asChild className="w-full">
              <Link href="/perfil/pedidos">Ver Mis Pedidos</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
