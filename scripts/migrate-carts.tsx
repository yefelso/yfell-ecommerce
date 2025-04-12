"use client"

import { useState } from "react"
import { collection, getDocs, doc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function MigrateCartsScript() {
  const [isRunning, setIsRunning] = useState(false)
  const [status, setStatus] = useState<string>("")
  const [results, setResults] = useState<{ success: number; failed: number }>({ success: 0, failed: 0 })

  const runMigration = async () => {
    setIsRunning(true)
    setStatus("Iniciando migración...")
    setResults({ success: 0, failed: 0 })

    try {
      // Obtener todos los usuarios
      setStatus("Obteniendo usuarios...")
      const usersSnapshot = await getDocs(collection(db, "users"))

      let successCount = 0
      let failedCount = 0

      // Para cada usuario, verificar si tiene un carrito en localStorage
      for (const userDoc of usersSnapshot.docs) {
        const userId = userDoc.id
        setStatus(`Procesando usuario ${userId}...`)

        // Verificar si ya existe un carrito para este usuario
        const cartId = `cart_${userId}`

        try {
          // Crear un carrito vacío para el usuario si no existe
          await setDoc(
            doc(db, "carts", cartId),
            {
              userId,
              items: [],
              updatedAt: new Date(),
            },
            { merge: true },
          )

          successCount++
          setStatus(`Carrito creado/actualizado para el usuario ${userId}`)
        } catch (error) {
          console.error(`Error al migrar carrito para usuario ${userId}:`, error)
          failedCount++
          setStatus(`Error al procesar usuario ${userId}`)
        }
      }

      setResults({ success: successCount, failed: failedCount })
      setStatus("Migración completada")
    } catch (error) {
      console.error("Error durante la migración:", error)
      setStatus(`Error: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Migración de Carritos</CardTitle>
        <CardDescription>
          Esta herramienta crea carritos vacíos en Firestore para todos los usuarios existentes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {status && (
          <div className="mb-4 p-3 bg-muted rounded-md">
            <p className="text-sm">{status}</p>
          </div>
        )}

        {results.success > 0 || results.failed > 0 ? (
          <div className="mt-4">
            <p>Resultados:</p>
            <ul className="list-disc pl-5 mt-2">
              <li className="text-green-600">Éxitos: {results.success}</li>
              <li className="text-red-600">Fallos: {results.failed}</li>
            </ul>
          </div>
        ) : null}
      </CardContent>
      <CardFooter>
        <Button onClick={runMigration} disabled={isRunning} className="w-full">
          {isRunning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Ejecutando migración...
            </>
          ) : (
            "Ejecutar Migración"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
