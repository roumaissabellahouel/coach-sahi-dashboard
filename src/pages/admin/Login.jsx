import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Eye, EyeOff, Dumbbell } from 'lucide-react'
import { login } from '../../lib/storage'

export default function Login() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    setTimeout(() => {
      if (login(password)) {
        navigate('/admin/dashboard')
      } else {
        setError('Mot de passe incorrect.')
        setLoading(false)
      }
    }, 400)
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      {/* Background subtle grid */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#F7B731 1px, transparent 1px), linear-gradient(90deg, #F7B731 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gold/10 border border-gold/20 rounded-2xl mb-5">
            <Dumbbell size={24} className="text-gold" />
          </div>
          <h1 className="font-display text-3xl text-white tracking-widest">
            SAHI <span className="text-gold">COACHING</span>
          </h1>
          <p className="text-white/35 text-sm mt-2">Accès coach uniquement</p>
        </div>

        {/* Card */}
        <div className="bg-surface-card border border-surface-border rounded-2xl p-7">
          <h2 className="text-white font-semibold text-lg mb-6">Connexion</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/50 text-xs font-medium uppercase tracking-wider mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"
                />
                <input
                  type={show ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-surface border border-surface-border text-white rounded-xl pl-10 pr-10 py-3.5 text-sm placeholder-white/20 focus:outline-none focus:border-gold/40 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
                >
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-surface font-bold py-3.5 rounded-xl hover:bg-gold-dark active:scale-[0.98] transition-all duration-200 text-sm disabled:opacity-60"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <p className="text-white/20 text-xs text-center mt-5">
            Mot de passe par défaut : <span className="text-white/40 font-mono">coach2025</span>
          </p>
        </div>

        <p className="text-center mt-6">
          <a href="/" className="text-white/30 text-xs hover:text-white/50 transition-colors">
            ← Retour au site
          </a>
        </p>
      </div>
    </div>
  )
}
