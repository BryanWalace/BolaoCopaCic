import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where, doc, setDoc, serverTimestamp, Timestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { Bet, Winner } from '../types'
import toast from 'react-hot-toast'
import { isToday } from 'date-fns'

export function useBets(profileId: string | null) {
  const [bets, setBets] = useState<Bet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!profileId) {
      setBets([])
      setLoading(false)
      return
    }
    const q = query(collection(db, 'bets'), where('profileId', '==', profileId))
    const unsub = onSnapshot(q, (snap) => {
      setBets(snap.docs.map(d => ({ id: d.id, ...d.data() } as Bet)))
      setLoading(false)
    })
    return unsub
  }, [profileId])

  const getBetForMatch = (matchId: string): Bet | undefined =>
    bets.find(b => b.matchId === matchId)

  const saveBet = async (
    matchId: string,
    scoreA: number,
    scoreB: number,
    matchDate: Timestamp
  ) => {
    if (!profileId) return

    // Block if match already occurred on a past day
    const matchDt = matchDate.toDate()
    const isLocked = !isToday(matchDt) && matchDt.getTime() <= Date.now()

    if (isLocked) {
      toast.error('Jogo já encerrado — palpite bloqueado 🔒')
      return
    }

    const winner: Winner = scoreA > scoreB ? 'A' : scoreB > scoreA ? 'B' : 'draw'
    const betId = `${profileId}_${matchId}`
    const existing = getBetForMatch(matchId)

    try {
      await setDoc(doc(db, 'bets', betId), {
        profileId,
        matchId,
        scoreA,
        scoreB,
        winner,
        updatedAt: serverTimestamp(),
        createdAt: existing?.createdAt ?? serverTimestamp(),
      })
      toast.success('Palpite salvo ✓', { duration: 2000 })
    } catch (err) {
      console.error(err)
      toast.error('Erro ao salvar palpite')
    }
  }

  return { bets, loading, getBetForMatch, saveBet }
}

// Hook for all bets (used for ranking)
export function useAllBets() {
  const [bets, setBets] = useState<Bet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'bets'), (snap) => {
      setBets(snap.docs.map(d => ({ id: d.id, ...d.data() } as Bet)))
      setLoading(false)
    })
    return unsub
  }, [])

  return { bets, loading }
}
