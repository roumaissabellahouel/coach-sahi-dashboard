import { useState } from 'react'
import { MessageCircle, Instagram, Phone, CheckCircle } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { whatsappLink } from '../../lib/whatsappLink'

export default function Contact() {
  const ref = useScrollAnimation()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" ref={ref} className="py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24">

          {/* Left — Info */}
          <div>
            <div className="animate-in">
              <p className="text-gold text-sm font-semibold uppercase tracking-[0.2em] mb-4">Contact</p>
              <h2 className="font-display text-5xl md:text-6xl xl:text-7xl text-white uppercase leading-none mb-6">
                Prêt à
                <br />
                <span className="text-gradient-gold">Commencer ?</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed mb-10">
                Envoie-moi un message ou contacte-moi directement sur WhatsApp. Je réponds dans les 24h et on fait un bilan gratuit de ta situation.
              </p>
            </div>

            <div className="animate-in space-y-3" style={{ transitionDelay: '120ms' }}>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#25D366]/8 border border-[#25D366]/20 rounded-xl p-4 hover:bg-[#25D366]/12 transition-colors duration-200 group"
              >
                <div className="w-11 h-11 bg-[#25D366] rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">WhatsApp</p>
                  <p className="text-white/40 text-xs mt-0.5">+213 XX XX XX XX</p>
                </div>
                <span className="ml-auto text-white/20 text-xs group-hover:text-[#25D366] transition-colors">
                  → Écrire
                </span>
              </a>

              <div className="flex items-center gap-4 bg-surface-card border border-surface-border rounded-xl p-4">
                <div className="w-11 h-11 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Instagram size={20} className="text-gold" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">Instagram</p>
                  <p className="text-white/40 text-xs mt-0.5">@coach_sahi</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-surface-card border border-surface-border rounded-xl p-4">
                <div className="w-11 h-11 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-gold" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">Téléphone</p>
                  <p className="text-white/40 text-xs mt-0.5">+213 XX XX XX XX</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="animate-in" style={{ transitionDelay: '200ms' }}>
            {sent ? (
              <div className="h-full min-h-[360px] flex flex-col items-center justify-center text-center bg-surface-card border border-surface-border rounded-2xl p-10">
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-5">
                  <CheckCircle size={32} className="text-gold" />
                </div>
                <h3 className="font-display text-3xl text-white mb-2">Message reçu !</h3>
                <p className="text-white/45 max-w-xs">
                  Je te réponds dans les 24 heures. Tu peux aussi me contacter directement sur WhatsApp.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-surface-card border border-surface-border rounded-2xl p-6 md:p-8 space-y-5"
              >
                <div>
                  <label className="block text-white/50 text-xs font-medium uppercase tracking-wider mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Votre nom"
                    className="w-full bg-surface border border-surface-border text-white rounded-xl px-4 py-3.5 text-sm placeholder-white/20 focus:outline-none focus:border-gold/40 transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-xs font-medium uppercase tracking-wider mb-2">
                    Numéro WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+213 XX XX XX XX"
                    className="w-full bg-surface border border-surface-border text-white rounded-xl px-4 py-3.5 text-sm placeholder-white/20 focus:outline-none focus:border-gold/40 transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-white/50 text-xs font-medium uppercase tracking-wider mb-2">
                    Message (optionnel)
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Décris ton objectif, ton niveau actuel, tes contraintes..."
                    className="w-full bg-surface border border-surface-border text-white rounded-xl px-4 py-3.5 text-sm placeholder-white/20 focus:outline-none focus:border-gold/40 transition-colors duration-200 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gold text-surface font-bold py-4 rounded-xl hover:bg-gold-dark active:scale-[0.98] transition-all duration-200 text-sm tracking-wide"
                >
                  Envoyer le message
                </button>
                <p className="text-white/20 text-xs text-center">
                  Aucune donnée n'est stockée en ligne · Suivi 100% via WhatsApp
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
