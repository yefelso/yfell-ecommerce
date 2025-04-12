"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Product } from "@/types"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { formatCurrency } from "@/lib/utils"

// Actualizar la interfaz ProductCardProps
interface ProductCardProps {
  product: Product
  size?: "small" | "medium" | "large"
  shape?: "square" | "rounded" | "pill"
}

// Actualizar la función ProductCard para aceptar el parámetro shape
export default function ProductCard({ product, size = "medium", shape = "rounded" }: ProductCardProps) {
  const { addItem } = useCart()
  const { user } = useAuth()

  const cardSizes = {
    small: "max-w-xs",
    medium: "max-w-sm",
    large: "max-w-md",
  }

  const imageSizes = {
    small: "h-40",
    medium: "h-48",
    large: "h-56",
  }

  const cardShapes = {
    square: "rounded-none",
    rounded: "rounded-lg",
    pill: "rounded-3xl",
  }

  return (
    <Card className={`overflow-hidden ${cardSizes[size]} ${cardShapes[shape]}`}>
      <Link href={`/productos/${product.id}`}>
        <div
          className={`relative ${imageSizes[size]} w-full overflow-hidden bg-muted ${shape === "square" ? "" : shape === "pill" ? "rounded-t-3xl" : "rounded-t-lg"}`}
        >
          <Image
            src={product.imageUrl || "/placeholder.svg?height=400&width=400"}
            alt={product.name}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/productos/${product.id}`}>
          <h3 className="font-semibold text-lg line-clamp-1 hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold text-lg">{formatCurrency(product.price)}</span>
          <span className="text-sm text-muted-foreground">
            {product.stock > 0 ? `${product.stock} disponibles` : "Agotado"}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={() => addItem(product)} disabled={product.stock === 0}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Añadir al Carrito
        </Button>
      </CardFooter>
    </Card>
  )
}
