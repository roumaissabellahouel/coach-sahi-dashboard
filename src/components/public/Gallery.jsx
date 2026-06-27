import { TrendingUp, TrendingDown } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'

const results = [
  {
    name: 'Yacine B.',
    delta: '-12 kg',
    type: 'loss',
    duration: '3 mois',
    before: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=400&q=75',
    after: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=400&q=75',
  },
  {
    name: 'Mohamed A.',
    delta: '+10 kg',
    type: 'gain',
    duration: '4 mois',
    before: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=400&q=75',
    after: 'https://images.unsplash.com/photo-1567013108821-fca574c79c50?auto=format&fit=crop&w=400&q=75',
  },
  {
    name: 'Rania K.',
    delta: '-8 kg',
    type: 'loss',
    duration: '2 mois',
    before: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=400&q=75',
    after: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=75',
  },
  {
    name: 'Karim D.',
    delta: '+8 kg',
    type: 'gain',
    duration: '3 mois',
    before: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=400&q=75',
    after: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=400&q=75',
  },
  {
    name: 'Amira T.',
    delta: '-14 kg',
    type: 'loss',
    duration: '5 mois',
    before: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&q=75',
    after: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=400&q=75',
  },
  {
    name: 'Sofiane M.',
    delta: '+6 kg',
    type: 'gain',
    duration: '2 mois',
    before: 'https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?auto=format&fit=crop&w=400&q=75',
    after: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=400&q=75',
  },
]

function PhotoSlot({ src, label, isAfter }) {
  return (
    <div className="flex-1 relative overflow-hidden rounded-xl aspect-square bg-surface-muted">
      <img
        src={src}
        alt={label}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.5) 0%, transparent 50%)' }} />
      <span
        className={`absolute top-2 ${isAfter ? 'right-2' : 'left-2'} text-[0.6rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
          isAfter ? 'bg-gold text-surface' : 'bg-surface/70 text-white/70 backdrop-blur-sm'
        }`}
      >
        {label}
      </span>
    </div>
  )
}

export default function Gallery() {
  const ref = useScrollAnimation()

  return (
    <section id="gallery" ref={ref} className="py-28 bg-surface-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 animate-in">
          <p className="text-gold text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            Galerie résultats
          </p>
          <h2 className="font-display text-5xl md:text-6xl xl:text-7xl text-white uppercase leading-none">
            Avant /{' '}
            <span className="text-gradient-gold">Après</span>
          </h2>
          <p className="text-white/35 mt-5 text-sm max-w-sm mx-auto">
            Résultats réels de clients suivis par Coach Sahi
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((r, i) => (
            <div
              key={i}
              className="animate-in bg-surface border border-surface-border rounded-2xl overflow-hidden hover:border-gold/25 transition-colors duration-300"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="flex gap-1 p-3 pb-0">
                <PhotoSlot src={r.before} label="Avant" isAfter={false} />
                <PhotoSlot src={r.after} label="Après" isAfter={true} />
              </div>

              <div className="px-4 py-3.5 flex items-center justify-between">
                <p className="text-white/55 text-sm font-medium">{r.name}</p>
                <div className="flex items-center gap-3">
                  <span className="text-white/30 text-xs">{r.duration}</span>
                  <div
                    className={`inline-flex items-center gap-1 text-xs font-bold ${
                      r.type === 'loss' ? 'text-emerald-400' : 'text-gold'
                    }`}
                  >
                    {r.type === 'loss' ? <TrendingDown size={13} /> : <TrendingUp size={13} />}
                    {r.delta}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-white/20 text-xs mt-10 animate-in" style={{ transitionDelay: '500ms' }}>
          Le coach peut remplacer ces photos par les vraies depuis le dashboard admin
        </p>
      </div>
    </section>
  )
}
