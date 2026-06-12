import { useState } from 'react'
import { Profile } from '../../types'
import ProfileModal from './ProfileModal'
import { getBrowserId } from '../../lib/browserId'

interface Props {
  profiles: Profile[]
  selectedId: string | null
  isEditingBets: boolean
  onSelect: (id: string) => void
  onStartEdit: (id: string) => void
}

export default function ProfileList({ profiles, selectedId, isEditingBets, onSelect, onStartEdit }: Props) {
  const [showCreate, setShowCreate] = useState(false)

  return (
    <>
      <div className="card p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-xl text-white tracking-wide">👥 PARTICIPANTES</h2>
          <button
            onClick={() => setShowCreate(true)}
            className="btn-primary text-sm px-3 py-1.5 flex items-center gap-1.5"
          >
            <span className="text-base leading-none">+</span>
            <span>Criar perfil</span>
          </button>
        </div>

        {profiles.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">
            Nenhum participante. Crie o primeiro perfil!
          </p>
        ) : (
          <div className="flex flex-wrap gap-2.5">
            {profiles.map(p => {
              const isSelected = p.id === selectedId
              const isEditingThis = isSelected && isEditingBets
              
              return (
                <div 
                  key={p.id} 
                  className={`flex items-center rounded-xl border transition-all duration-200 overflow-hidden
                    ${isEditingThis
                      ? 'border-green-500/50 bg-green-500/5 shadow-md shadow-green-500/5'
                      : isSelected
                      ? 'border-gold/50 bg-gold/5 shadow-md shadow-gold/5'
                      : 'border-border-dim bg-card-hover hover:border-gray-600'
                    }`}
                >
                  {/* View / Select Button */}
                  <button
                    onClick={() => onSelect(p.id)}
                    className="flex items-center gap-2 px-3 py-2 text-left hover:bg-white/5 transition-colors focus:outline-none"
                  >
                    {/* Avatar */}
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold border flex-shrink-0"
                      style={{ backgroundColor: p.color + '44', borderColor: p.color }}
                    >
                      {p.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white max-w-24 truncate">{p.name}</span>
                      <span className="text-[10px] text-gray-500 leading-none mt-0.5">
                        {isEditingThis ? 'Editando ✍️' : isSelected ? 'Ver palpites 👁️' : 'Visualizar'}
                      </span>
                    </div>
                  </button>
                  
                  {/* Divider */}
                  <div className="h-6 w-px bg-border-dim" />

                  {/* Gear button (Edit bets mode) */}
                  {(!p.browserId || p.browserId === getBrowserId()) ? (
                    <button
                      onClick={() => onStartEdit(p.id)}
                      className={`px-3 py-3 hover:bg-white/5 transition-colors flex items-center justify-center text-sm
                        ${isEditingThis ? 'text-green-400' : 'text-gray-400 hover:text-white'}`}
                      title="Editar palpites"
                    >
                      ⚙️
                    </button>
                  ) : (
                    <div
                      className="px-3 py-3 flex items-center justify-center text-sm text-gray-600 cursor-not-allowed select-none"
                      title="Apenas o criador deste perfil pode palpitar"
                    >
                      🔒
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Floating create button (mobile) */}
      <button
        onClick={() => setShowCreate(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-usa-blue hover:bg-blue-700 text-white text-2xl rounded-full shadow-2xl shadow-usa-blue/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95 lg:hidden"
        title="Criar perfil"
      >
        +
      </button>

      {/* Modals */}
      {showCreate && <ProfileModal onClose={() => setShowCreate(false)} />}
    </>
  )
}

