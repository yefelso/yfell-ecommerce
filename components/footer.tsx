import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-bold">YFELL</h3>
            <p className="text-sm text-muted-foreground">Tienda virtual de productos exclusivos y de alta calidad.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/productos" className="text-sm text-muted-foreground hover:text-primary">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-sm text-muted-foreground hover:text-primary">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-sm text-muted-foreground hover:text-primary">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Políticas</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/politicas/privacidad" className="text-sm text-muted-foreground hover:text-primary">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/politicas/terminos" className="text-sm text-muted-foreground hover:text-primary">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/politicas/envios" className="text-sm text-muted-foreground hover:text-primary">
                  Política de Envíos
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Síguenos</h3>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} YFELL. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
