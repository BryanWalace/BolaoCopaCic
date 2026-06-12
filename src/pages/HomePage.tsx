import { useState } from 'react'
import { useProfiles } from '../hooks/useProfiles'
import { useMatches } from '../hooks/useMatches'
import { useAllBets } from '../hooks/useBets'
import { useRanking } from '../hooks/useRanking'
import ProfileList from '../components/profiles/ProfileList'
import RankingTable from '../components/ranking/RankingTable'
import MatchTimeline from '../components/matches/MatchTimeline'
import ProfileModal from '../components/profiles/ProfileModal'
import { Profile } from '../types'
import { getBrowserId } from '../lib/browserId'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import toast from 'react-hot-toast'

export default function HomePage() {
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null)
  const [isEditingBets, setIsEditingBets] = useState<boolean>(false)
  const [editingProfileDetails, setEditingProfileDetails] = useState<Profile | null>(null)

  const { profiles, loading: loadingProfiles } = useProfiles()
  const { matches, loading: loadingMatches } = useMatches()
  const { bets } = useAllBets()
  const ranking = useRanking(profiles, matches, bets)

  const selectedProfile = profiles.find(p => p.id === selectedProfileId)

  const handleSelectProfile = (id: string) => {
    setSelectedProfileId(prev => prev === id && !isEditingBets ? null : id)
    setIsEditingBets(false)
  }

  const handleStartEdit = async (id: string) => {
    const profile = profiles.find(p => p.id === id)
    if (!profile) return

    const browserId = getBrowserId()
    if (profile.browserId && profile.browserId !== browserId) {
      toast.error('Sem permissão: este perfil pertence a outro dispositivo')
      return
    }

    if (!profile.browserId) {
      try {
        await updateDoc(doc(db, 'profiles', id), { browserId })
      } catch (err) {
        console.error('Erro ao vincular perfil:', err)
      }
    }

    setSelectedProfileId(id)
    setIsEditingBets(true)
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-3 sm:px-5 py-5">
      {/* Profile selector bar */}
      {loadingProfiles ? (
        <div className="card p-4 mb-4 text-gray-500 text-sm animate-pulse">Carregando perfis...</div>
      ) : (
        <ProfileList
          profiles={profiles}
          selectedId={selectedProfileId}
          isEditingBets={isEditingBets}
          onSelect={handleSelectProfile}
          onStartEdit={handleStartEdit}
        />
      )}

      {/* Selected profile banner */}
      {selectedProfile && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 px-4 py-3 rounded-xl border border-gold/30 bg-gold/5 animate-slide-up">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 flex-shrink-0"
              style={{ backgroundColor: selectedProfile.color + '44', borderColor: selectedProfile.color }}
            >
              {selectedProfile.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-gold font-semibold">
              {isEditingBets ? `✍️ Editando Palpites de ${selectedProfile.name}` : `👁️ Visualizando Palpites de ${selectedProfile.name}`}
            </span>
          </div>
          
          <div className="flex items-center gap-2 sm:ml-auto w-full sm:w-auto">
            {isEditingBets && (
              <button
                onClick={() => setEditingProfileDetails(selectedProfile)}
                className="text-xs text-gray-400 hover:text-white px-2.5 py-1.5 rounded-lg border border-border-dim hover:border-gray-500 transition-colors flex items-center gap-1.5"
              >
                ✏️ Editar Nome/Cor
              </button>
            )}
            <button
              onClick={() => {
                setSelectedProfileId(null)
                setIsEditingBets(false)
              }}
              className="ml-auto sm:ml-0 text-xs text-gray-400 hover:text-white px-2.5 py-1.5 rounded-lg border border-border-dim hover:border-gray-500 transition-colors"
            >
              ✕ Sair
            </button>
          </div>
        </div>
      )}

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Ranking sidebar */}
        <RankingTable
          ranking={ranking}
          selectedProfileId={selectedProfileId}
          onSelectProfile={handleSelectProfile}
        />

        {/* Timeline */}
        <main className="flex-1 min-w-0">
          {loadingMatches ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="card h-24 animate-pulse" />
              ))}
            </div>
          ) : (
            <MatchTimeline 
              matches={matches} 
              profileId={selectedProfileId} 
              isEditingBets={isEditingBets} 
            />
          )}
        </main>
      </div>

      {/* Profile Details Edit Modal */}
      {editingProfileDetails && (
        <ProfileModal
          profile={editingProfileDetails}
          onClose={() => setEditingProfileDetails(null)}
        />
      )}
    </div>
  )
}

