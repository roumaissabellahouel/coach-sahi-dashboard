import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  PauseCircle,
  AlertCircle,
  TrendingUp,
  MessageCircle,
  ChevronRight,
  Calendar,
} from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import { getClients } from '../../lib/storage'
import { whatsappLink } from '../../lib/whatsappLink'

const statusLabel = { active: 'Actif', paused: 'En pause', pending_payment: 'Paiement en attente' }
const statusStyle = {
  active: 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20',
  paused: 'bg-amber-400/10 text-amber-400 border border-amber-400/20',
  pending_payment: 'bg-red-400/10 text-red-400 border border-red-400/20',
}

export default function Dashboard() {
  const clients = getClients()

  const stats = useMemo(() => {
    const active = clients.filter((c) => c.status === 'active').length
    const paused = clients.filter((c) => c.status === 'paused').length
    const pending = clients.filter((c) => c.status === 'pending_payment').length
    const monthRevenue = clients
      .flatMap((c) => c.payments)
      .filter((p) => {
        const d = new Date(p.date)
        const now = new Date()
        return p.status === 'paid' && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      })
      .reduce((sum, p) => sum + p.amount, 0)
    return { active, paused, pending, monthRevenue }
  }, [clients])

  const pendingClients = clients.filter((c) => c.status === 'pending_payment')
  const recentClients = [...clients]
    .sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate))
    .slice(0, 5)

  return (
    <AdminLayout title="Dashboard">
      {/* Welcome */}
      <p className="text-white/40 text-sm mb-8">
        Bonjour Coach 👋 — voici un aperçu de ton activité aujourd'hui.
      </p>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard
          icon={Users}
          label="Clients actifs"
          value={stats.active}
          color="emerald"
        />
        <StatCard
          icon={PauseCircle}
          label="En pause"
          value={stats.paused}
          color="amber"
        />
        <StatCard
          icon={AlertCircle}
          label="Paiements en attente"
          value={stats.pending}
          color="red"
        />
        <StatCard
          icon={TrendingUp}
          label="Revenus ce mois"
          value={`${stats.monthRevenue.toLocaleString('fr-DZ')} DZD`}
          color="gold"
          small
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Clients à relancer */}
        <div className="bg-surface-card border border-surface-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold text-sm flex items-center gap-2">
              <AlertCircle size={15} className="text-red-400" />
              Paiements en attente
            </h2>
            <Link
              to="/admin/clients"
              className="text-white/30 text-xs hover:text-white/60 transition-colors"
            >
              Voir tous →
            </Link>
          </div>

          {pendingClients.length === 0 ? (
            <p className="text-white/30 text-sm py-4 text-center">Aucun paiement en attente 🎉</p>
          ) : (
            <div className="space-y-3">
              {pendingClients.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between py-2.5 border-b border-surface-border last:border-0"
                >
                  <div>
                    <p className="text-white text-sm font-medium">{c.name}</p>
                    <p className="text-white/35 text-xs mt-0.5">{c.pack} · {c.phone}</p>
                  </div>
                  <a
                    href={whatsappLink(`Bonjour ${c.name.split(' ')[0]}, ton paiement de ce mois est en attente. Peux-tu me le faire parvenir ? Merci !`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/20 rounded-lg px-3 py-1.5 hover:bg-[#25D366]/20 transition-colors"
                  >
                    <MessageCircle size={12} />
                    Relancer
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Clients récents */}
        <div className="bg-surface-card border border-surface-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold text-sm flex items-center gap-2">
              <Calendar size={15} className="text-gold" />
              Clients récents
            </h2>
            <Link
              to="/admin/clients"
              className="text-white/30 text-xs hover:text-white/60 transition-colors"
            >
              Voir tous →
            </Link>
          </div>

          <div className="space-y-2">
            {recentClients.map((c) => (
              <Link
                key={c.id}
                to={`/admin/clients/${c.id}`}
                className="flex items-center justify-between py-2.5 border-b border-surface-border last:border-0 hover:opacity-80 transition-opacity group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center font-display text-gold text-base select-none">
                    {c.name[0]}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{c.name}</p>
                    <p className="text-white/35 text-xs mt-0.5">{c.goal}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[0.65rem] font-semibold px-2 py-0.5 rounded-full ${statusStyle[c.status]}`}>
                    {statusLabel[c.status]}
                  </span>
                  <ChevronRight size={13} className="text-white/20 group-hover:text-white/40 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

function StatCard({ icon: Icon, label, value, color, small }) {
  const colors = {
    emerald: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    amber: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    red: 'text-red-400 bg-red-400/10 border-red-400/20',
    gold: 'text-gold bg-gold/10 border-gold/20',
  }

  return (
    <div className="bg-surface-card border border-surface-border rounded-2xl p-5">
      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center mb-4 ${colors[color]}`}>
        <Icon size={16} />
      </div>
      <div className={`font-display leading-none mb-1 ${small ? 'text-xl' : 'text-4xl'} text-white`}>
        {value}
      </div>
      <p className="text-white/40 text-xs">{label}</p>
    </div>
  )
}
