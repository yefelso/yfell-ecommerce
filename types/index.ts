export interface User {
  id: string
  email: string
  role: "admin" | "customer"
  createdAt: Date
  name?: string
  preferences?: {
    theme: "light" | "dark" | "system"
    cardSize: "small" | "medium" | "large"
    cardShape: "square" | "rounded" | "pill"
  }
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  imageUrl: string
  category: string
  createdAt: Date
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  createdAt: Date
  status: "pending" | "processing" | "completed" | "cancelled"
  total: number
  items: CartItem[]
  paymentMethod: "card" | "yape" | "paypal" | "transfer"
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  phone: string
  userId?: string
}

export interface ShippingAddress {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export type PaymentMethod = "card" | "yape" | "paypal" | "transfer"
