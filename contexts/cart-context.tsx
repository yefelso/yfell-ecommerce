"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { doc, getDoc, setDoc, updateDoc, deleteDoc, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import type { Product, CartItem } from "@/types"

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()

  // Función para obtener el ID del carrito
  const getCartId = () => {
    return user ? `cart_${user.id}` : "anonymous_cart"
  }

  // Cargar carrito desde Firestore o localStorage
  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true)

      try {
        if (user) {
          // Si el usuario está autenticado, intentamos cargar su carrito desde Firestore
          const cartId = getCartId()
          const cartRef = doc(db, "carts", cartId)
          const cartDoc = await getDoc(cartRef)

          if (cartDoc.exists()) {
            // El carrito existe en Firestore
            const cartData = cartDoc.data()
            setItems(cartData.items || [])
          } else {
            // El carrito no existe en Firestore, verificamos si hay un carrito en localStorage
            const localCart = localStorage.getItem("cart")
            if (localCart) {
              try {
                const localItems = JSON.parse(localCart)
                // Migrar el carrito de localStorage a Firestore
                await setDoc(cartRef, {
                  userId: user.id,
                  items: localItems,
                  updatedAt: new Date(),
                })
                setItems(localItems)
                // Limpiar localStorage después de migrar
                localStorage.removeItem("cart")
              } catch (error) {
                console.error("Failed to parse cart from localStorage:", error)
                setItems([])
              }
            } else {
              // No hay carrito en localStorage ni en Firestore
              setItems([])
            }
          }
        } else {
          // Usuario no autenticado, usar localStorage
          const savedCart = localStorage.getItem("cart")
          if (savedCart) {
            try {
              setItems(JSON.parse(savedCart))
            } catch (error) {
              console.error("Failed to parse cart from localStorage:", error)
              setItems([])
            }
          } else {
            setItems([])
          }
        }
      } catch (error) {
        console.error("Error loading cart:", error)
        toast({
          title: "Error",
          description: "No se pudo cargar tu carrito de compras",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadCart()
  }, [user, toast])

  // Configurar listener para cambios en el carrito (para sincronización entre pestañas/dispositivos)
  useEffect(() => {
    if (!user) return

    const cartId = getCartId()
    const cartRef = doc(db, "carts", cartId)

    const unsubscribe = onSnapshot(
      cartRef,
      (doc) => {
        if (doc.exists()) {
          const cartData = doc.data()
          setItems(cartData.items || [])
        }
      },
      (error) => {
        console.error("Error listening to cart changes:", error)
      },
    )

    return () => unsubscribe()
  }, [user])

  // Guardar carrito
  const saveCart = async (newItems: CartItem[]) => {
    try {
      if (user) {
        // Guardar en Firestore
        const cartId = getCartId()
        const cartRef = doc(db, "carts", cartId)
        const cartDoc = await getDoc(cartRef)

        if (cartDoc.exists()) {
          // Actualizar carrito existente
          await updateDoc(cartRef, {
            items: newItems,
            updatedAt: new Date(),
          })
        } else {
          // Crear nuevo carrito
          await setDoc(cartRef, {
            userId: user.id,
            items: newItems,
            updatedAt: new Date(),
          })
        }
      } else {
        // Guardar en localStorage para usuarios no autenticados
        localStorage.setItem("cart", JSON.stringify(newItems))
      }
    } catch (error) {
      console.error("Error saving cart:", error)
      toast({
        title: "Error",
        description: "No se pudo guardar tu carrito de compras",
        variant: "destructive",
      })
    }
  }

  const addItem = (product: Product, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id)

      let newItems: CartItem[]

      if (existingItem) {
        // Check if adding more would exceed stock
        const newQuantity = existingItem.quantity + quantity
        if (newQuantity > product.stock) {
          toast({
            title: "No hay suficiente stock",
            description: `Solo quedan ${product.stock} unidades disponibles.`,
            variant: "destructive",
          })
          return prevItems
        }

        newItems = prevItems.map((item) => (item.product.id === product.id ? { ...item, quantity: newQuantity } : item))
      } else {
        // Check if adding would exceed stock
        if (quantity > product.stock) {
          toast({
            title: "No hay suficiente stock",
            description: `Solo quedan ${product.stock} unidades disponibles.`,
            variant: "destructive",
          })
          return prevItems
        }

        toast({
          title: "Producto añadido",
          description: `${product.name} ha sido añadido al carrito.`,
        })

        newItems = [...prevItems, { product, quantity }]
      }

      // Guardar el carrito actualizado
      saveCart(newItems)
      return newItems
    })
  }

  const removeItem = (productId: string) => {
    setItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.product.id !== productId)
      saveCart(newItems)
      return newItems
    })

    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado del carrito.",
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prevItems) => {
      const item = prevItems.find((item) => item.product.id === productId)

      if (!item) return prevItems

      // Check if new quantity would exceed stock
      if (quantity > item.product.stock) {
        toast({
          title: "No hay suficiente stock",
          description: `Solo quedan ${item.product.stock} unidades disponibles.`,
          variant: "destructive",
        })
        return prevItems
      }

      let newItems: CartItem[]

      if (quantity <= 0) {
        newItems = prevItems.filter((item) => item.product.id !== productId)
      } else {
        newItems = prevItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
      }

      saveCart(newItems)
      return newItems
    })
  }

  const clearCart = async () => {
    setItems([])

    try {
      if (user) {
        // Eliminar el carrito de Firestore
        const cartId = getCartId()
        await deleteDoc(doc(db, "carts", cartId))
      } else {
        // Limpiar localStorage
        localStorage.removeItem("cart")
      }
    } catch (error) {
      console.error("Error clearing cart:", error)
    }
  }

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  const totalPrice = items.reduce((total, item) => total + item.product.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
