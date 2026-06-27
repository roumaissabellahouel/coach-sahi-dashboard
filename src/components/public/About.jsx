import { Users, Star, Award, TrendingUp, MessageCircle } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { whatsappLink } from '../../lib/whatsappLink'

const feats = [
  { icon: Users, value: '+600', label: 'Clients suivis' },
  { icon: Star, value: '5★', label: 'Note Instagram' },
  { icon: Award, value: 'Certifié', label: 'Coach pro' },
  { icon: TrendingUp, value: '10+', label: "Ans d'exp." },
]

const certifications = [
  'Coaching en musculation',
  'Nutrition sportive',
  'Préparation physique',
  'Coaching en ligne',
]

export default function About() {
  const ref = useScrollAnimation()

  return (
    <section id="about" ref={ref} className="py-28 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 items-center">

          {/* ── Photo block ── */}
          <div className="animate-in relative">

            {/* Main portrait */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=85"
                alt="Coach musculé"
                className="w-full h-full object-cover object-center"
              />
              {/* Dark gradient bottom */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(8,8,8,0.75) 0%, rgba(8,8,8,0.2) 40%, transparent 70%)',
                }}
              />
              {/* Gold corner frame */}
              <div className="absolute top-4 left-4 w-14 h-14 border-t-2 border-l-2 border-gold/60" />
              <div className="absolute top-4 right-4 w-14 h-14 border-t-2 border-r-2 border-gold/60" />
            </div>

            {/* Action photo — overlapping bottom-right */}
            <div className="absolute -bottom-8 -right-4 sm:-right-10 w-44 sm:w-52 rounded-xl overflow-hidden border-2 border-surface shadow-2xl">
              <div className="relative aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=400&q=80"
                  alt="Entraînement"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-surface/30" />
              </div>
            </div>

            {/* Badge +600 */}
            <div className="absolute -bottom-4 left-4 sm:left-0 bg-gold text-surface rounded-2xl px-5 py-3 shadow-2xl z-10">
              <div className="font-display text-3xl leading-none">+600</div>
              <div className="text-[0.62rem] font-bold uppercase tracking-wider mt-0.5 text-surface/70">
                clients transformés
              </div>
            </div>

            {/* Badge 486K */}
            <div className="absolute top-6 -right-3 sm:-right-8 bg-surface-card border border-surface-border rounded-2xl px-4 py-3 shadow-xl z-10">
              <div className="font-display text-2xl text-gold leading-none">486K</div>
              <div className="text-[0.6rem] font-medium text-white/40 uppercase tracking-wider mt-0.5">
                abonnés
              </div>
            </div>
          </div>

          {/* ── Content ── */}
          <div className="lg:pl-4">

            <div className="animate-in" style={{ transitionDelay: '80ms' }}>
              <p className="text-gold text-sm font-semibold uppercase tracking-[0.22em] mb-4">
                À propos du coach
              </p>
              <h2 className="font-display text-5xl md:text-6xl xl:text-7xl text-white uppercase leading-none mb-7">
                Abdelhakim
                <br />
                <span className="text-gradient-gold">Sahi</span>
              </h2>
            </div>

            <div className="animate-in" style={{ transitionDelay: '160ms' }}>
              <p className="text-white/60 text-lg leading-relaxed mb-4">
                Coach certifié en musculation et nutrition sportive basé en Algérie. Ma méthode
                combine entraînement progressif, plan nutritionnel adapté à la cuisine algérienne
                et suivi quotidien via WhatsApp.
              </p>
              <p className="text-white/45 leading-relaxed mb-10">
                Avec +600 clients transformés et 486K abonnés, j'ai développé une approche
                100% personnalisée qui s'adapte à ton mode de vie, ton budget et tes objectifs —
                que tu veuilles perdre du poids, prendre de la masse ou te remettre en forme.
              </p>
            </div>

            {/* Stats grid */}
            <div
              className="animate-in grid grid-cols-2 gap-3 mb-8"
              style={{ transitionDelay: '240ms' }}
            >
              {feats.map(({ icon: Icon, value, label }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-surface-card border border-surface-border rounded-xl p-4 hover:border-gold/25 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={17} className="text-gold" />
                  </div>
                  <div>
                    <div className="font-display text-xl text-gold leading-none">{value}</div>
                    <div className="text-white/40 text-xs mt-0.5">{label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="animate-in mb-10" style={{ transitionDelay: '320ms' }}>
              <p className="text-white/35 text-xs uppercase tracking-widest mb-3">Certifications</p>
              <div className="flex flex-wrap gap-2">
                {certifications.map((c, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium text-white/55 bg-white/[0.04] border border-white/10 rounded-full px-3 py-1.5"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="animate-in" style={{ transitionDelay: '400ms' }}>
              <a
                href={whatsappLink('Bonjour Coach Sahi, je voudrais en savoir plus sur ta méthode de coaching.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gold text-surface font-bold px-7 py-3.5 rounded-full hover:bg-gold-dark active:scale-[0.97] transition-all duration-200 text-sm"
              >
                <MessageCircle size={17} />
                Parler au coach
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
