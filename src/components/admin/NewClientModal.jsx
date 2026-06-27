import { useState } from 'react'
import { X, UserPlus } from 'lucide-react'
import { createClient } from '../../lib/storage'

const GOALS = ['Prise de masse', 'Perte de poids', 'Sèche / Définition', 'Remise en forme', 'Autre']
const PACKS = ['Mensuel', 'Trimestriel', 'Annuel']

const empty = {
  name: '', phone: '', age: '', weight: '', height: '',
  goal: 'Prise de masse', pack: 'Mensuel',
  joinDate: new Date().toISOString().split('T')[0],
  status: 'active',
}

export default function NewClientModal({ onClose, onCreated }) {
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) {
      setError('Le nom et le téléphone sont obligatoires.')
      return
    }
    const client = createClient({
      ...form,
      age: Number(form.age) || 0,
      weight: Number(form.weight) || 0,
      height: Number(form.height) || 0,
    })
    onCreated(client)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-surface-card border border-surface-border rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-surface-border">
          <div className="flex items-center gap-2.5">
            <UserPlus size={17} className="text-gold" />
            <h2 className="text-white font-semibold text-base">Nouveau client</h2>
          </div>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="label">Nom complet *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="Yacine Benaïssa"
                className="input"
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="label">Téléphone *</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                placeholder="+213 555 00 00 00"
                className="input"
              />
            </div>
            <div className="sm:col-span-1">
              <label className="label">Date d'inscription</label>
              <input
                type="date"
                value={form.joinDate}
                onChange={(e) => set('joinDate', e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="label">Âge</label>
              <input
                type="number"
                value={form.age}
                onChange={(e) => set('age', e.target.value)}
                placeholder="25"
                min="10" max="80"
                className="input"
              />
            </div>
            <div>
              <label className="label">Poids (kg)</label>
              <input
                type="number"
                value={form.weight}
                onChange={(e) => set('weight', e.target.value)}
                placeholder="75"
                className="input"
              />
            </div>
            <div>
              <label className="label">Objectif</label>
              <select value={form.goal} onChange={(e) => set('goal', e.target.value)} className="input">
                {GOALS.map((g) => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Pack</label>
              <select value={form.pack} onChange={(e) => set('pack', e.target.value)} className="input">
                {PACKS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-gold text-surface font-bold py-3 rounded-xl text-sm hover:bg-gold-dark transition-colors"
            >
              Créer le client
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-surface border border-surface-border text-white/60 py-3 rounded-xl text-sm hover:text-white transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
