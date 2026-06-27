import { Check, MessageCircle, Zap } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { whatsappOfferLink } from '../../lib/whatsappLink'

const packs = [
  {
    id: 'mensuel',
    name: 'Mensuel',
    price: '2 500',
    period: '/ mois',
    highlight: false,
    features: [
      'Programme musculation personnalisé',
      'Plan nutritionnel adapté',
      'Suivi hebdomadaire WhatsApp',
      'Accès groupe suivi',
    ],
  },
  {
    id: 'trimestriel',
    name: 'Trimestriel',
    price: '6 500',
    period: '/ 3 mois',
    save: 'Économise 1 000 DZD',
    highlight: true,
    features: [
      'Programme musculation personnalisé',
      'Plan nutritionnel complet',
      'Suivi bi-hebdomadaire WhatsApp',
      'Révision mensuelle du programme',
      'Accès groupe suivi premium',
    ],
  },
  {
    id: 'annuel',
    name: 'Annuel',
    price: '22 000',
    period: '/ an',
    save: 'Économise 8 000 DZD',
    highlight: false,
    features: [
      'Programme musculation avancé',
      'Plan nutritionnel détaillé',
      'Suivi quotidien prioritaire',
      'Accès direct coach WhatsApp',
      'Révision mensuelle du programme',
      'Bilan mensuel en vidéo',
    ],
  },
]

export default function Offers() {
  const ref = useScrollAnimation()

  return (
    <section id="offers" ref={ref} className="py-28 bg-surface-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 animate-in">
          <p className="text-gold text-sm font-semibold uppercase tracking-[0.2em] mb-4">Nos offres</p>
          <h2 className="font-display text-5xl md:text-6xl xl:text-7xl text-white uppercase leading-none">
            Choisis Ton{' '}
            <span className="text-gradient-gold">Pack</span>
          </h2>
          <p className="text-white/40 mt-5 max-w-md mx-auto text-sm">
            Paiement en cash. Pas de paiement en ligne. Chaque pack inclut un suivi personnalisé.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto items-start">
          {packs.map((pack, i) => (
            <div
              key={pack.id}
              className={`animate-in relative rounded-2xl p-6 flex flex-col border transition-all duration-300 ${
                pack.highlight
                  ? 'bg-gold border-gold shadow-[0_20px_60px_rgba(247,183,49,0.25)] md:-translate-y-3'
                  : 'bg-surface border-surface-border hover:border-gold/25'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {pack.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 bg-surface text-gold text-[0.65rem] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-gold">
                    <Zap size={10} />
                    Le plus populaire
                  </span>
                </div>
              )}

              {pack.save && (
                <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                  pack.highlight ? 'text-surface/60' : 'text-gold'
                }`}>
                  {pack.save}
                </p>
              )}

              <p className={`font-display text-xl uppercase mb-3 ${
                pack.highlight ? 'text-surface/60' : 'text-white/50'
              }`}>
                Pack {pack.name}
              </p>

              <div className={`mb-1 leading-none ${pack.highlight ? 'text-surface' : 'text-white'}`}>
                <span className="font-display text-5xl">{pack.price}</span>
                <span className="text-sm ml-1 font-medium opacity-60">DZD</span>
              </div>
              <p className={`text-sm mb-7 ${pack.highlight ? 'text-surface/50' : 'text-white/35'}`}>
                {pack.period}
              </p>

              <ul className="space-y-3 flex-1 mb-8">
                {pack.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <Check
                      size={15}
                      className={`flex-shrink-0 mt-0.5 ${
                        pack.highlight ? 'text-surface' : 'text-gold'
                      }`}
                    />
                    <span className={`text-sm leading-snug ${
                      pack.highlight ? 'text-surface/75' : 'text-white/55'
                    }`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={whatsappOfferLink(pack.name)}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 font-bold py-3.5 px-6 rounded-xl transition-all duration-200 active:scale-[0.97] ${
                  pack.highlight
                    ? 'bg-surface text-gold hover:bg-surface/90'
                    : 'bg-gold text-surface hover:bg-gold-dark'
                }`}
              >
                <MessageCircle size={17} />
                S'inscrire via WhatsApp
              </a>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-white/25 text-xs mt-10 animate-in" style={{ transitionDelay: '350ms' }}>
          Paiement 100% en cash · Pas de carte bancaire requise · Suivi via WhatsApp
        </p>
      </div>
    </section>
  )
}
