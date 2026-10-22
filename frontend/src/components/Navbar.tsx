import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface NavbarProps {
  className?: string
}

export function Navbar({ className }: NavbarProps) {
  const navLinks = [
    { href: '#features', label: 'Funzionalità' },
    { href: '#how-it-works', label: 'Come Funziona' },
    { href: '#pricing', label: 'Prezzi' },
    { href: '#contact', label: 'Contatti' },
  ]

  return (
    <nav className={cn('fixed top-0 left-0 right-0 z-50 px-8 md:px-28 py-4', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-12 md:gap-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
              <svg className="w-5 h-5 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">Greenlight</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" size="sm">Accedi</Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="bg-foreground text-background hover:opacity-90">
              Inizia Gratis
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}