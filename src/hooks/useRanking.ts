import { useMemo } from 'react'
import { Profile, Match, Bet, RankingEntry } from '../types'

function calcPoints(bet: Bet, match: Match): { points: number; isExact: boolean; isCorrect: boolean } {
  if (match.resultA == null || match.resultB == null) {
    return { points: 0, isExact: false, isCorrect: false }
  }

  const realWinner =
    match.resultA > match.resultB ? 'A' :
    match.resultB > match.resultA ? 'B' : 'draw'

  const isExact = bet.scoreA === match.resultA && bet.scoreB === match.resultB
  const isCorrect = bet.winner === realWinner

  if (isExact) return { points: 3, isExact: true, isCorrect: true }
  if (isCorrect) return { points: 1, isExact: false, isCorrect: true }
  return { points: 0, isExact: false, isCorrect: false }
}

export function useRanking(profiles: Profile[], matches: Match[], bets: Bet[]): RankingEntry[] {
  return useMemo(() => {
    const matchMap = new Map<string, Match>(matches.map(m => [m.id, m]))

    const entries: RankingEntry[] = profiles.map(profile => {
      const profileBets = bets.filter(b => b.profileId === profile.id)
      let points = 0
      let correctResults = 0
      let exactScores = 0

      for (const bet of profileBets) {
        const match = matchMap.get(bet.matchId)
        if (!match) continue
        const result = calcPoints(bet, match)
        points += result.points
        if (result.isCorrect) correctResults++
        if (result.isExact) exactScores++
      }

      return { profile, points, correctResults, exactScores }
    })

    return entries.sort((a, b) =>
      b.points - a.points ||
      b.exactScores - a.exactScores ||
      b.correctResults - a.correctResults
    )
  }, [profiles, matches, bets])
}
