import { useState } from 'react'
import { Plus, Trash2, Edit2, Check, X, Dumbbell } from 'lucide-react'
import { updateClient } from '../../lib/storage'

const newEx = () => ({ id: Date.now() + Math.random(), name: '', sets: 3, reps: '10-12', rest: '60s', notes: '' })
const newDay = () => ({ id: Date.now() + Math.random(), name: 'Nouveau jour', exercises: [newEx()] })

function ExRow({ ex, dayId, D }) {
  return (
    <div className="grid gap-2 items-center" style={{ gridTemplateColumns: '1fr 52px 68px 60px 24px' }}>
      <input
        type="text"
        value={ex.name}
        onChange={(e) => D.setEx(dayId, ex.id, 'name', e.target.value)}
        placeholder="Exercice"
        className="bg-surface-card border border-surface-border text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-gold/40 w-full"
      />
      <input
        type="number"
        value={ex.sets}
        onChange={(e) => D.setEx(dayId, ex.id, 'sets', Number(e.target.value) || 1)}
        min="1" max="10"
        title="Séries"
        className="bg-surface-card border border-surface-border text-white rounded-lg px-2 py-1.5 text-xs text-center focus:outline-none focus:border-gold/40 w-full"
      />
      <input
        type="text"
        value={ex.reps}
        onChange={(e) => D.setEx(dayId, ex.id, 'reps', e.target.value)}
        placeholder="Rép."
        title="Répétitions"
        className="bg-surface-card border border-surface-border text-white rounded-lg px-2 py-1.5 text-xs text-center focus:outline-none focus:border-gold/40 w-full"
      />
      <input
        type="text"
        value={ex.rest}
        onChange={(e) => D.setEx(dayId, ex.id, 'rest', e.target.value)}
        placeholder="Repos"
        title="Temps de repos"
        className="bg-surface-card border border-surface-border text-white rounded-lg px-2 py-1.5 text-xs text-center focus:outline-none focus:border-gold/40 w-full"
      />
      <button
        onClick={() => D.removeEx(dayId, ex.id)}
        className="text-red-400/40 hover:text-red-400 transition-colors flex-shrink-0"
      >
        <X size={13} />
      </button>
    </div>
  )
}

export default function TrainingProgramEditor({ client, onChange }) {
  const program = client.trainingProgram || { days: [] }
  const [draft, setDraft] = useState(null)
  const isEditing = draft !== null
  const data = isEditing ? draft : program

  const startEdit = () => setDraft(JSON.parse(JSON.stringify(program)))
  const cancel = () => setDraft(null)
  const save = () => {
    const updated = updateClient(client.id, { trainingProgram: draft })
    if (updated) onChange(updated)
    setDraft(null)
  }

  const D = {
    addDay: () => setDraft((d) => ({ ...d, days: [...d.days, newDay()] })),
    removeDay: (dayId) => setDraft((d) => ({ ...d, days: d.days.filter((day) => day.id !== dayId) })),
    setDayName: (dayId, name) =>
      setDraft((d) => ({ ...d, days: d.days.map((day) => (day.id === dayId ? { ...day, name } : day)) })),
    addEx: (dayId) =>
      setDraft((d) => ({
        ...d,
        days: d.days.map((day) =>
          day.id === dayId ? { ...day, exercises: [...day.exercises, newEx()] } : day
        ),
      })),
    removeEx: (dayId, exId) =>
      setDraft((d) => ({
        ...d,
        days: d.days.map((day) =>
          day.id === dayId ? { ...day, exercises: day.exercises.filter((ex) => ex.id !== exId) } : day
        ),
      })),
    setEx: (dayId, exId, field, val) =>
      setDraft((d) => ({
        ...d,
        days: d.days.map((day) =>
          day.id === dayId
            ? { ...day, exercises: day.exercises.map((ex) => (ex.id === exId ? { ...ex, [field]: val } : ex)) }
            : day
        ),
      })),
  }

  if (data.days.length === 0 && !isEditing) {
    return (
      <div className="text-center py-16">
        <div className="w-12 h-12 bg-white/5 border border-surface-border rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Dumbbell size={20} className="text-white/15" />
        </div>
        <p className="text-white/30 text-sm mb-4">Aucun programme d'entraînement défini</p>
        <button
          onClick={startEdit}
          className="text-gold text-sm font-semibold hover:opacity-70 transition-opacity"
        >
          + Créer le programme
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Controls */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-white/35 text-sm">
          {data.days.length} jour{data.days.length > 1 ? 's' : ''} d'entraînement
        </p>
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

      {/* Column headers in edit mode */}
      {isEditing && data.days.length > 0 && (
        <div
          className="mb-1 px-4 text-white/25 text-[0.6rem] uppercase tracking-wider font-semibold"
          style={{ display: 'grid', gridTemplateColumns: '1fr 52px 68px 60px 24px', gap: '0.5rem' }}
        >
          <span>Exercice</span>
          <span className="text-center">Séries</span>
          <span className="text-center">Rép.</span>
          <span className="text-center">Repos</span>
          <span />
        </div>
      )}

      {/* Days */}
      <div className="space-y-4">
        {data.days.map((day) => (
          <div key={day.id} className="bg-surface border border-surface-border rounded-2xl overflow-hidden">
            {/* Day header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-white/[0.02] border-b border-surface-border">
              <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
              {isEditing ? (
                <input
                  type="text"
                  value={day.name}
                  onChange={(e) => D.setDayName(day.id, e.target.value)}
                  className="flex-1 bg-transparent text-white text-sm font-semibold focus:outline-none border-b border-transparent focus:border-gold/30 pb-0.5 transition-colors"
                  placeholder="Ex: Lundi — Push"
                />
              ) : (
                <p className="text-white text-sm font-semibold flex-1">{day.name}</p>
              )}
              {isEditing && (
                <button
                  onClick={() => D.removeDay(day.id)}
                  className="text-red-400/40 hover:text-red-400 transition-colors ml-auto"
                  title="Supprimer ce jour"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>

            {/* Exercises */}
            <div className="p-4">
              {isEditing ? (
                <div className="space-y-2">
                  {day.exercises.map((ex) => (
                    <ExRow key={ex.id} ex={ex} dayId={day.id} D={D} />
                  ))}
                  {day.exercises.length === 0 && (
                    <p className="text-white/20 text-xs text-center py-2">Aucun exercice</p>
                  )}
                  <button
                    onClick={() => D.addEx(day.id)}
                    className="text-gold/50 hover:text-gold text-xs font-medium transition-colors flex items-center gap-1 pt-1"
                  >
                    <Plus size={11} /> Ajouter un exercice
                  </button>
                </div>
              ) : (
                <table className="w-full text-xs">
                  <thead>
                    <tr>
                      <th className="text-left pb-2.5 text-white/25 font-semibold uppercase tracking-wide">Exercice</th>
                      <th className="pb-2.5 text-white/25 font-semibold uppercase tracking-wide w-14 text-center">Séries</th>
                      <th className="pb-2.5 text-white/25 font-semibold uppercase tracking-wide w-16 text-center">Rép.</th>
                      <th className="pb-2.5 text-white/25 font-semibold uppercase tracking-wide w-16 text-center">Repos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {day.exercises.map((ex) => (
                      <tr key={ex.id} className="border-t border-surface-border">
                        <td className="py-2.5 text-white font-medium">{ex.name}</td>
                        <td className="py-2.5 text-center text-white/50">{ex.sets}</td>
                        <td className="py-2.5 text-center text-gold font-semibold">{ex.reps}</td>
                        <td className="py-2.5 text-center text-white/35">{ex.rest}</td>
                      </tr>
                    ))}
                    {day.exercises.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-white/20 text-center py-4">Aucun exercice</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <button
          onClick={D.addDay}
          className="mt-4 w-full border border-dashed border-surface-border rounded-2xl py-4 text-white/25 hover:text-white/60 hover:border-white/15 transition-colors text-sm font-medium flex items-center justify-center gap-2"
        >
          <Plus size={15} /> Ajouter un jour d'entraînement
        </button>
      )}
    </div>
  )
}
