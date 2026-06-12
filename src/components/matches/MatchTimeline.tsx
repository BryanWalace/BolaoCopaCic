import { useMemo } from 'react'
import { isToday, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Match, Phase } from '../../types'
import MatchCard from './MatchCard'

interface Props {
  matches: Match[]
  profileId: string | null
  isEditingBets?: boolean
}

const PHASE_ORDER: Phase[] = [
  'Grupo A', 'Grupo B', 'Grupo C', 'Grupo D',
  'Grupo E', 'Grupo F', 'Grupo G', 'Grupo H',
  'Grupo I', 'Grupo J', 'Grupo K', 'Grupo L',
  '32-avos de Final',
  'Oitavas de Final',
  'Quartas de Final',
  'Semifinal',
  'Disputa 3º Lugar',
  'Final',
]

const PHASE_LABELS: Record<string, string> = {
  'Grupo A': '⚽ Fase de Grupos',
  'Grupo B': '⚽ Fase de Grupos',
  'Grupo C': '⚽ Fase de Grupos',
  'Grupo D': '⚽ Fase de Grupos',
  'Grupo E': '⚽ Fase de Grupos',
  'Grupo F': '⚽ Fase de Grupos',
  'Grupo G': '⚽ Fase de Grupos',
  'Grupo H': '⚽ Fase de Grupos',
  'Grupo I': '⚽ Fase de Grupos',
  'Grupo J': '⚽ Fase de Grupos',
  'Grupo K': '⚽ Fase de Grupos',
  'Grupo L': '⚽ Fase de Grupos',
  '32-avos de Final':   '⚡ 32-avos de Final',
  'Oitavas de Final':   '🔥 Oitavas de Final',
  'Quartas de Final':   '💥 Quartas de Final',
  'Semifinal':          '🌟 Semifinais',
  'Disputa 3º Lugar':   '🥉 Disputa 3º Lugar',
  'Final':              '🏆 Grande Final',
}

function isKnockoutPhase(phase: Phase): boolean {
  return !phase.startsWith('Grupo')
}

export default function MatchTimeline({ matches, profileId, isEditingBets = false }: Props) {
  const grouped = useMemo(() => {
    const map = new Map<string, Match[]>()
    for (const m of matches) {
      const key = m.phase
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(m)
    }
    // Sort phases
    const sorted: [Phase, Match[]][] = PHASE_ORDER
      .filter(p => map.has(p))
      .map(p => [p, map.get(p)!])
    return sorted
  }, [matches])

  // Get matches scheduled for today that don't have results yet
  const todayMatches = useMemo(() => {
    return matches
      .filter(m => {
        const matchDate = m.date.toDate()
        return isToday(matchDate) && m.resultA == null
      })
      .sort((a, b) => a.date.toMillis() - b.date.toMillis())
  }, [matches])

  // Get next 4 upcoming matches (excluding today's matches) that haven't started yet and have no results
  const upcomingMatches = useMemo(() => {
    const now = new Date()
    return matches
      .filter(m => {
        const matchDate = m.date.toDate()
        return matchDate > now && !isToday(matchDate) && m.resultA == null
      })
      .sort((a, b) => a.date.toMillis() - b.date.toMillis())
      .slice(0, 4)
  }, [matches])

  // Group consecutive group-phase entries under one banner
  const sections: Array<{ label: string; matches: Match[]; isKnockout: boolean }> = []
  let groupMatches: Match[] = []
  let groupsAdded = false

  for (const [phase, phaseMatches] of grouped) {
    if (!isKnockoutPhase(phase)) {
      groupMatches.push(...phaseMatches)
    } else {
      if (groupMatches.length > 0 && !groupsAdded) {
        sections.push({ label: '⚽ Fase de Grupos', matches: groupMatches, isKnockout: false })
        groupsAdded = true
      }
      sections.push({ label: PHASE_LABELS[phase] ?? phase, matches: phaseMatches, isKnockout: true })
    }
  }
  if (groupMatches.length > 0 && !groupsAdded) {
    sections.push({ label: '⚽ Fase de Grupos', matches: groupMatches, isKnockout: false })
  }

  if (matches.length === 0) {
    return (
      <div className="card p-12 text-center text-gray-500">
        <div className="text-4xl mb-3">⚽</div>
        <p>Nenhum jogo carregado ainda.</p>
        <p className="text-sm mt-1">Execute o script de seed para popular os jogos.</p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Today's matches grid */}
      {todayMatches.length > 0 && (
        <div className="mb-8 bg-card-dark/40 border border-gold/30 rounded-2xl p-4 sm:p-5 shadow-[0_0_15px_rgba(212,175,55,0.05)] animate-slide-up">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl animate-pulse">⚽</span>
              <h3 className="font-display text-xl text-gold tracking-wide">JOGOS DE HOJE</h3>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-gold/10 text-gold rounded-full border border-gold/20 capitalize">
              📅 {format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {todayMatches.map(match => (
              <MatchCard 
                key={match.id} 
                match={match} 
                profileId={profileId} 
                isEditingBets={isEditingBets} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming matches grid */}
      {upcomingMatches.length > 0 && (
        <div className="mb-8 bg-card-dark/40 border border-border-dim rounded-2xl p-4 sm:p-5 animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🕒</span>
            <h3 className="font-display text-xl text-gold tracking-wide">PRÓXIMOS JOGOS</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingMatches.map(match => (
              <MatchCard 
                key={match.id} 
                match={match} 
                profileId={profileId} 
                isEditingBets={isEditingBets} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Timeline */}
      {sections.map((section, sIdx) => (
        <div key={section.label + sIdx} className="mb-8">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-4 sticky top-0 z-10 bg-bg-dark/90 backdrop-blur-sm py-2">
            <div className="h-px flex-1 bg-border-dim" />
            <span className="text-sm font-display tracking-widest text-gray-400 whitespace-nowrap px-2 uppercase">
              {section.label}
            </span>
            <div className="h-px flex-1 bg-border-dim" />
          </div>

          {/* Match cards with timeline line */}
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-border-dim ml-[11px] hidden sm:block" />

            <div className="space-y-3 sm:pl-8">
              {section.matches.map(match => (
                <div key={match.id} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-8 top-4 w-2.5 h-2.5 rounded-full bg-border-dim border border-gray-600 hidden sm:block" />
                  <MatchCard 
                    match={match} 
                    profileId={profileId} 
                    isEditingBets={isEditingBets} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

