import { MessageCircle, Instagram, Phone, MapPin } from 'lucide-react'
import { whatsappLink } from '../../lib/whatsappLink'

const navLinks = [
  { href: '#about', label: 'À propos' },
  { href: '#offers', label: 'Offres' },
  { href: '#testimonials', label: 'Témoignages' },
  { href: '#gallery', label: 'Résultats' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-surface-card border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-14">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="font-display text-3xl mb-4 select-none">
              SAHI <span className="text-gold">COACHING</span>
            </p>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              Coach certifié en musculation & nutrition. Transforme ton corps avec un suivi 100% personnalisé depuis l'Algérie.
            </p>
            <div className="flex gap-2.5">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 bg-[#25D366]/10 border border-[#25D366]/20 rounded-lg flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/20 transition-colors duration-200"
              >
                <MessageCircle size={17} />
              </a>
              <a
                href="https://instagram.com/coach_sahi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 bg-gold/10 border border-gold/20 rounded-lg flex items-center justify-center text-gold hover:bg-gold/20 transition-colors duration-200"
              >
                <Instagram size={17} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white/60 font-semibold text-xs uppercase tracking-[0.15em] mb-5">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-white/40 text-sm hover:text-white transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white/60 font-semibold text-xs uppercase tracking-[0.15em] mb-5">
              Contact
            </h3>
            <ul className="space-y-3.5">
              <li className="flex items-center gap-2.5 text-white/40 text-sm">
                <MessageCircle size={15} className="text-gold flex-shrink-0" />
                +213 XX XX XX XX
              </li>
              <li className="flex items-center gap-2.5 text-white/40 text-sm">
                <Instagram size={15} className="text-gold flex-shrink-0" />
                @coach_sahi
              </li>
              <li className="flex items-center gap-2.5 text-white/40 text-sm">
                <MapPin size={15} className="text-gold flex-shrink-0" />
                Algérie
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-surface-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs">
            © 2025 Sahi Coaching. Tous droits réservés.
          </p>
          <p className="text-white/15 text-xs">
            Paiement en cash uniquement · Coaching via WhatsApp
          </p>
        </div>
      </div>
    </footer>
  )
}
