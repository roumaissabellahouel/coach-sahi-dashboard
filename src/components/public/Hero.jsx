import { MessageCircle, ChevronDown } from 'lucide-react'
import { whatsappLink } from '../../lib/whatsappLink'

const stats = [
  { value: '+600', label: 'Clients satisfaits' },
  { value: '486K', label: 'Abonnés Instagram' },
  { value: '100%', label: 'Suivi personnalisé' },
  { value: '5★', label: 'Note moyenne' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-surface">
      {/* Background fitness photo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-surface/85 pointer-events-none" />
      {/* Gold radial glow top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[360px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(247,183,49,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Decorative vertical text — desktop only */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden xl:block select-none pointer-events-none">
        <span
          className="font-display text-[4.5rem] text-white/[0.04] tracking-[0.4em]"
          style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
        >
          COACH SAHI
        </span>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="max-w-4xl mx-auto text-center">

          {/* Status badge */}
          <div
            className="animate-[fadeUp_0.8s_cubic-bezier(0.16,1,0.3,1)_0.1s_both] inline-flex items-center gap-2.5 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-10"
          >
            <span className="w-1.5 h-1.5 bg-gold rounded-full animate-[pulse_2s_ease-in-out_infinite]" />
            <span className="text-gold text-xs font-semibold tracking-[0.18em] uppercase">
              Coach certifié · Algérie
            </span>
          </div>

          {/* Main headline */}
          <h1
            className="animate-[fadeUp_0.9s_cubic-bezier(0.16,1,0.3,1)_0.25s_both] font-display uppercase leading-none tracking-wide mb-8"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 9.5rem)' }}
          >
            <span className="block text-white">Transforme</span>
            <span className="block text-gradient-gold">Ton Corps.</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-[fadeUp_0.9s_cubic-bezier(0.16,1,0.3,1)_0.4s_both] text-white/50 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
            Coaching musculation & nutrition 100% personnalisé.
            <br className="hidden sm:block" />
            Résultats garantis, suivi quotidien, méthode éprouvée.
          </p>

          {/* CTA Buttons */}
          <div className="animate-[fadeUp_0.9s_cubic-bezier(0.16,1,0.3,1)_0.55s_both] flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-gold text-surface font-bold text-base md:text-lg px-8 py-4 rounded-full hover:bg-gold-dark active:scale-[0.97] transition-all duration-200 glow-gold"
            >
              <MessageCircle size={20} />
              Contacter sur WhatsApp
            </a>
            <a
              href="#offers"
              className="inline-flex items-center justify-center gap-2 bg-white/[0.06] border border-white/10 text-white font-medium text-base md:text-lg px-8 py-4 rounded-full hover:bg-white/[0.1] transition-all duration-200"
            >
              Voir les offres
            </a>
          </div>

          {/* Divider */}
          <div className="animate-[fadeIn_1s_ease_0.75s_both] w-20 h-px bg-white/8 mx-auto mb-12" />

          {/* Stats row */}
          <div className="animate-[fadeUp_0.9s_cubic-bezier(0.16,1,0.3,1)_0.85s_both] grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-3xl md:text-4xl text-gold tracking-wide">
                  {s.value}
                </div>
                <div className="text-white/35 text-[0.65rem] uppercase tracking-widest mt-1.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 animate-[fadeIn_1s_ease_1.5s_both]">
        <ChevronDown size={18} className="animate-bounce" />
      </div>
    </section>
  )
}
