import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Phone, Target, Calendar, Dumbbell,
  MessageCircle, Plus, CheckCircle, Clock, Download,
  Pencil, Trash2, LayoutGrid, Utensils,
} from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import EditClientModal from '../../components/admin/EditClientModal'
import TrainingProgramEditor from '../../components/admin/TrainingProgramEditor'
import NutritionProgramEditor from '../../components/admin/NutritionProgramEditor'
import { getClient, addNote, addPayment, updateClient, deleteClient } from '../../lib/storage'
import { whatsappLink } from '../../lib/whatsappLink'

const statusLabel = { active: 'Actif', paused: 'En pause', pending_payment: 'Paiement en attente' }
const statusStyle = {
  active: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
  paused: 'bg-amber-400/10 text-amber-400 border-amber-400/20',
  pending_payment: 'bg-red-400/10 text-red-400 border-red-400/20',
}
const statusOptions = [
  { value: 'active', label: 'Actif' },
  { value: 'paused', label: 'En pause' },
  { value: 'pending_payment', label: 'Paiement en attente' },
]
const TABS = [
  { id: 'overview', label: 'Aperçu', icon: LayoutGrid },
  { id: 'training', label: 'Programme', icon: Dumbbell },
  { id: 'nutrition', label: 'Nutrition', icon: Utensils },
]

export default function ClientDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [client, setClient] = useState(getClient(id))
  const [activeTab, setActiveTab] = useState('overview')
  const [noteText, setNoteText] = useState('')
  const [payAmount, setPayAmount] = useState('')
  const [payMethod, setPayMethod] = useState('Cash')
  const [showPayForm, setShowPayForm] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (!client) {
    return (
      <AdminLayout title="Client introuvable">
        <p className="text-white/40">Ce client n'existe pas.</p>
        <Link to="/admin/clients" className="text-gold text-sm mt-4 inline-block">← Retour</Link>
      </AdminLayout>
    )
  }

  const handleStatusChange = (newStatus) => {
    updateClient(id, { status: newStatus })
    setClient((c) => ({ ...c, status: newStatus }))
  }

  const handleAddNote = (e) => {
    e.preventDefault()
    if (!noteText.trim()) return
    const updated = addNote(id, noteText.trim())
    setClient(updated)
    setNoteText('')
  }

  const handleAddPayment = (e) => {
    e.preventDefault()
    if (!payAmount) return
    const payment = {
      date: new Date().toISOString().split('T')[0],
      amount: Number(payAmount),
      method: payMethod,
      pack: client.pack,
      status: 'paid',
    }
    const updated = addPayment(id, payment)
    setClient(updated)
    setPayAmount('')
    setShowPayForm(false)
  }

  const handleDelete = () => {
    deleteClient(id)
    navigate('/admin/clients')
  }

  const totalPaid = (client.payments || [])
    .filter((p) => p.status === 'paid')
    .reduce((s, p) => s + p.amount, 0)

  const handleExportPDF = () => {
    const trainingRows = (client.trainingProgram?.days || []).map((day) => `
      <div class="day-block">
        <div class="day-name">${day.name}</div>
        <table>
          <thead><tr><th>Exercice</th><th>Séries</th><th>Rép.</th><th>Repos</th></tr></thead>
          <tbody>
            ${day.exercises.map((ex) => `<tr><td>${ex.name}</td><td class="center">${ex.sets}</td><td class="center gold">${ex.reps}</td><td class="center">${ex.rest}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>`).join('')

    const nutritionSection = client.nutritionProgram?.calories ? `
      <div class="section">
        <div class="section-title">Programme nutritionnel</div>
        <div class="macro-row">
          <div class="macro-card"><div class="macro-val gold">${client.nutritionProgram.calories}</div><div class="macro-lbl">kcal</div></div>
          <div class="macro-card"><div class="macro-val blue">${client.nutritionProgram.proteins}g</div><div class="macro-lbl">Protéines</div></div>
          <div class="macro-card"><div class="macro-val amber">${client.nutritionProgram.carbs}g</div><div class="macro-lbl">Glucides</div></div>
          <div class="macro-card"><div class="macro-val pink">${client.nutritionProgram.fats}g</div><div class="macro-lbl">Lipides</div></div>
        </div>
        ${client.nutritionProgram.notes ? `<p class="notes-text">${client.nutritionProgram.notes}</p>` : ''}
        ${(client.nutritionProgram.meals || []).map((m) => `
          <div class="meal-row"><div class="meal-name">${m.name} <span class="meal-time">${m.time}</span></div><div class="meal-content">${m.content}</div></div>`).join('')}
      </div>` : ''

    const payRows = (client.payments || []).map((p) => `
      <tr><td>${p.date}</td><td>${p.amount.toLocaleString('fr-DZ')} DZD</td><td>${p.method}</td><td class="${p.status === 'paid' ? 'paid' : 'pending'}">${p.status === 'paid' ? 'Payé' : 'En attente'}</td></tr>`).join('')

    const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8">
<title>Fiche — ${client.name}</title>
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: Arial, sans-serif; background: #fff; color: #111; font-size: 12px; line-height: 1.5; }
.page { max-width: 740px; margin: 0 auto; padding: 36px 32px; }
.header { border-bottom: 3px solid #F7B731; padding-bottom: 18px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-start; }
.brand { font-size: 20px; font-weight: 900; letter-spacing: 3px; }
.brand span { color: #F7B731; }
.client-name { font-size: 22px; font-weight: 800; }
.meta { color: #777; font-size: 11px; }
.section { margin-bottom: 24px; }
.section-title { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #aaa; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
.info-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 12px; }
.info-item label { font-size: 9px; text-transform: uppercase; color: #aaa; letter-spacing: 1px; display: block; }
.day-block { margin-bottom: 16px; }
.day-name { background: #fffbf0; border-left: 3px solid #F7B731; padding: 6px 10px; font-weight: 700; font-size: 11px; margin-bottom: 6px; }
table { width: 100%; border-collapse: collapse; font-size: 11px; }
th { background: #f5f5f5; text-align: left; padding: 6px 8px; font-size: 9px; text-transform: uppercase; color: #999; }
td { padding: 6px 8px; border-bottom: 1px solid #f0f0f0; }
.center { text-align: center; }
.gold { color: #D4941A; font-weight: 700; }
.paid { color: #16a34a; font-weight: 700; }
.pending { color: #d97706; font-weight: 700; }
.macro-row { display: flex; gap: 10px; margin-bottom: 12px; }
.macro-card { flex: 1; background: #f9f9f9; border-radius: 6px; padding: 10px; text-align: center; }
.macro-val { font-size: 18px; font-weight: 800; }
.macro-lbl { font-size: 9px; color: #aaa; text-transform: uppercase; margin-top: 2px; }
.blue { color: #2563eb; } .amber { color: #d97706; } .pink { color: #db2777; }
.notes-text { background: #fffbf0; border-left: 3px solid #F7B731; padding: 8px 12px; margin-bottom: 12px; font-size: 11px; color: #555; }
.meal-row { border-bottom: 1px solid #f0f0f0; padding: 7px 0; }
.meal-name { font-weight: 700; font-size: 11px; }
.meal-time { color: #D4941A; margin-left: 8px; font-weight: 400; }
.meal-content { color: #555; font-size: 11px; margin-top: 2px; }
.total-row { text-align: right; font-weight: 800; font-size: 14px; margin-top: 8px; }
.total-row span { color: #D4941A; }
.footer { margin-top: 32px; border-top: 1px solid #eee; padding-top: 12px; text-align: center; color: #ccc; font-size: 10px; }
@media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
</style></head>
<body><div class="page">
<div class="header">
  <div><div class="brand">COACH <span>SAHI</span></div><div class="meta">Coaching sportif & nutrition</div></div>
  <div style="text-align:right"><div class="client-name">${client.name}</div><div class="meta">Pack ${client.pack} · Inscrit le ${new Date(client.joinDate).toLocaleDateString('fr-DZ', { day: '2-digit', month: 'long', year: 'numeric' })}</div></div>
</div>
<div class="section">
  <div class="section-title">Informations personnelles</div>
  <div class="info-grid">
    <div class="info-item"><label>Téléphone</label>${client.phone}</div>
    <div class="info-item"><label>Âge</label>${client.age} ans</div>
    <div class="info-item"><label>Poids</label>${client.weight} kg</div>
    <div class="info-item"><label>Objectif</label>${client.goal}</div>
  </div>
</div>
${trainingRows ? `<div class="section"><div class="section-title">Programme d'entraînement</div>${trainingRows}</div>` : ''}
${nutritionSection}
<div class="section">
  <div class="section-title">Historique des paiements</div>
  <table><thead><tr><th>Date</th><th>Montant</th><th>Méthode</th><th>Statut</th></tr></thead>
  <tbody>${payRows || '<tr><td colspan="4" style="color:#aaa;text-align:center;padding:12px">Aucun paiement</td></tr>'}</tbody></table>
  <div class="total-row">Total encaissé : <span>${totalPaid.toLocaleString('fr-DZ')} DZD</span></div>
</div>
<div class="footer">Généré le ${new Date().toLocaleDateString('fr-DZ', { day: '2-digit', month: 'long', year: 'numeric' })} · Coach Sahi — Coaching personnalisé</div>
</div>
<script>window.onload = () => window.print()</script>
</body></html>`

    const win = window.open('', '_blank')
    win.document.write(html)
    win.document.close()
  }

  return (
    <AdminLayout title={client.name}>
      {showEditModal && (
        <EditClientModal
          client={client}
          onClose={() => setShowEditModal(false)}
          onUpdated={(updated) => setClient(updated)}
        />
      )}

      {/* Back */}
      <Link
        to="/admin/clients"
        className="inline-flex items-center gap-1.5 text-white/40 text-sm hover:text-white transition-colors mb-6"
      >
        <ArrowLeft size={14} /> Retour aux clients
      </Link>

      {/* Header card */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center font-display text-gold text-3xl select-none flex-shrink-0">
              {client.name[0]}
            </div>
            <div>
              <h2 className="text-white text-xl font-bold">{client.name}</h2>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className={`text-[0.65rem] font-semibold px-2 py-0.5 rounded-full border ${statusStyle[client.status]}`}>
                  {statusLabel[client.status]}
                </span>
                <span className="text-white/30 text-xs">{client.pack}</span>
                <span className="text-white/30 text-xs">·</span>
                <span className="text-white/30 text-xs">
                  Depuis {new Date(client.joinDate).toLocaleDateString('fr-DZ', { month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={client.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="bg-surface border border-surface-border text-white/70 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-gold/40 cursor-pointer"
            >
              {statusOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            <button
              onClick={() => setShowEditModal(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 bg-white/5 border border-surface-border rounded-lg px-3 py-2 hover:text-white hover:border-white/20 transition-colors"
            >
              <Pencil size={12} /> Modifier
            </button>

            <button
              onClick={handleExportPDF}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold bg-gold/10 border border-gold/20 rounded-lg px-3 py-2 hover:bg-gold/20 transition-colors"
            >
              <Download size={12} /> PDF
            </button>

            <a
              href={whatsappLink(`Bonjour ${client.name.split(' ')[0]} !`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/20 rounded-lg px-3 py-2 hover:bg-[#25D366]/20 transition-colors"
            >
              <MessageCircle size={12} /> WhatsApp
            </a>

            {/* Delete with confirmation */}
            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400/60 bg-red-400/5 border border-red-400/10 rounded-lg px-3 py-2 hover:text-red-400 hover:bg-red-400/10 transition-colors"
              >
                <Trash2 size={12} /> Supprimer
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-white/40">Confirmer ?</span>
                <button
                  onClick={handleDelete}
                  className="text-xs font-bold text-white bg-red-500 rounded-lg px-3 py-2 hover:bg-red-600 transition-colors"
                >
                  Oui, supprimer
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="text-xs text-white/40 hover:text-white px-2 py-2 transition-colors"
                >
                  Annuler
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 mb-6 bg-surface-card border border-surface-border rounded-2xl p-1 w-fit">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
              activeTab === id
                ? 'bg-gold text-surface'
                : 'text-white/45 hover:text-white'
            }`}
          >
            <Icon size={14} className={activeTab === id ? 'text-surface' : ''} />
            {label}
          </button>
        ))}
      </div>

      {/* Tab: Aperçu */}
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left col */}
          <div className="space-y-5">
            <div className="bg-surface-card border border-surface-border rounded-2xl p-5">
              <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-4">Informations</h3>
              <div className="space-y-3">
                {[
                  { icon: Phone, label: 'Téléphone', value: client.phone },
                  { icon: Calendar, label: 'Âge', value: `${client.age} ans` },
                  { icon: Target, label: 'Poids', value: `${client.weight} kg` },
                  { icon: Target, label: 'Objectif', value: client.goal },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={13} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-white/35 text-[0.65rem] uppercase tracking-wider">{label}</p>
                      <p className="text-white text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface-card border border-surface-border rounded-2xl p-5">
              <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Programme</h3>
              <div className="flex items-start gap-2.5">
                <Dumbbell size={15} className="text-gold mt-0.5 flex-shrink-0" />
                <p className="text-white text-sm leading-relaxed">{client.program || '—'}</p>
              </div>
              <button
                onClick={() => setActiveTab('training')}
                className="mt-3 text-gold/60 hover:text-gold text-xs font-medium transition-colors"
              >
                Voir le programme détaillé →
              </button>
            </div>

            <div className="bg-surface-card border border-surface-border rounded-2xl p-5">
              <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Total encaissé</h3>
              <p className="font-display text-3xl text-gold">
                {totalPaid.toLocaleString('fr-DZ')}
                <span className="text-sm font-body ml-1 text-white/40">DZD</span>
              </p>
            </div>
          </div>

          {/* Middle col — paiements */}
          <div className="bg-surface-card border border-surface-border rounded-2xl p-5 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider">Historique paiements</h3>
              <button
                onClick={() => setShowPayForm(!showPayForm)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-gold hover:opacity-70 transition-opacity"
              >
                <Plus size={13} /> Ajouter
              </button>
            </div>

            {showPayForm && (
              <form onSubmit={handleAddPayment} className="bg-surface rounded-xl p-4 mb-4 space-y-3">
                <div>
                  <label className="text-white/40 text-xs mb-1 block">Montant (DZD)</label>
                  <input
                    type="number"
                    required
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    placeholder="2500"
                    className="w-full bg-surface-card border border-surface-border text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold/40"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-xs mb-1 block">Méthode</label>
                  <select
                    value={payMethod}
                    onChange={(e) => setPayMethod(e.target.value)}
                    className="w-full bg-surface-card border border-surface-border text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold/40"
                  >
                    <option>Cash</option>
                    <option>Virement</option>
                    <option>Baridimob</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 bg-gold text-surface font-bold py-2 rounded-lg text-xs">
                    Enregistrer
                  </button>
                  <button type="button" onClick={() => setShowPayForm(false)} className="flex-1 bg-surface border border-surface-border text-white/50 py-2 rounded-lg text-xs">
                    Annuler
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2.5">
              {(client.payments || []).map((p, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-surface-border last:border-0">
                  <div className="flex items-center gap-2">
                    {p.status === 'paid'
                      ? <CheckCircle size={14} className="text-emerald-400 flex-shrink-0" />
                      : <Clock size={14} className="text-amber-400 flex-shrink-0" />
                    }
                    <div>
                      <p className="text-white text-sm font-medium">{p.amount.toLocaleString('fr-DZ')} DZD</p>
                      <p className="text-white/30 text-xs">{p.method} · {p.date}</p>
                    </div>
                  </div>
                  <span className={`text-[0.6rem] font-bold px-2 py-0.5 rounded-full ${
                    p.status === 'paid' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-amber-400/10 text-amber-400'
                  }`}>
                    {p.status === 'paid' ? 'Payé' : 'En attente'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right col — notes */}
          <div className="bg-surface-card border border-surface-border rounded-2xl p-5 h-fit">
            <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-4">Notes coach</h3>
            <form onSubmit={handleAddNote} className="mb-5">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Ajouter une note..."
                rows={3}
                className="w-full bg-surface border border-surface-border text-white rounded-xl px-3.5 py-3 text-sm placeholder-white/20 focus:outline-none focus:border-gold/40 resize-none mb-2"
              />
              <button
                type="submit"
                disabled={!noteText.trim()}
                className="w-full bg-gold text-surface font-bold py-2.5 rounded-xl text-xs hover:bg-gold-dark transition-colors disabled:opacity-40"
              >
                Ajouter la note
              </button>
            </form>
            <div className="space-y-3">
              {(client.notes || []).map((n, i) => (
                <div key={i} className="bg-surface rounded-xl p-3.5 border border-surface-border">
                  <p className="text-white/70 text-sm leading-relaxed">{n.text}</p>
                  <p className="text-white/25 text-xs mt-2">{n.date}</p>
                </div>
              ))}
              {(client.notes || []).length === 0 && (
                <p className="text-white/25 text-sm text-center py-4">Aucune note.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Programme */}
      {activeTab === 'training' && (
        <div className="bg-surface-card border border-surface-border rounded-2xl p-6">
          <TrainingProgramEditor client={client} onChange={setClient} />
        </div>
      )}

      {/* Tab: Nutrition */}
      {activeTab === 'nutrition' && (
        <div className="bg-surface-card border border-surface-border rounded-2xl p-6">
          <NutritionProgramEditor client={client} onChange={setClient} />
        </div>
      )}
    </AdminLayout>
  )
}
