import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { Profile } from '../types'

export function useProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, 'profiles'), orderBy('createdAt', 'asc'))
    const unsub = onSnapshot(q, (snap) => {
      setProfiles(snap.docs.map(d => ({ id: d.id, ...d.data() } as Profile)))
      setLoading(false)
    })
    return unsub
  }, [])

  return { profiles, loading }
}
