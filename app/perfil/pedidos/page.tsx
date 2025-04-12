"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/utils"
import { Loader2, Package } from "lucide-react"
import Link from "next/link"
import type { Order } from "@/types"

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  // Redirect if not logged in
  useEffect(() => {
    if (!user && !loading) {
      router.push("/login")
    }
  }, [user, router, loading])

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return

      try {
        // Modificamos la consulta para evitar el error de índice
        // Usamos solo where sin orderBy para evitar necesitar un índice compuesto
        const q = query(collection(db, "orders"), where("userId", "==", user.id))

        const querySnapshot = await getDocs(q)
        const ordersData: Order[] = []

        querySnapshot.forEach((doc) => {
          const data = doc.data()
          ordersData.push({
            id: doc.id,
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            createdAt: data.createdAt?.toDate() || new Date(),
            status: data.status,
            total: data.total,
            items: data.items,
            paymentMethod: data.paymentMethod,
            shippingAddress: data.shippingAddress,
            phone: data.phone,
            userId: data.userId,
          })
        })

        // Ordenamos los datos en el cliente en lugar de en la consulta
        ordersData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

        setOrders(ordersData)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pendiente</Badge>
      case "processing":
        return <Badge variant="secondary">Procesando</Badge>
      case "completed":
        return <Badge variant="default">Completado</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Mis Pedidos</h1>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">No tienes pedidos</h2>
          <p className="text-muted-foreground mb-6">Aún no has realizado ninguna compra</p>
          <Button asChild>
            <Link href="/productos">Explorar Productos</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Pedido #{order.id.slice(-6)}</CardTitle>
                    <CardDescription>{formatDate(order.createdAt)}</CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    {getStatusBadge(order.status)}
                    <span className="font-bold">{formatCurrency(order.total)}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Productos</h3>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.name} x {item.quantity}
                          </span>
                          <span>{formatCurrency(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium mb-2">Información de Envío</h3>
                      <p className="text-sm">{order.customerName}</p>
                      <p className="text-sm">{order.shippingAddress.street}</p>
                      <p className="text-sm">
                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                      </p>
                      <p className="text-sm">{order.shippingAddress.country}</p>
                      <p className="text-sm mt-2">Teléfono: {order.phone}</p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Método de Pago</h3>
                      <p className="text-sm capitalize">
                        {order.paymentMethod === "card"
                          ? "Tarjeta de Crédito/Débito"
                          : order.paymentMethod === "yape"
                            ? "Yape"
                            : order.paymentMethod === "paypal"
                              ? "PayPal"
                              : "Transferencia Bancaria"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
