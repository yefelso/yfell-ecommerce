"use client"

import { useEffect, useState } from "react"
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { Product } from "@/types"
import ProductCard from "./product-card"
import { Skeleton } from "@/components/ui/skeleton"

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Actualizar la consulta para obtener productos destacados
    const fetchProducts = async () => {
      try {
        // Aquí podrías añadir un campo "featured" a tus productos y filtrar por él
        // Por ahora, simplemente obtenemos los últimos productos
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"), limit(4))

        const querySnapshot = await getDocs(q)
        const productsData: Product[] = []

        querySnapshot.forEach((doc) => {
          const data = doc.data()
          productsData.push({
            id: doc.id,
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            imageUrl: data.imageUrl,
            category: data.category,
            createdAt: data.createdAt?.toDate() || new Date(),
          })
        })

        setProducts(productsData)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-60 w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No hay productos destacados disponibles.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
