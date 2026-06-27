import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { whatsappLink } from '../../lib/whatsappLink'

const links = [
  { href: '#about', label: 'À propos' },
  { href: '#offers', label: 'Offres' },
  { href: '#testimonials', label: 'Témoignages' },
  { href: '#gallery', label: 'Résultats' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-surface/95 backdrop-blur-md border-b border-surface-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="font-display text-2xl tracking-widest select-none">
            SAHI <span className="text-gold">COACHING</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </div>

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 bg-gold text-surface font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-gold-dark transition-colors duration-200"
          >
            Commencer
          </a>

          <button
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-surface-card border-t border-surface-border">
          <div className="px-4 py-5 space-y-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block text-base font-medium text-white/70 hover:text-white py-2.5 border-b border-surface-border last:border-0"
              >
                {l.label}
              </a>
            ))}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-gold text-surface font-bold px-5 py-3.5 rounded-xl mt-5 hover:bg-gold-dark transition-colors"
            >
              Commencer maintenant
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
