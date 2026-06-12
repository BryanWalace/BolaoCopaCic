import { useState } from 'react'
import { RankingEntry } from '../../types'

interface Props {
  ranking: RankingEntry[]
  selectedProfileId: string | null
  onSelectProfile: (id: string) => void
}

const medals = ['🥇', '🥈', '🥉']
const medalColors = [
  'text-gold border-gold/30 bg-gold/5',
  'text-gray-300 border-gray-500/30 bg-gray-500/5',
  'text-amber-600 border-amber-600/30 bg-amber-600/5',
]

export default function RankingTable({ ranking, selectedProfileId, onSelectProfile }: Props) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 card mb-2 cursor-pointer lg:cursor-default select-none"
        onClick={() => setCollapsed(c => !c)}
      >
        <h2 className="font-display text-xl text-white tracking-wide flex items-center gap-2">
          🏆 <span>RANKING</span>
        </h2>
        <span className="lg:hidden text-gray-400 text-sm">{collapsed ? '▼' : '▲'}</span>
      </div>

      <div className={`space-y-1 overflow-hidden transition-all duration-300 ${collapsed ? 'max-h-0' : 'max-h-[9999px]'}`}>
        {ranking.length === 0 && (
          <div className="card px-4 py-6 text-center text-gray-500 text-sm">
            Nenhum participante ainda
          </div>
        )}

        {ranking.map((entry, idx) => {
          const isSelected = entry.profile.id === selectedProfileId
          const isMedal = idx < 3
          const colorClass = isMedal ? medalColors[idx] : ''

          return (
            <button
              key={entry.profile.id}
              onClick={() => onSelectProfile(entry.profile.id)}
              className={`w-full text-left px-3 py-2.5 rounded-xl border transition-all duration-200
                ${isSelected
                  ? 'border-gold/50 bg-gold/10 shadow-lg shadow-gold/10'
                  : `card hover:bg-card-hover hover:border-border-dim/80 ${isMedal ? colorClass : ''}`
                }`}
            >
              <div className="flex items-center gap-2.5">
                {/* Position */}
                <span className="text-sm font-bold w-6 text-center text-gray-400 flex-shrink-0">
                  {isMedal ? medals[idx] : `${idx + 1}º`}
                </span>

                {/* Avatar */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 border-2"
                  style={{
                    backgroundColor: entry.profile.color + '33',
                    borderColor: entry.profile.color,
                  }}
                >
                  {entry.profile.name.charAt(0).toUpperCase()}
                </div>

                {/* Name & Stats */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{entry.profile.name}</p>
                  <p className="text-xs text-gray-500">
                    {entry.correctResults} acertos · {entry.exactScores} exatos
                  </p>
                </div>

                {/* Points */}
                <div className="text-right flex-shrink-0">
                  <p className={`text-lg font-bold ${isMedal ? '' : 'text-white'}`}>
                    {entry.points}
                  </p>
                  <p className="text-xs text-gray-500">pts</p>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
