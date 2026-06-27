import { useState, useMemo } from 'react'
import { Bell, Check, MessageCircle, RotateCcw, CreditCard, PauseCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import { getClients } from '../../lib/storage'
import { whatsappLink } from '../../lib/whatsappLink'

const DONE_KEY = 'coach_rappels_done'

function getDone() {
  try { return new Set(JSON.parse(localStorage.getItem(DONE_KEY) || '[]')) }
  catch { return new Set() }
}
function saveDone(set) {
  localStorage.setItem(DONE_KEY, JSON.stringify([...set]))
}

function daysSince(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  return Math.floor(diff / 86400000)
}

export default function Rappels() {
  const [done, setDone] = useState(getDone)
  const clients = useMemo(() => getClients(), [])

  const toggle = (key) => {
    setDone((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      saveDone(next)
      return next
    })
  }

  // Build rappel list from client data
  const rappels = useMemo(() => {
    const list = []

    clients.forEach((c) => {
      // Pending payment
      if (c.status === 'pending_payment') {
        const lastPayment = c.payments?.[0]
        const days = lastPayment ? daysSince(lastPayment.date) : null
        list.push({
          key: `payment_${c.id}`,
          type: 'payment',
          client: c,
          label: 'Paiement en attente',
          detail: days !== null ? `Dernier paiement il y a ${days} jours` : 'Aucun paiement enregistré',
          urgency: 'high',
          waMessage: `Bonjour ${c.name.split(' ')[0]}, je vous contacte pour votre abonnement. Le paiement de ce mois est en attente. Pouvez-vous me confirmer quand cela vous convient ? Merci 🙏`,
        })
      }

      // Paused clients
      if (c.status === 'paused') {
        const note = c.notes?.[0]
        const days = note ? daysSince(note.date) : null
        list.push({
          key: `pause_${c.id}`,
          type: 'pause',
          client: c,
          label: 'Client en pause',
          detail: days !== null ? `En pause depuis ${days} jours` : 'Statut mis en pause',
          urgency: 'medium',
          waMessage: `Bonjour ${c.name.split(' ')[0]}, j'espère que vous allez bien ! Prêt(e) à reprendre l'entraînement ? Je suis disponible pour vous aider à redémarrer. 💪`,
        })
      }
    })

    return list
  }, [clients])

  const pending = rappels.filter((r) => !done.has(r.key))
  const completed = rappels.filter((r) => done.has(r.key))

  const urgencyStyle = {
    high: { dot: 'bg-red-400', badge: 'bg-red-400/10 text-red-400 border border-red-400/20', icon: CreditCard },
    medium: { dot: 'bg-amber-400', badge: 'bg-amber-400/10 text-amber-400 border border-amber-400/20', icon: PauseCircle },
  }

  const RappelCard = ({ r }) => {
    const style = urgencyStyle[r.urgency]
    const isDone = done.has(r.key)
    const Icon = style.icon

    return (
      <div
        className={`relative bg-surface-card border rounded-2xl p-5 transition-all duration-200 ${
          isDone ? 'border-surface-border opacity-50' : 'border-surface-border hover:border-white/10'
        }`}
      >
        {/* Urgency dot */}
        {!isDone && (
          <span className={`absolute top-5 right-5 w-2 h-2 rounded-full ${style.dot} animate-pulse`} />
        )}

        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center font-display text-gold text-lg select-none flex-shrink-0">
            {r.client.name[0]}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <Link
                to={`/admin/clients/${r.client.id}`}
                className="text-white font-semibold text-sm hover:text-gold transition-colors"
              >
                {r.client.name}
              </Link>
              <span className={`text-[0.6rem] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${style.badge}`}>
                <Icon size={10} />
                {r.label}
              </span>
            </div>
            <p className="text-white/40 text-xs mb-3">{r.detail} · {r.client.pack}</p>

            <div className="flex items-center gap-2 flex-wrap">
              {!isDone && (
                <a
                  href={whatsappLink(r.waMessage, r.client.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#25D366]/20 transition-colors"
                >
                  <MessageCircle size={12} /> Relancer sur WhatsApp
                </a>
              )}
              <button
                onClick={() => toggle(r.key)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                  isDone
                    ? 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10'
                    : 'bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 hover:bg-emerald-400/20'
                }`}
              >
                {isDone ? (
                  <><RotateCcw size={11} /> Remettre en attente</>
                ) : (
                  <><Check size={12} /> Marquer fait</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <AdminLayout title="Rappels">
      {/* Header stats */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gold/10 border border-gold/20 rounded-xl flex items-center justify-center">
            <Bell size={17} className="text-gold" />
          </div>
          <div>
            <p className="text-white font-bold text-2xl leading-none">{pending.length}</p>
            <p className="text-white/40 text-xs mt-0.5">À traiter</p>
          </div>
        </div>
        {completed.length > 0 && (
          <>
            <div className="w-px h-8 bg-surface-border" />
            <div>
              <p className="text-emerald-400 font-bold text-2xl leading-none">{completed.length}</p>
              <p className="text-white/40 text-xs mt-0.5">Traités</p>
            </div>
          </>
        )}
      </div>

      {/* Pending */}
      {pending.length > 0 ? (
        <section className="mb-10">
          <h2 className="text-white/35 text-xs font-semibold uppercase tracking-widest mb-4">
            À traiter — {pending.length}
          </h2>
          <div className="space-y-3">
            {pending.map((r) => <RappelCard key={r.key} r={r} />)}
          </div>
        </section>
      ) : (
        <div className="text-center py-16 bg-surface-card border border-surface-border rounded-2xl mb-10">
          <div className="w-12 h-12 bg-emerald-400/10 border border-emerald-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Check size={20} className="text-emerald-400" />
          </div>
          <p className="text-white font-semibold mb-1">Tout est à jour !</p>
          <p className="text-white/35 text-sm">Aucun rappel en attente pour le moment.</p>
        </div>
      )}

      {/* Done */}
      {completed.length > 0 && (
        <section>
          <h2 className="text-white/35 text-xs font-semibold uppercase tracking-widest mb-4">
            Traités — {completed.length}
          </h2>
          <div className="space-y-3">
            {completed.map((r) => <RappelCard key={r.key} r={r} />)}
          </div>
        </section>
      )}
    </AdminLayout>
  )
}
