import { Star, Quote } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const testimonials = [
  {
    name: 'Yacine B.',
    city: 'Alger',
    result: '-12 kg en 3 mois',
    text: "En 3 mois avec Coach Sahi, j'ai perdu 12 kg tout en prenant du muscle. Son suivi WhatsApp est vraiment sérieux et le plan nutrition est facile à suivre même avec la cuisine familiale algérienne.",
  },
  {
    name: 'Rania K.',
    city: 'Oran',
    result: '+8 kg de muscle',
    text: "Je cherchais un coach qui comprend les contraintes algériennes : pas de salle huppée, pas de protéines introuvables. Coach Sahi a tout adapté à ma réalité. Résultat : +8 kg de muscle en 4 mois.",
  },
  {
    name: 'Karim D.',
    city: 'Constantine',
    result: 'Résultats dès le 1er mois',
    text: "Suivi via WhatsApp, toujours disponible, très sérieux. Les programmes changent chaque mois pour ne pas stagner. La nutrition est adaptée à mon budget. Résultats visibles dès la première semaine.",
  },
  {
    name: 'Amira T.',
    city: 'Annaba',
    result: '-8 kg en 2 mois',
    text: "J'avais peur de ne pas tenir mais le coach m'a motivée chaque semaine. J'ai perdu 8 kg et je me sens tellement mieux dans ma peau. Le suivi personnalisé fait vraiment la différence. Je recommande à 100% !",
  },
]

export default function Testimonials() {
  const ref = useScrollAnimation()

  return (
    <section id="testimonials" ref={ref} className="py-28 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 animate-in">
          <p className="text-gold text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Témoignages
          </p>
          <h2 className="font-display text-5xl md:text-6xl xl:text-7xl text-white uppercase leading-none">
            Ils ont{' '}
            <span className="text-gradient-gold">Transformé</span>
            <br />
            leur vie
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="animate-in bg-surface-card border border-surface-border rounded-2xl p-6 md:p-7 hover:border-gold/20 transition-colors duration-300 relative overflow-hidden"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Subtle quote decoration */}
              <Quote
                size={48}
                className="absolute top-5 right-5 text-gold/[0.07]"
                strokeWidth={1}
              />

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={13} className="text-gold fill-gold" />
                ))}
              </div>

              <p className="text-white/65 leading-relaxed mb-7 text-[0.95rem]">{t.text}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center font-display text-gold text-lg leading-none select-none">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-white/35 text-xs">{t.city}</p>
                  </div>
                </div>

                <span className="text-gold text-xs font-bold bg-gold/10 border border-gold/20 rounded-full px-3 py-1.5">
                  {t.result}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center mt-12 animate-in" style={{ transitionDelay: '350ms' }}>
          <p className="text-white/30 text-sm mb-4">
            Des centaines d'autres résultats sur Instagram
          </p>
          <a
            href="https://instagram.com/coach_sahi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold font-semibold text-sm border border-gold/20 bg-gold/5 hover:bg-gold/10 rounded-full px-6 py-2.5 transition-colors duration-200"
          >
            Voir tous les résultats @coach_sahi
          </a>
        </div>
      </div>
    </section>
  )
}
