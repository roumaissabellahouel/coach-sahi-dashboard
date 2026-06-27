const words = [
  'MUSCULATION',
  'NUTRITION',
  'COACHING',
  'RÉSULTATS',
  'ALGÉRIE',
  'TRANSFORMATION',
  'DISCIPLINE',
  'PERFORMANCE',
]

export default function MarqueeBand() {
  const doubled = [...words, ...words]

  return (
    <div className="bg-gold overflow-hidden py-3.5 select-none">
      <div
        className="flex whitespace-nowrap will-change-transform"
        style={{ animation: 'marquee 28s linear infinite' }}
      >
        {doubled.map((w, i) => (
          <span
            key={i}
            className="font-display text-lg text-surface tracking-[0.2em] mx-5 flex-shrink-0"
          >
            {w}
            <span className="text-surface/30 mx-4">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
