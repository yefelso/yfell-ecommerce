"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"
import MigrateCartsScript from "@/scripts/migrate-carts"

export default function MigrationPage() {
  const { user } = useAuth()
  const router = useRouter()

  // Redirect if not admin
  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/")
    } else if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user || user.role !== "admin") {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Herramientas de Migración</h1>
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Migración de Carritos</h2>
        <MigrateCartsScript />
      </div>
    </div>
  )
}
