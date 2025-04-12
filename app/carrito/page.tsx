"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Trash2, ArrowLeft, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { formatCurrency } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import CartLoading from "@/components/cart-loading"

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart, isLoading } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleQuantityChange = (productId: string, value: string) => {
    const quantity = Number.parseInt(value)
    if (!isNaN(quantity) && quantity > 0) {
      updateQuantity(productId, quantity)
    }
  }

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Inicia sesión para continuar",
        description: "Debes iniciar sesión para completar tu compra",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    router.push("/checkout")
  }

  if (isLoading) {
    return <CartLoading />
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
          <p className="text-muted-foreground mb-8">Parece que aún no has añadido productos a tu carrito de compras.</p>
          <Button asChild>
            <Link href="/productos">Explorar Productos</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/productos"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Continuar Comprando
      </Link>

      <h1 className="text-3xl font-bold mb-8">Tu Carrito</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.product.id}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 bg-muted rounded-md overflow-hidden">
                    <Image
                      src={item.product.imageUrl || "/placeholder.svg?height=200&width=200"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-grow space-y-2">
                    <div className="flex justify-between">
                      <Link
                        href={`/productos/${item.product.id}`}
                        className="font-semibold hover:text-primary transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.product.id)}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{item.product.description}</p>

                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">Cantidad:</span>
                        <Input
                          type="number"
                          min="1"
                          max={item.product.stock}
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.product.id, e.target.value)}
                          className="w-16 h-8"
                        />
                      </div>

                      <div className="font-semibold">{formatCurrency(item.product.price * item.quantity)}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Compra</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span>Gratis</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" onClick={handleCheckout} disabled={isProcessing}>
                {isProcessing ? "Procesando..." : "Finalizar Compra"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
