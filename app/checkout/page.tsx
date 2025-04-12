"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency } from "@/lib/utils"
import { ArrowLeft, CreditCard, Wallet, Landmark, DollarSignIcon as PaypalLogo } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { PaymentMethod } from "@/types"
import CartLoading from "@/components/cart-loading"

const shippingSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Correo electrónico inválido" }),
  phone: z.string().min(7, { message: "Número de teléfono inválido" }),
  street: z.string().min(5, { message: "Dirección inválida" }),
  city: z.string().min(2, { message: "Ciudad inválida" }),
  state: z.string().min(2, { message: "Estado/Provincia inválido" }),
  zipCode: z.string().min(3, { message: "Código postal inválido" }),
  country: z.string().min(2, { message: "País inválido" }),
})

const cardSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, { message: "Número de tarjeta inválido" }),
  cardName: z.string().min(2, { message: "Nombre en la tarjeta inválido" }),
  expiry: z.string().regex(/^\d{2}\/\d{2}$/, { message: "Fecha de expiración inválida (MM/YY)" }),
  cvc: z.string().regex(/^\d{3,4}$/, { message: "CVC inválido" }),
})

type ShippingFormValues = z.infer<typeof shippingSchema>
type CardFormValues = z.infer<typeof cardSchema>

export default function CheckoutPage() {
  const [activeTab, setActiveTab] = useState("shipping")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const { user } = useAuth()
  const { items, totalPrice, clearCart, isLoading } = useCart()
  const { toast } = useToast()
  const router = useRouter()

  const shippingForm = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "Perú",
    },
  })

  const cardForm = useForm<CardFormValues>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvc: "",
    },
  })

  const onShippingSubmit = (data: ShippingFormValues) => {
    setActiveTab("payment")
  }

  const onPaymentSubmit = async (data: CardFormValues) => {
    if (items.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "No hay productos en tu carrito",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      const shippingData = shippingForm.getValues()

      // Crear la orden en Firestore
      const orderData = {
        customerName: shippingData.name,
        customerEmail: shippingData.email,
        createdAt: serverTimestamp(),
        status: "pending",
        total: totalPrice,
        items: items.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        })),
        paymentMethod: paymentMethod,
        shippingAddress: {
          street: shippingData.street,
          city: shippingData.city,
          state: shippingData.state,
          zipCode: shippingData.zipCode,
          country: shippingData.country,
        },
        phone: shippingData.phone,
        userId: user?.id || null,
      }

      await addDoc(collection(db, "orders"), orderData)

      toast({
        title: "Compra realizada con éxito",
        description: "Gracias por tu compra en YFELL",
      })

      clearCart()
      router.push("/checkout/success")
    } catch (error) {
      console.error("Error processing order:", error)
      toast({
        title: "Error al procesar la compra",
        description: "Por favor, intenta nuevamente",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 16)
    cardForm.setValue("cardNumber", value)
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4)
    }
    cardForm.setValue("expiry", value)
  }

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4)
    cardForm.setValue("cvc", value)
  }

  if (isLoading) {
    return <CartLoading />
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
        <p className="text-muted-foreground mb-8">No puedes proceder al pago sin productos en tu carrito.</p>
        <Button asChild>
          <Link href="/productos">Explorar Productos</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/carrito" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver al Carrito
      </Link>

      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="shipping">Envío</TabsTrigger>
              <TabsTrigger value="payment" disabled={!shippingForm.formState.isValid}>
                Pago
              </TabsTrigger>
            </TabsList>

            <TabsContent value="shipping">
              <Card>
                <CardHeader>
                  <CardTitle>Información de Envío</CardTitle>
                  <CardDescription>Ingresa tus datos para el envío</CardDescription>
                </CardHeader>
                <Form {...shippingForm}>
                  <form onSubmit={shippingForm.handleSubmit(onShippingSubmit)}>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={shippingForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre Completo</FormLabel>
                              <FormControl>
                                <Input placeholder="Tu nombre completo" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={shippingForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Correo Electrónico</FormLabel>
                              <FormControl>
                                <Input placeholder="tu@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={shippingForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Teléfono</FormLabel>
                            <FormControl>
                              <Input placeholder="Tu número de teléfono" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={shippingForm.control}
                        name="street"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Dirección</FormLabel>
                            <FormControl>
                              <Input placeholder="Calle, número, apartamento" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={shippingForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ciudad</FormLabel>
                              <FormControl>
                                <Input placeholder="Tu ciudad" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={shippingForm.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estado/Provincia</FormLabel>
                              <FormControl>
                                <Input placeholder="Tu estado o provincia" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={shippingForm.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Código Postal</FormLabel>
                              <FormControl>
                                <Input placeholder="Tu código postal" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={shippingForm.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>País</FormLabel>
                              <FormControl>
                                <Input placeholder="Tu país" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" className="w-full">
                        Continuar al Pago
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              </Card>
            </TabsContent>

            <TabsContent value="payment">
              <Card>
                <CardHeader>
                  <CardTitle>Método de Pago</CardTitle>
                  <CardDescription>Selecciona tu método de pago preferido</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2 border rounded-md p-4">
                      <RadioGroupItem value="card" id="card" />
                      <label htmlFor="card" className="flex items-center cursor-pointer w-full">
                        <CreditCard className="h-5 w-5 mr-2" />
                        <span>Tarjeta de Crédito/Débito</span>
                      </label>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-md p-4">
                      <RadioGroupItem value="yape" id="yape" />
                      <label htmlFor="yape" className="flex items-center cursor-pointer w-full">
                        <Wallet className="h-5 w-5 mr-2" />
                        <span>Yape</span>
                      </label>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-md p-4">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <label htmlFor="paypal" className="flex items-center cursor-pointer w-full">
                        <PaypalLogo className="h-5 w-5 mr-2" />
                        <span>PayPal</span>
                      </label>
                    </div>

                    <div className="flex items-center space-x-2 border rounded-md p-4">
                      <RadioGroupItem value="transfer" id="transfer" />
                      <label htmlFor="transfer" className="flex items-center cursor-pointer w-full">
                        <Landmark className="h-5 w-5 mr-2" />
                        <span>Transferencia Bancaria</span>
                      </label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <Form {...cardForm}>
                      <form onSubmit={cardForm.handleSubmit(onPaymentSubmit)} className="space-y-4 mt-6">
                        <FormField
                          control={cardForm.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Número de Tarjeta</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="1234 5678 9012 3456"
                                  value={field.value}
                                  onChange={handleCardNumberChange}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={cardForm.control}
                          name="cardName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre en la Tarjeta</FormLabel>
                              <FormControl>
                                <Input placeholder="NOMBRE APELLIDO" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={cardForm.control}
                            name="expiry"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Fecha de Expiración</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/YY" value={field.value} onChange={handleExpiryChange} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={cardForm.control}
                            name="cvc"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVC</FormLabel>
                                <FormControl>
                                  <Input placeholder="123" value={field.value} onChange={handleCvcChange} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <Button type="submit" className="w-full mt-6" disabled={isProcessing}>
                          {isProcessing ? "Procesando..." : "Completar Compra"}
                        </Button>
                      </form>
                    </Form>
                  )}

                  {paymentMethod === "yape" && (
                    <div className="mt-6 space-y-4">
                      <div className="text-center">
                        <p className="mb-4">Escanea el código QR con tu aplicación Yape</p>
                        <div className="mx-auto w-48 h-48 bg-muted flex items-center justify-center rounded-lg">
                          <Image
                            src="/placeholder.svg?height=200&width=200"
                            alt="Código QR Yape"
                            width={180}
                            height={180}
                          />
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground">
                          Envía {formatCurrency(totalPrice)} al número 999-999-999
                        </p>
                      </div>
                      <Button onClick={onPaymentSubmit} className="w-full mt-6" disabled={isProcessing}>
                        {isProcessing ? "Procesando..." : "Confirmar Pago"}
                      </Button>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="mt-6 space-y-4">
                      <div className="text-center">
                        <p className="mb-4">Serás redirigido a PayPal para completar tu pago</p>
                        <Button onClick={onPaymentSubmit} className="w-full mt-6" disabled={isProcessing}>
                          {isProcessing ? "Procesando..." : "Pagar con PayPal"}
                        </Button>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "transfer" && (
                    <div className="mt-6 space-y-4">
                      <div className="border rounded-md p-4">
                        <h3 className="font-medium mb-2">Datos Bancarios</h3>
                        <p className="text-sm">Banco: BBVA</p>
                        <p className="text-sm">Titular: YFELL S.A.C.</p>
                        <p className="text-sm">Cuenta: 0011-0123-0123456789</p>
                        <p className="text-sm">CCI: 011-123-000123456789-01</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Una vez realizada la transferencia, envía el comprobante a pagos@yfell.com
                      </p>
                      <Button onClick={onPaymentSubmit} className="w-full mt-6" disabled={isProcessing}>
                        {isProcessing ? "Procesando..." : "Confirmar Transferencia"}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Compra</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span>
                      {item.product.name} x {item.quantity}
                    </span>
                    <span>{formatCurrency(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <Separator />

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
          </Card>
        </div>
      </div>
    </div>
  )
}
