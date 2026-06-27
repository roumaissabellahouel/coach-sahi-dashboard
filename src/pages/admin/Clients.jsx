import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronRight, Phone, Filter, UserPlus } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import NewClientModal from '../../components/admin/NewClientModal'
import { getClients } from '../../lib/storage'

const STATUS_OPTIONS = [
  { value: 'all', label: 'Tous' },
  { value: 'active', label: 'Actifs' },
  { value: 'paused', label: 'En pause' },
  { value: 'pending_payment', label: 'En attente' },
]

const statusLabel = {
  active: 'Actif',
  paused: 'En pause',
  pending_payment: 'En attente',
}
const statusStyle = {
  active: 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20',
  paused: 'bg-amber-400/10 text-amber-400 border border-amber-400/20',
  pending_payment: 'bg-red-400/10 text-red-400 border border-red-400/20',
}

export default function Clients() {
  const [clients, setClients] = useState(getClients())
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)

  const filtered = clients.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.goal.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || c.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <AdminLayout title="Clients">
      {showModal && (
        <NewClientModal
          onClose={() => setShowModal(false)}
          onCreated={(c) => setClients((prev) => [...prev, c])}
        />
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un client..."
            className="w-full bg-surface-card border border-surface-border text-white rounded-xl pl-10 pr-4 py-2.5 text-sm placeholder-white/20 focus:outline-none focus:border-gold/40 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-white/30 flex-shrink-0" />
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-150 whitespace-nowrap ${
                statusFilter === opt.value
                  ? 'bg-gold text-surface'
                  : 'bg-surface-card border border-surface-border text-white/50 hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* New client */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gold text-surface font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-gold-dark transition-colors flex-shrink-0 whitespace-nowrap"
        >
          <UserPlus size={15} /> Nouveau client
        </button>
      </div>

      {/* Count */}
      <p className="text-white/30 text-xs mb-4">
        {filtered.length} client{filtered.length > 1 ? 's' : ''}
      </p>

      {/* Table — desktop */}
      <div className="hidden md:block bg-surface-card border border-surface-border rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-border">
              {['Nom', 'Téléphone', 'Objectif', 'Pack', 'Statut', 'Inscription', ''].map((h) => (
                <th
                  key={h}
                  className="text-left text-white/35 text-xs font-semibold uppercase tracking-wider px-5 py-3.5"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr
                key={c.id}
                className="border-b border-surface-border last:border-0 hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center font-display text-gold text-base select-none flex-shrink-0">
                      {c.name[0]}
                    </div>
                    <span className="text-white text-sm font-medium">{c.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-white/50 text-sm">{c.phone}</td>
                <td className="px-5 py-4 text-white/50 text-sm">{c.goal}</td>
                <td className="px-5 py-4 text-white/50 text-sm">{c.pack}</td>
                <td className="px-5 py-4">
                  <span className={`text-[0.65rem] font-semibold px-2 py-1 rounded-full ${statusStyle[c.status]}`}>
                    {statusLabel[c.status]}
                  </span>
                </td>
                <td className="px-5 py-4 text-white/35 text-sm">
                  {new Date(c.joinDate).toLocaleDateString('fr-DZ', { day: '2-digit', month: 'short', year: 'numeric' })}
                </td>
                <td className="px-5 py-4">
                  <Link
                    to={`/admin/clients/${c.id}`}
                    className="flex items-center gap-1 text-gold text-xs font-semibold hover:opacity-70 transition-opacity"
                  >
                    Voir <ChevronRight size={13} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="text-white/30 text-sm text-center py-12">Aucun client trouvé.</p>
        )}
      </div>

      {/* Cards — mobile */}
      <div className="md:hidden space-y-3">
        {filtered.map((c) => (
          <Link
            key={c.id}
            to={`/admin/clients/${c.id}`}
            className="block bg-surface-card border border-surface-border rounded-2xl p-4 hover:border-gold/20 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center font-display text-gold text-lg select-none">
                  {c.name[0]}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{c.name}</p>
                  <p className="text-white/40 text-xs mt-0.5">{c.goal}</p>
                </div>
              </div>
              <span className={`text-[0.65rem] font-semibold px-2 py-1 rounded-full ${statusStyle[c.status]}`}>
                {statusLabel[c.status]}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-white/35 text-xs">
              <Phone size={11} />
              {c.phone}
            </div>
          </Link>
        ))}

        {filtered.length === 0 && (
          <p className="text-white/30 text-sm text-center py-12">Aucun client trouvé.</p>
        )}
      </div>
    </AdminLayout>
  )
}
