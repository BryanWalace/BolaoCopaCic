import { useState } from 'react'
import { useMatches } from '../hooks/useMatches'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Match } from '../types'
import toast from 'react-hot-toast'

function AdminMatchRow({ match }: { match: Match }) {
  const [resultA, setResultA] = useState<string>(match.resultA?.toString() ?? '')
  const [resultB, setResultB] = useState<string>(match.resultB?.toString() ?? '')
  const [saving, setSaving] = useState(false)

  const hasResult = match.resultA != null && match.resultB != null

  const handleSave = async () => {
    const a = parseInt(resultA)
    const b = parseInt(resultB)
    if (isNaN(a) || isNaN(b) || a < 0 || b < 0) {
      toast.error('Placar inválido')
      return
    }
    setSaving(true)
    try {
      await updateDoc(doc(db, 'matches', match.id), { resultA: a, resultB: b })
      toast.success(`Resultado salvo: ${match.teamA} ${a}×${b} ${match.teamB}`)
    } catch (err) {
      console.error(err)
      toast.error('Erro ao salvar resultado')
    } finally {
      setSaving(false)
    }
  }

  const handleClear = async () => {
    setSaving(true)
    try {
      await updateDoc(doc(db, 'matches', match.id), { resultA: null, resultB: null })
      setResultA('')
      setResultB('')
      toast.success('Resultado removido')
    } catch (err) {
      toast.error('Erro ao remover resultado')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="card p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3">
      {/* Match info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-500 font-medium">{match.phase}</span>
          <span className="text-gray-600">·</span>
          <span className="text-xs text-gray-500">
            {format(match.date.toDate(), "dd/MM/yyyy HH'h'mm", { locale: ptBR })}
          </span>
          {hasResult && (
            <span className="text-xs bg-mex-green/20 text-mex-green px-2 py-0.5 rounded-full">✓ Resultado registrado</span>
          )}
        </div>
        <p className="text-white font-semibold mt-1">
          {match.flagA} {match.teamA} &nbsp;vs&nbsp; {match.teamB} {match.flagB}
        </p>
        <p className="text-xs text-gray-600 mt-0.5">{match.venue}</p>
      </div>

      {/* Result inputs */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <input
          type="number"
          min={0}
          max={99}
          value={resultA}
          onChange={e => setResultA(e.target.value)}
          placeholder="—"
          className="score-input"
        />
        <span className="text-gray-400 font-bold">×</span>
        <input
          type="number"
          min={0}
          max={99}
          value={resultB}
          onChange={e => setResultB(e.target.value)}
          placeholder="—"
          className="score-input"
        />

        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary text-sm px-3 py-2 disabled:opacity-60"
        >
          {saving ? '...' : 'Salvar'}
        </button>

        {hasResult && (
          <button
            onClick={handleClear}
            disabled={saving}
            className="btn-ghost text-sm px-2 py-2 disabled:opacity-60 text-usa-red hover:text-usa-red"
            title="Limpar resultado"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [pin, setPin] = useState('')
  const [isPinVerified, setIsPinVerified] = useState(
    () => sessionStorage.getItem('admin_authenticated') === 'true'
  )
  const { matches, loading } = useMatches()
  const [filter, setFilter] = useState('')

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault()
    const correctPin = import.meta.env.VITE_ADMIN_PIN || '1234'
    if (pin === correctPin) {
      sessionStorage.setItem('admin_authenticated', 'true')
      setIsPinVerified(true)
      toast.success('Acesso liberado ✓')
    } else {
      toast.error('PIN incorreto ❌')
      setPin('')
    }
  }

  if (!isPinVerified) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="card p-6 w-full border border-gold/30 bg-card-dark shadow-xl text-center">
          <div className="text-4xl mb-4">⚙️</div>
          <h2 className="font-display text-2xl text-white tracking-wide mb-2">ÁREA ADMINISTRATIVA</h2>
          <p className="text-gray-400 text-sm mb-6">
            Insira o PIN de 4 dígitos para acessar as configurações de administrador.
          </p>

          <form onSubmit={handleVerifyPin} className="space-y-4">
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              placeholder="••••"
              value={pin}
              onChange={e => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
              className="w-32 bg-bg-dark border border-border-dim rounded-xl px-4 py-3 text-center text-2xl font-bold tracking-widest text-white focus:outline-none focus:border-gold transition-colors mx-auto block"
              autoFocus
            />

            <button
              type="submit"
              disabled={pin.length !== 4}
              className="w-full btn-primary py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    )
  }

  const filtered = matches.filter(m => {
    const q = filter.toLowerCase()
    return (
      m.teamA.toLowerCase().includes(q) ||
      m.teamB.toLowerCase().includes(q) ||
      m.phase.toLowerCase().includes(q)
    )
  })

  const withResult = matches.filter(m => m.resultA != null).length

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-5 py-5">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-3xl text-white tracking-wide">⚙️ ADMIN — RESULTADOS</h1>
        <p className="text-gray-400 text-sm mt-1">
          Insira os resultados oficiais dos jogos. O ranking é atualizado automaticamente.
        </p>
        {!loading && (
          <p className="text-xs text-gray-600 mt-1">
            {withResult} de {matches.length} jogos com resultado registrado
          </p>
        )}
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filtrar por time ou fase..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="w-full bg-card-dark border border-border-dim rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-gold transition-colors"
        />
      </div>

      {/* Matches list */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="card h-20 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(match => (
            <AdminMatchRow key={match.id} match={match} />
          ))}
          {filtered.length === 0 && (
            <p className="text-gray-500 text-center py-8">Nenhum jogo encontrado</p>
          )}
        </div>
      )}
    </div>
  )
}
