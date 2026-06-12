import { Timestamp } from 'firebase/firestore'

export interface Profile {
  id: string
  name: string
  color: string
  browserId?: string
  createdAt: Timestamp
}

export type Phase =
  | 'Grupo A' | 'Grupo B' | 'Grupo C' | 'Grupo D'
  | 'Grupo E' | 'Grupo F' | 'Grupo G' | 'Grupo H'
  | 'Grupo I' | 'Grupo J' | 'Grupo K' | 'Grupo L'
  | '32-avos de Final'
  | 'Oitavas de Final'
  | 'Quartas de Final'
  | 'Semifinal'
  | 'Disputa 3º Lugar'
  | 'Final'

export interface Match {
  id: string
  matchNumber: number
  teamA: string
  teamB: string
  flagA: string   // emoji
  flagB: string   // emoji
  date: Timestamp
  venue: string
  phase: Phase
  group?: string
  resultA?: number | null
  resultB?: number | null
}

export type Winner = 'A' | 'B' | 'draw'

export interface Bet {
  id: string
  profileId: string
  matchId: string
  scoreA: number
  scoreB: number
  winner: Winner
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface RankingEntry {
  profile: Profile
  points: number
  correctResults: number
  exactScores: number
}
