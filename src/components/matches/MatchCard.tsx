import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Match, Bet } from '../../types'
import { useBets } from '../../hooks/useBets'

interface Props {
  match: Match
  profileId: string | null
  isEditingBets?: boolean
}


const phaseColors: Record<string, string> = {
  'Grupo A': 'bg-usa-red/20 text-usa-red',
  'Grupo B': 'bg-usa-blue/20 text-blue-400',
  'Grupo C': 'bg-mex-green/20 text-mex-green',
  'Grupo D': 'bg-purple-500/20 text-purple-400',
  'Grupo E': 'bg-yellow-500/20 text-yellow-400',
  'Grupo F': 'bg-pink-500/20 text-pink-400',
  'Grupo G': 'bg-cyan-500/20 text-cyan-400',
  'Grupo H': 'bg-orange-500/20 text-orange-400',
  'Grupo I': 'bg-teal-500/20 text-teal-400',
  'Grupo J': 'bg-indigo-500/20 text-indigo-400',
  'Grupo K': 'bg-red-600/20 text-red-400',
  'Grupo L': 'bg-lime-500/20 text-lime-400',
  '32-avos de Final':   'bg-gold/10 text-gold',
  'Oitavas de Final':   'bg-gold/15 text-gold',
  'Quartas de Final':   'bg-gold/20 text-amber-400',
  'Semifinal':          'bg-gold/25 text-amber-300',
  'Disputa 3º Lugar':   'bg-amber-700/20 text-amber-500',
  'Final':              'bg-gold/30 text-gold',
}

function getWinnerFromScores(scoreA: number, scoreB: number): 'A' | 'B' | 'draw' {
  if (scoreA > scoreB) return 'A'
  if (scoreB > scoreA) return 'B'
  return 'draw'
}

interface BetInputProps {
  match: Match
  profileId: string
  existingBet?: Bet
}

function BetInputSection({ match, profileId, existingBet }: BetInputProps) {
  const matchDate = match.date.toDate()
  const hasResult = match.resultA != null && match.resultB != null
  const isLocked = hasResult || matchDate <= new Date()

  const [scoreA, setScoreA] = useState<number>(existingBet?.scoreA ?? 0)
  const [scoreB, setScoreB] = useState<number>(existingBet?.scoreB ?? 0)
  const [pickedWinner, setPickedWinner] = useState<'A' | 'B' | 'draw' | null>(
    existingBet?.winner ?? null
  )
  const [saving, setSaving] = useState(false)

  // Sync when existingBet changes
  useEffect(() => {
    if (existingBet) {
      setScoreA(existingBet.scoreA)
      setScoreB(existingBet.scoreB)
      setPickedWinner(existingBet.winner)
    }
  }, [existingBet])

  const { saveBet } = useBets(profileId)

  const handleScoreChange = (side: 'A' | 'B', val: string) => {
    const n = Math.max(0, parseInt(val) || 0)
    if (side === 'A') {
      setScoreA(n)
      setPickedWinner(getWinnerFromScores(n, scoreB))
    } else {
      setScoreB(n)
      setPickedWinner(getWinnerFromScores(scoreA, n))
    }
  }

  const handlePickWinner = (w: 'A' | 'B') => {
    if (isLocked) return
    setPickedWinner(w)
    // Adjust scores if needed
    if (w === 'A' && scoreA <= scoreB) setScoreA(scoreB + 1)
    if (w === 'B' && scoreB <= scoreA) setScoreB(scoreA + 1)
  }

  const handleSave = async () => {
    setSaving(true)
    await saveBet(match.id, scoreA, scoreB, match.date)
    setSaving(false)
  }

  return (
    <div className="mt-3 pt-3 border-t border-border-dim">
      {isLocked ? (
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <span>🔒</span>
          <span>Encerrado — palpites bloqueados</span>
          {existingBet && (
            <span className="ml-auto text-gray-400 font-semibold">
              Seu palpite: {existingBet.scoreA} × {existingBet.scoreB}
            </span>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2 flex-wrap">
          {/* Team A */}
          <button
            onClick={() => handlePickWinner('A')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-sm font-medium transition-all duration-200
              ${pickedWinner === 'A'
                ? 'bg-usa-red/20 border-usa-red text-white'
                : 'border-border-dim text-gray-400 hover:border-gray-500'
              }`}
          >
            <span>{match.flagA}</span>
            <span className="hidden sm:inline truncate max-w-16">{match.teamA.split(' ')[0]}</span>
          </button>

          {/* Scores */}
          <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
            <input
              type="number"
              min={0}
              max={99}
              value={scoreA}
              onChange={e => handleScoreChange('A', e.target.value)}
              disabled={isLocked}
              className="score-input"
            />
            <span className="text-gray-400 font-bold">×</span>
            <input
              type="number"
              min={0}
              max={99}
              value={scoreB}
              onChange={e => handleScoreChange('B', e.target.value)}
              disabled={isLocked}
              className="score-input"
            />
          </div>

          {/* Team B */}
          <button
            onClick={() => handlePickWinner('B')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-sm font-medium transition-all duration-200
              ${pickedWinner === 'B'
                ? 'bg-mex-green/20 border-mex-green text-white'
                : 'border-border-dim text-gray-400 hover:border-gray-500'
              }`}
          >
            <span className="hidden sm:inline truncate max-w-16">{match.teamB.split(' ')[0]}</span>
            <span>{match.flagB}</span>
          </button>

          {/* Empate indicator */}
          {pickedWinner === 'draw' && (
            <span className="text-xs text-gray-400 border border-border-dim rounded px-2 py-1">
              Empate
            </span>
          )}

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="ml-auto btn-primary text-sm px-3 py-1.5 disabled:opacity-60"
          >
            {saving ? '...' : 'Salvar'}
          </button>
        </div>
      )}
    </div>
  )
}

export default function MatchCard({ match, profileId, isEditingBets = false }: Props) {
  const { getBetForMatch } = useBets(profileId)
  const bet = getBetForMatch(match.id)

  const matchDate = match.date.toDate()
  const hasResult = match.resultA != null && match.resultB != null
  const isFinished = hasResult || matchDate <= new Date()

  const phaseClass = phaseColors[match.phase] ?? 'bg-gray-500/20 text-gray-400'

  // Determine bet correctness for visual feedback
  let resultIndicator = null
  if (bet && hasResult) {
    const realWinner =
      (match.resultA ?? 0) > (match.resultB ?? 0) ? 'A' :
      (match.resultB ?? 0) > (match.resultA ?? 0) ? 'B' : 'draw'

    if (bet.scoreA === match.resultA && bet.scoreB === match.resultB) {
      resultIndicator = <span className="text-gold text-xs font-bold px-2 py-0.5 bg-gold/10 rounded-full">⭐ Placar exato</span>
    } else if (bet.winner === realWinner) {
      resultIndicator = <span className="text-mex-green text-xs font-bold px-2 py-0.5 bg-mex-green/10 rounded-full">✓ Resultado certo</span>
    } else {
      resultIndicator = <span className="text-usa-red text-xs font-bold px-2 py-0.5 bg-usa-red/10 rounded-full">✗ Errou</span>
    }
  }

  return (
    <div
      className={`card p-4 transition-all duration-200 hover:border-gray-700 animate-fade-in
        ${isFinished ? 'opacity-75' : ''}`}
    >
      {/* Top row: phase + date */}
      <div className="flex items-center justify-between mb-3">
        <span className={`phase-badge ${phaseClass}`}>
          {match.phase}
        </span>
        <div className="flex items-center gap-2">
          {resultIndicator}
          <span className="text-xs text-gray-500 tabular-nums">
            {format(matchDate, "dd/MM · HH'h'mm", { locale: ptBR })}
          </span>
          {isFinished && !hasResult && <span className="text-xs text-gray-500">🔒</span>}
        </div>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between gap-3">
        {/* Team A */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-2xl flex-shrink-0">{match.flagA}</span>
          <span className="font-semibold text-white text-sm sm:text-base truncate">{match.teamA}</span>
        </div>

        {/* Score / VS */}
        <div className="flex-shrink-0 text-center">
          {hasResult ? (
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold text-white tabular-nums">{match.resultA}</span>
              <span className="text-gray-400">×</span>
              <span className="text-xl font-bold text-white tabular-nums">{match.resultB}</span>
            </div>
          ) : (
            <span className="text-gray-500 text-sm font-medium px-2">vs</span>
          )}
          {match.venue && (
            <p className="text-xs text-gray-600 mt-0.5 text-center max-w-28 truncate">{match.venue}</p>
          )}
        </div>

        {/* Team B */}
        <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
          <span className="font-semibold text-white text-sm sm:text-base truncate text-right">{match.teamB}</span>
          <span className="text-2xl flex-shrink-0">{match.flagB}</span>
        </div>
      </div>

      {/* Bet section */}
      {profileId && (
        isEditingBets ? (
          <BetInputSection match={match} profileId={profileId} existingBet={bet} />
        ) : (
          <div className="mt-3 pt-3 border-t border-border-dim flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">Palpite registrado:</span>
            {bet ? (
              <div className="flex items-center gap-1.5 bg-card-dark px-3 py-1 rounded-lg border border-border-dim">
                <span className="text-xs text-gray-400 font-semibold">{match.flagA}</span>
                <span className="text-sm font-bold text-white tabular-nums">{bet.scoreA}</span>
                <span className="text-gray-500 text-xs font-bold">×</span>
                <span className="text-sm font-bold text-white tabular-nums">{bet.scoreB}</span>
                <span className="text-xs text-gray-400 font-semibold">{match.flagB}</span>
              </div>
            ) : (
              <span className="text-xs text-gray-600 italic">Nenhum palpite para este jogo</span>
            )}
          </div>
        )
      )}

      {/* No profile selected hint */}
      {!profileId && !isFinished && (
        <p className="mt-3 pt-3 border-t border-border-dim text-xs text-gray-600 text-center">
          Selecione um perfil para ver palpites (clique) ou editar (engrenagem)
        </p>
      )}
    </div>
  )
}
