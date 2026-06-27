import { useState } from 'react'
import { Plus, Trash2, Edit2, Check, X, Flame } from 'lucide-react'
import { updateClient } from '../../lib/storage'

const newMeal = () => ({ id: Date.now() + Math.random(), name: 'Repas', time: '12:00', content: '' })
const defaultProgram = { calories: 0, proteins: 0, carbs: 0, fats: 0, notes: '', meals: [] }

const MACROS = [
  { key: 'proteins', label: 'Protéines', unit: 'g', kcalPer: 4, color: 'bg-blue-400', text: 'text-blue-400', border: 'border-blue-400/30' },
  { key: 'carbs', label: 'Glucides', unit: 'g', kcalPer: 4, color: 'bg-amber-400', text: 'text-amber-400', border: 'border-amber-400/30' },
  { key: 'fats', label: 'Lipides', unit: 'g', kcalPer: 9, color: 'bg-pink-400', text: 'text-pink-400', border: 'border-pink-400/30' },
]

export default function NutritionProgramEditor({ client, onChange }) {
  const program = client.nutritionProgram || defaultProgram
  const [draft, setDraft] = useState(null)
  const isEditing = draft !== null
  const data = isEditing ? draft : program

  const setField = (field, val) => setDraft((d) => ({ ...d, [field]: val }))
  const startEdit = () => setDraft(JSON.parse(JSON.stringify(program)))
  const cancel = () => setDraft(null)
  const save = () => {
    const updated = updateClient(client.id, { nutritionProgram: draft })
    if (updated) onChange(updated)
    setDraft(null)
  }

  const addMeal = () => setDraft((d) => ({ ...d, meals: [...(d.meals || []), newMeal()] }))
  const removeMeal = (id) => setDraft((d) => ({ ...d, meals: d.meals.filter((m) => m.id !== id) }))
  const setMeal = (id, field, val) =>
    setDraft((d) => ({ ...d, meals: d.meals.map((m) => (m.id === id ? { ...m, [field]: val } : m)) }))

  const isEmpty = !data.calories && !(data.meals || []).length

  const totalKcal = (data.proteins || 0) * 4 + (data.carbs || 0) * 4 + (data.fats || 0) * 9
  const pct = (val, kcalPer) => (totalKcal > 0 ? Math.round((val * kcalPer / totalKcal) * 100) : 0)

  if (isEmpty && !isEditing) {
    return (
      <div className="text-center py-16">
        <div className="w-12 h-12 bg-white/5 border border-surface-border rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Flame size={20} className="text-white/15" />
        </div>
        <p className="text-white/30 text-sm mb-4">Aucun programme nutritionnel défini</p>
        <button
          onClick={startEdit}
          className="text-gold text-sm font-semibold hover:opacity-70 transition-opacity"
        >
          + Créer le programme nutritionnel
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Controls */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-white/35 text-sm">{(data.meals || []).length} repas planifiés</p>
        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={save}
              className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-lg px-3 py-1.5 hover:bg-emerald-400/20 transition-colors"
            >
              <Check size={12} /> Sauvegarder
            </button>
            <button
              onClick={cancel}
              className="flex items-center gap-1.5 text-xs font-semibold text-white/40 bg-white/5 rounded-lg px-3 py-1.5 hover:bg-white/10 transition-colors"
            >
              <X size={12} /> Annuler
            </button>
          </div>
        ) : (
          <button
            onClick={startEdit}
            className="flex items-center gap-1.5 text-xs font-semibold text-gold bg-gold/10 border border-gold/20 rounded-lg px-3 py-1.5 hover:bg-gold/20 transition-colors"
          >
            <Edit2 size={12} /> Modifier
          </button>
        )}
      </div>

      {/* Macros card */}
      <div className="bg-surface border border-surface-border rounded-2xl p-5 mb-5">
        <h3 className="text-white/35 text-xs uppercase tracking-widest font-semibold mb-4">Objectifs quotidiens</h3>

        {isEditing ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { key: 'calories', label: 'Calories', unit: 'kcal' },
              { key: 'proteins', label: 'Protéines', unit: 'g' },
              { key: 'carbs', label: 'Glucides', unit: 'g' },
              { key: 'fats', label: 'Lipides', unit: 'g' },
            ].map(({ key, label, unit }) => (
              <div key={key}>
                <label className="text-white/30 text-[0.65rem] uppercase tracking-wider block mb-1.5">
                  {label} <span className="text-white/20 normal-case">({unit})</span>
                </label>
                <input
                  type="number"
                  value={data[key] || ''}
                  onChange={(e) => setField(key, Number(e.target.value) || 0)}
                  min="0"
                  placeholder="0"
                  className="w-full bg-surface-card border border-surface-border text-white rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:border-gold/40"
                />
              </div>
            ))}
          </div>
        ) : (
          <div>
            {/* Calories */}
            <div className="flex items-baseline gap-2 mb-5">
              <span className="font-display text-5xl text-gold">{(data.calories || 0).toLocaleString()}</span>
              <span className="text-white/35 text-sm">kcal / jour</span>
            </div>

            {/* Macro bars */}
            <div className="space-y-3.5">
              {MACROS.map(({ key, label, unit, kcalPer, color, text }) => {
                const p = pct(data[key] || 0, kcalPer)
                return (
                  <div key={key}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className={`font-semibold ${text}`}>{label}</span>
                      <span className="text-white/40">
                        {data[key] || 0}{unit} &nbsp;·&nbsp; {p}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${p}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Notes */}
      {(isEditing || data.notes) && (
        <div className="bg-surface border border-surface-border rounded-2xl p-4 mb-5">
          <h3 className="text-white/35 text-xs uppercase tracking-widest font-semibold mb-2">Notes nutritionnelles</h3>
          {isEditing ? (
            <textarea
              value={data.notes || ''}
              onChange={(e) => setField('notes', e.target.value)}
              rows={2}
              placeholder="Conseils, exceptions, jours de cheat..."
              className="w-full bg-surface-card border border-surface-border text-white rounded-xl px-3.5 py-3 text-sm placeholder-white/20 focus:outline-none focus:border-gold/40 resize-none"
            />
          ) : (
            <p className="text-white/55 text-sm leading-relaxed">{data.notes}</p>
          )}
        </div>
      )}

      {/* Meals */}
      <div className="space-y-3">
        {(data.meals || []).map((meal, i) => (
          <div key={meal.id} className="bg-surface border border-surface-border rounded-2xl p-4">
            {isEditing ? (
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-white/20 text-xs font-bold w-5 flex-shrink-0">{i + 1}</span>
                  <input
                    type="text"
                    value={meal.name}
                    onChange={(e) => setMeal(meal.id, 'name', e.target.value)}
                    placeholder="Nom du repas"
                    className="flex-1 bg-surface-card border border-surface-border text-white font-semibold rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:border-gold/40"
                  />
                  <input
                    type="time"
                    value={meal.time}
                    onChange={(e) => setMeal(meal.id, 'time', e.target.value)}
                    className="bg-surface-card border border-surface-border text-white/60 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:border-gold/40"
                  />
                  <button
                    onClick={() => removeMeal(meal.id)}
                    className="text-red-400/40 hover:text-red-400 transition-colors flex-shrink-0"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <textarea
                  value={meal.content}
                  onChange={(e) => setMeal(meal.id, 'content', e.target.value)}
                  rows={2}
                  placeholder="Contenu du repas (aliments, quantités...)"
                  className="w-full bg-surface-card border border-surface-border text-white/70 rounded-xl px-3 py-2.5 text-sm placeholder-white/20 focus:outline-none focus:border-gold/40 resize-none"
                />
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-white/20 text-xs font-bold">{i + 1}</span>
                    <p className="text-white font-semibold text-sm">{meal.name}</p>
                  </div>
                  <span className="text-gold text-xs font-semibold">{meal.time}</span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{meal.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {isEditing && (
        <button
          onClick={addMeal}
          className="mt-3 w-full border border-dashed border-surface-border rounded-2xl py-4 text-white/25 hover:text-white/60 hover:border-white/15 transition-colors text-sm font-medium flex items-center justify-center gap-2"
        >
          <Plus size={15} /> Ajouter un repas
        </button>
      )}
    </div>
  )
}
