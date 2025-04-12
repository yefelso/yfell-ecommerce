"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useCart } from "@/contexts/cart-context"
import { formatCurrency } from "@/lib/utils"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = await getDoc(doc(db, "products", id as string))

        if (productDoc.exists()) {
          const data = productDoc.data()
          setProduct({
            id: productDoc.id,
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            imageUrl: data.imageUrl,
            category: data.category,
            createdAt: data.createdAt?.toDate() || new Date(),
          })
        }
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity)
    }
  }

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-96 w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
        <p className="text-muted-foreground mb-8">El producto que estás buscando no existe o ha sido eliminado.</p>
        <Button asChild>
          <Link href="/productos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Productos
          </Link>
        </Button>
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
        Volver a Productos
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="overflow-hidden">
          <div className="relative aspect-square">
            <Image
              src={product.imageUrl || "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </Card>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Categoría: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </p>
          </div>

          <div className="text-2xl font-bold">{formatCurrency(product.price)}</div>

          <div className="prose dark:prose-invert">
            <p>{product.description}</p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Cantidad:</span>
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={incrementQuantity} disabled={product.stock <= quantity}>
                +
              </Button>
            </div>
          </div>

          <div className="text-sm">
            {product.stock > 0 ? (
              <span className="text-green-600 dark:text-green-400">{product.stock} unidades disponibles</span>
            ) : (
              <span className="text-red-600 dark:text-red-400">Agotado</span>
            )}
          </div>

          <Button className="w-full" size="lg" onClick={handleAddToCart} disabled={product.stock === 0}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Añadir al Carrito
          </Button>
        </div>
      </div>
    </div>
  )
}
