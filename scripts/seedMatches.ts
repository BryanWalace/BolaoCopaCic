/**
 * =============================================
 * SEED DE JOGOS — Copa do Mundo 2026
 * =============================================
 * Para rodar: npm run seed
 *
 * Este arquivo lista todos os jogos da Copa 2026.
 * Edite as datas/times aqui se necessário.
 * As datas estão em UTC (subtraia 3h para Brasília).
 * =============================================
 */

import { createRequire } from 'module'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'

const require = createRequire(import.meta.url)
const adminPkg = require('firebase-admin')
const { getFirestore, Timestamp } = require('firebase-admin/firestore')

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// --------------- FIREBASE INIT ---------------
const serviceAccount = JSON.parse(
  readFileSync(
    path.join(__dirname, '..', 'bolaocopacic-firebase-adminsdk-fbsvc-10ec5aa1a3.json'),
    'utf8'
  )
)

adminPkg.initializeApp({
  credential: adminPkg.credential.cert(serviceAccount),
})

const db = getFirestore()

// --------------- HELPERS ---------------
function ts(isoUTC: string) {
  return Timestamp.fromDate(new Date(isoUTC))
}

type Phase =
  | 'Grupo A' | 'Grupo B' | 'Grupo C' | 'Grupo D'
  | 'Grupo E' | 'Grupo F' | 'Grupo G' | 'Grupo H'
  | 'Grupo I' | 'Grupo J' | 'Grupo K' | 'Grupo L'
  | '32-avos de Final'
  | 'Oitavas de Final'
  | 'Quartas de Final'
  | 'Semifinal'
  | 'Disputa 3º Lugar'
  | 'Final'

interface MatchSeed {
  matchNumber: number
  teamA: string
  teamB: string
  flagA: string
  flagB: string
  date: ReturnType<typeof ts>
  venue: string
  phase: Phase
  group?: string
  resultA: null
  resultB: null
}

// --------------- MATCHES DATA ---------------
// All times in UTC.
// Brasília = UTC-3 | Boston/NY/Philly/Atlanta/Miami = UTC-4
// Los Angeles/Seattle/San Francisco/Vancouver = UTC-7
// Houston/Dallas/Kansas City = UTC-5
// Guadalajara/Mexico City/Monterrey = UTC-6
// Toronto = UTC-4

const matches: MatchSeed[] = [

  // ===================== 1ª RODADA =====================

  // Quinta-feira, 11 de junho de 2026
  { matchNumber: 1, phase: 'Grupo A', group: 'A', teamA: 'México', flagA: '🇲🇽', teamB: 'África do Sul', flagB: '🇿🇦', date: ts('2026-06-11T19:00:00Z'), venue: 'Cidade do México, México', resultA: null, resultB: null },
  { matchNumber: 2, phase: 'Grupo A', group: 'A', teamA: 'República da Coreia', flagA: '🇰🇷', teamB: 'República Tcheca', flagB: '🇨🇿', date: ts('2026-06-12T02:00:00Z'), venue: 'Guadalajara, México', resultA: null, resultB: null },

  // Sexta-feira, 12 de junho de 2026
  { matchNumber: 3, phase: 'Grupo B', group: 'B', teamA: 'Canadá', flagA: '🇨🇦', teamB: 'Bósnia e Herzegovina', flagB: '🇧🇦', date: ts('2026-06-12T19:00:00Z'), venue: 'Toronto, Canadá', resultA: null, resultB: null },
  { matchNumber: 4, phase: 'Grupo D', group: 'D', teamA: 'Estados Unidos', flagA: '🇺🇸', teamB: 'Paraguai', flagB: '🇵🇾', date: ts('2026-06-13T01:00:00Z'), venue: 'Los Angeles, EUA', resultA: null, resultB: null },

  // Sábado, 13 de junho de 2026
  { matchNumber: 5, phase: 'Grupo B', group: 'B', teamA: 'Catar', flagA: '🇶🇦', teamB: 'Suíça', flagB: '🇨🇭', date: ts('2026-06-13T19:00:00Z'), venue: 'Santa Clara, EUA', resultA: null, resultB: null },
  { matchNumber: 6, phase: 'Grupo C', group: 'C', teamA: 'Brasil', flagA: '🇧🇷', teamB: 'Marrocos', flagB: '🇲🇦', date: ts('2026-06-13T22:00:00Z'), venue: 'Nova York/Nova Jersey, EUA', resultA: null, resultB: null },
  { matchNumber: 7, phase: 'Grupo C', group: 'C', teamA: 'Haiti', flagA: '🇭🇹', teamB: 'Escócia', flagB: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', date: ts('2026-06-14T01:00:00Z'), venue: 'Boston, EUA', resultA: null, resultB: null },
  { matchNumber: 8, phase: 'Grupo D', group: 'D', teamA: 'Austrália', flagA: '🇦🇺', teamB: 'Turquia', flagB: '🇹🇷', date: ts('2026-06-14T04:00:00Z'), venue: 'Vancouver, Canadá', resultA: null, resultB: null },

  // Domingo, 14 de junho de 2026
  { matchNumber: 9, phase: 'Grupo E', group: 'E', teamA: 'Alemanha', flagA: '🇩🇪', teamB: 'Curaçau', flagB: '🇨🇼', date: ts('2026-06-14T17:00:00Z'), venue: 'Houston, EUA', resultA: null, resultB: null },
  { matchNumber: 10, phase: 'Grupo F', group: 'F', teamA: 'Holanda', flagA: '🇳🇱', teamB: 'Japão', flagB: '🇯🇵', date: ts('2026-06-14T20:00:00Z'), venue: 'Dallas, EUA', resultA: null, resultB: null },
  { matchNumber: 11, phase: 'Grupo E', group: 'E', teamA: 'Costa do Marfim', flagA: '🇨🇮', teamB: 'Equador', flagB: '🇪🇨', date: ts('2026-06-14T23:00:00Z'), venue: 'Filadélfia, EUA', resultA: null, resultB: null },
  { matchNumber: 12, phase: 'Grupo F', group: 'F', teamA: 'Suécia', flagA: '🇸🇪', teamB: 'Tunísia', flagB: '🇹🇳', date: ts('2026-06-15T02:00:00Z'), venue: 'Monterrey, México', resultA: null, resultB: null },

  // Segunda-feira, 15 de junho de 2026
  { matchNumber: 13, phase: 'Grupo G', group: 'G', teamA: 'Bélgica', flagA: '🇧🇪', teamB: 'Egito', flagB: '🇪🇬', date: ts('2026-06-15T19:00:00Z'), venue: 'Seattle, EUA', resultA: null, resultB: null },
  { matchNumber: 14, phase: 'Grupo H', group: 'H', teamA: 'Espanha', flagA: '🇪🇸', teamB: 'Cabo Verde', flagB: '🇨🇻', date: ts('2026-06-15T16:00:00Z'), venue: 'Atlanta, EUA', resultA: null, resultB: null },
  { matchNumber: 15, phase: 'Grupo H', group: 'H', teamA: 'Arábia Saudita', flagA: '🇸🇦', teamB: 'Uruguai', flagB: '🇺🇾', date: ts('2026-06-15T22:00:00Z'), venue: 'Miami, EUA', resultA: null, resultB: null },
  { matchNumber: 16, phase: 'Grupo G', group: 'G', teamA: 'Irã', flagA: '🇮🇷', teamB: 'Nova Zelândia', flagB: '🇳🇿', date: ts('2026-06-16T01:00:00Z'), venue: 'Los Angeles, EUA', resultA: null, resultB: null },

  // Terça-feira, 16 de junho de 2026
  { matchNumber: 17, phase: 'Grupo I', group: 'I', teamA: 'França', flagA: '🇫🇷', teamB: 'Senegal', flagB: '🇸🇳', date: ts('2026-06-16T19:00:00Z'), venue: 'Nova York/Nova Jersey, EUA', resultA: null, resultB: null },
  { matchNumber: 18, phase: 'Grupo I', group: 'I', teamA: 'Iraque', flagA: '🇮🇶', teamB: 'Noruega', flagB: '🇳🇴', date: ts('2026-06-16T22:00:00Z'), venue: 'Boston, EUA', resultA: null, resultB: null },
  { matchNumber: 19, phase: 'Grupo J', group: 'J', teamA: 'Argentina', flagA: '🇦🇷', teamB: 'Argélia', flagB: '🇩🇿', date: ts('2026-06-17T01:00:00Z'), venue: 'Kansas City, EUA', resultA: null, resultB: null },
  { matchNumber: 20, phase: 'Grupo J', group: 'J', teamA: 'Áustria', flagA: '🇦🇹', teamB: 'Jordânia', flagB: '🇯🇴', date: ts('2026-06-17T04:00:00Z'), venue: 'Santa Clara, EUA', resultA: null, resultB: null },

  // Quarta-feira, 17 de junho de 2026
  { matchNumber: 21, phase: 'Grupo K', group: 'K', teamA: 'Portugal', flagA: '🇵🇹', teamB: 'Rep. Dem. do Congo', flagB: '🇨🇩', date: ts('2026-06-17T17:00:00Z'), venue: 'Houston, EUA', resultA: null, resultB: null },
  { matchNumber: 22, phase: 'Grupo L', group: 'L', teamA: 'Inglaterra', flagA: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', teamB: 'Croácia', flagB: '🇭🇷', date: ts('2026-06-17T20:00:00Z'), venue: 'Dallas, EUA', resultA: null, resultB: null },
  { matchNumber: 23, phase: 'Grupo L', group: 'L', teamA: 'Gana', flagA: '🇬🇭', teamB: 'Panamá', flagB: '🇵🇦', date: ts('2026-06-17T23:00:00Z'), venue: 'Toronto, Canadá', resultA: null, resultB: null },
  { matchNumber: 24, phase: 'Grupo K', group: 'K', teamA: 'Uzbequistão', flagA: '🇺🇿', teamB: 'Colômbia', flagB: '🇨🇴', date: ts('2026-06-18T02:00:00Z'), venue: 'Cidade do México, México', resultA: null, resultB: null },

  // ===================== 2ª RODADA =====================

  // Quinta-feira, 18 de junho de 2026
  { matchNumber: 25, phase: 'Grupo A', group: 'A', teamA: 'República Tcheca', flagA: '🇨🇿', teamB: 'África do Sul', flagB: '🇿🇦', date: ts('2026-06-18T16:00:00Z'), venue: 'Atlanta, EUA', resultA: null, resultB: null },
  { matchNumber: 26, phase: 'Grupo B', group: 'B', teamA: 'Suíça', flagA: '🇨🇭', teamB: 'Bósnia e Herzegovina', flagB: '🇧🇦', date: ts('2026-06-18T19:00:00Z'), venue: 'Los Angeles, EUA', resultA: null, resultB: null },
  { matchNumber: 27, phase: 'Grupo B', group: 'B', teamA: 'Canadá', flagA: '🇨🇦', teamB: 'Catar', flagB: '🇶🇦', date: ts('2026-06-18T22:00:00Z'), venue: 'Vancouver, Canadá', resultA: null, resultB: null },
  { matchNumber: 28, phase: 'Grupo A', group: 'A', teamA: 'México', flagA: '🇲🇽', teamB: 'República da Coreia', flagB: '🇰🇷', date: ts('2026-06-19T01:00:00Z'), venue: 'Guadalajara, México', resultA: null, resultB: null },

  // Sexta-feira, 19 de junho de 2026
  { matchNumber: 29, phase: 'Grupo D', group: 'D', teamA: 'Estados Unidos', flagA: '🇺🇸', teamB: 'Austrália', flagB: '🇦🇺', date: ts('2026-06-19T19:00:00Z'), venue: 'Seattle, EUA', resultA: null, resultB: null },
  { matchNumber: 30, phase: 'Grupo C', group: 'C', teamA: 'Escócia', flagA: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', teamB: 'Marrocos', flagB: '🇲🇦', date: ts('2026-06-19T22:00:00Z'), venue: 'Boston, EUA', resultA: null, resultB: null },
  { matchNumber: 31, phase: 'Grupo C', group: 'C', teamA: 'Brasil', flagA: '🇧🇷', teamB: 'Haiti', flagB: '🇭🇹', date: ts('2026-06-20T00:30:00Z'), venue: 'Filadélfia, EUA', resultA: null, resultB: null },
  { matchNumber: 32, phase: 'Grupo D', group: 'D', teamA: 'Turquia', flagA: '🇹🇷', teamB: 'Paraguai', flagB: '🇵🇾', date: ts('2026-06-20T03:00:00Z'), venue: 'Santa Clara, EUA', resultA: null, resultB: null },

  // Sábado, 20 de junho de 2026
  { matchNumber: 33, phase: 'Grupo F', group: 'F', teamA: 'Holanda', flagA: '🇳🇱', teamB: 'Suécia', flagB: '🇸🇪', date: ts('2026-06-20T17:00:00Z'), venue: 'Houston, EUA', resultA: null, resultB: null },
  { matchNumber: 34, phase: 'Grupo E', group: 'E', teamA: 'Alemanha', flagA: '🇩🇪', teamB: 'Costa do Marfim', flagB: '🇨🇮', date: ts('2026-06-20T20:00:00Z'), venue: 'Toronto, Canadá', resultA: null, resultB: null },
  { matchNumber: 35, phase: 'Grupo E', group: 'E', teamA: 'Equador', flagA: '🇪🇨', teamB: 'Curaçau', flagB: '🇨🇼', date: ts('2026-06-21T00:00:00Z'), venue: 'Kansas City, EUA', resultA: null, resultB: null },
  { matchNumber: 36, phase: 'Grupo F', group: 'F', teamA: 'Tunísia', flagA: '🇹🇳', teamB: 'Japão', flagB: '🇯🇵', date: ts('2026-06-21T02:00:00Z'), venue: 'Monterrey, México', resultA: null, resultB: null },

  // Domingo, 21 de junho de 2026
  { matchNumber: 37, phase: 'Grupo H', group: 'H', teamA: 'Espanha', flagA: '🇪🇸', teamB: 'Arábia Saudita', flagB: '🇸🇦', date: ts('2026-06-21T16:00:00Z'), venue: 'Atlanta, EUA', resultA: null, resultB: null },
  { matchNumber: 38, phase: 'Grupo G', group: 'G', teamA: 'Bélgica', flagA: '🇧🇪', teamB: 'Irã', flagB: '🇮🇷', date: ts('2026-06-21T19:00:00Z'), venue: 'Los Angeles, EUA', resultA: null, resultB: null },
  { matchNumber: 39, phase: 'Grupo H', group: 'H', teamA: 'Uruguai', flagA: '🇺🇾', teamB: 'Cabo Verde', flagB: '🇨🇻', date: ts('2026-06-21T22:00:00Z'), venue: 'Miami, EUA', resultA: null, resultB: null },
  { matchNumber: 40, phase: 'Grupo G', group: 'G', teamA: 'Nova Zelândia', flagA: '🇳🇿', teamB: 'Egito', flagB: '🇪🇬', date: ts('2026-06-22T01:00:00Z'), venue: 'Vancouver, Canadá', resultA: null, resultB: null },

  // Segunda-feira, 22 de junho de 2026
  { matchNumber: 41, phase: 'Grupo J', group: 'J', teamA: 'Argentina', flagA: '🇦🇷', teamB: 'Áustria', flagB: '🇦🇹', date: ts('2026-06-22T17:00:00Z'), venue: 'Dallas, EUA', resultA: null, resultB: null },
  { matchNumber: 42, phase: 'Grupo I', group: 'I', teamA: 'França', flagA: '🇫🇷', teamB: 'Iraque', flagB: '🇮🇶', date: ts('2026-06-22T21:00:00Z'), venue: 'Filadélfia, EUA', resultA: null, resultB: null },
  { matchNumber: 43, phase: 'Grupo I', group: 'I', teamA: 'Noruega', flagA: '🇳🇴', teamB: 'Senegal', flagB: '🇸🇳', date: ts('2026-06-23T00:00:00Z'), venue: 'Nova York/Nova Jersey, EUA', resultA: null, resultB: null },
  { matchNumber: 44, phase: 'Grupo J', group: 'J', teamA: 'Jordânia', flagA: '🇯🇴', teamB: 'Argélia', flagB: '🇩🇿', date: ts('2026-06-23T03:00:00Z'), venue: 'Santa Clara, EUA', resultA: null, resultB: null },

  // Terça-feira, 23 de junho de 2026
  { matchNumber: 45, phase: 'Grupo K', group: 'K', teamA: 'Portugal', flagA: '🇵🇹', teamB: 'Uzbequistão', flagB: '🇺🇿', date: ts('2026-06-23T17:00:00Z'), venue: 'Houston, EUA', resultA: null, resultB: null },
  { matchNumber: 46, phase: 'Grupo L', group: 'L', teamA: 'Inglaterra', flagA: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', teamB: 'Gana', flagB: '🇬🇭', date: ts('2026-06-23T20:00:00Z'), venue: 'Boston, EUA', resultA: null, resultB: null },
  { matchNumber: 47, phase: 'Grupo L', group: 'L', teamA: 'Panamá', flagA: '🇵🇦', teamB: 'Croácia', flagB: '🇭🇷', date: ts('2026-06-23T23:00:00Z'), venue: 'Toronto, Canadá', resultA: null, resultB: null },
  { matchNumber: 48, phase: 'Grupo K', group: 'K', teamA: 'Colômbia', flagA: '🇨🇴', teamB: 'Rep. Dem. do Congo', flagB: '🇨🇩', date: ts('2026-06-24T02:00:00Z'), venue: 'Guadalajara, México', resultA: null, resultB: null },

  // ===================== 3ª RODADA =====================

  // Quarta-feira, 24 de junho de 2026
  { matchNumber: 49, phase: 'Grupo B', group: 'B', teamA: 'Suíça', flagA: '🇨🇭', teamB: 'Canadá', flagB: '🇨🇦', date: ts('2026-06-24T19:00:00Z'), venue: 'Vancouver, Canadá', resultA: null, resultB: null },
  { matchNumber: 50, phase: 'Grupo B', group: 'B', teamA: 'Bósnia e Herzegovina', flagA: '🇧🇦', teamB: 'Catar', flagB: '🇶🇦', date: ts('2026-06-24T19:00:00Z'), venue: 'Seattle, EUA', resultA: null, resultB: null },
  { matchNumber: 51, phase: 'Grupo C', group: 'C', teamA: 'Escócia', flagA: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', teamB: 'Brasil', flagB: '🇧🇷', date: ts('2026-06-24T22:00:00Z'), venue: 'Miami, EUA', resultA: null, resultB: null },
  { matchNumber: 52, phase: 'Grupo C', group: 'C', teamA: 'Marrocos', flagA: '🇲🇦', teamB: 'Haiti', flagB: '🇭🇹', date: ts('2026-06-24T22:00:00Z'), venue: 'Atlanta, EUA', resultA: null, resultB: null },
  { matchNumber: 53, phase: 'Grupo A', group: 'A', teamA: 'República Tcheca', flagA: '🇨🇿', teamB: 'México', flagB: '🇲🇽', date: ts('2026-06-25T01:00:00Z'), venue: 'Cidade do México, México', resultA: null, resultB: null },
  { matchNumber: 54, phase: 'Grupo A', group: 'A', teamA: 'África do Sul', flagA: '🇿🇦', teamB: 'República da Coreia', flagB: '🇰🇷', date: ts('2026-06-25T01:00:00Z'), venue: 'Monterrey, México', resultA: null, resultB: null },

  // Quinta-feira, 25 de junho de 2026
  { matchNumber: 55, phase: 'Grupo E', group: 'E', teamA: 'Equador', flagA: '🇪🇨', teamB: 'Alemanha', flagB: '🇩🇪', date: ts('2026-06-25T20:00:00Z'), venue: 'Nova York/Nova Jersey, EUA', resultA: null, resultB: null },
  { matchNumber: 56, phase: 'Grupo E', group: 'E', teamA: 'Curaçau', flagA: '🇨🇼', teamB: 'Costa do Marfim', flagB: '🇨🇮', date: ts('2026-06-25T20:00:00Z'), venue: 'Filadélfia, EUA', resultA: null, resultB: null },
  { matchNumber: 57, phase: 'Grupo F', group: 'F', teamA: 'Japão', flagA: '🇯🇵', teamB: 'Suécia', flagB: '🇸🇪', date: ts('2026-06-25T23:00:00Z'), venue: 'Dallas, EUA', resultA: null, resultB: null },
  { matchNumber: 58, phase: 'Grupo F', group: 'F', teamA: 'Tunísia', flagA: '🇹🇳', teamB: 'Holanda', flagB: '🇳🇱', date: ts('2026-06-25T23:00:00Z'), venue: 'Kansas City, EUA', resultA: null, resultB: null },
  { matchNumber: 59, phase: 'Grupo D', group: 'D', teamA: 'Turquia', flagA: '🇹🇷', teamB: 'Estados Unidos', flagB: '🇺🇸', date: ts('2026-06-26T02:00:00Z'), venue: 'Los Angeles, EUA', resultA: null, resultB: null },
  { matchNumber: 60, phase: 'Grupo D', group: 'D', teamA: 'Paraguai', flagA: '🇵🇾', teamB: 'Austrália', flagB: '🇦🇺', date: ts('2026-06-26T02:00:00Z'), venue: 'Santa Clara, EUA', resultA: null, resultB: null },

  // Sexta-feira, 26 de junho de 2026
  { matchNumber: 61, phase: 'Grupo I', group: 'I', teamA: 'Noruega', flagA: '🇳🇴', teamB: 'França', flagB: '🇫🇷', date: ts('2026-06-26T19:00:00Z'), venue: 'Boston, EUA', resultA: null, resultB: null },
  { matchNumber: 62, phase: 'Grupo I', group: 'I', teamA: 'Senegal', flagA: '🇸🇳', teamB: 'Iraque', flagB: '🇮🇶', date: ts('2026-06-26T19:00:00Z'), venue: 'Toronto, Canadá', resultA: null, resultB: null },
  { matchNumber: 63, phase: 'Grupo H', group: 'H', teamA: 'Uruguai', flagA: '🇺🇾', teamB: 'Espanha', flagB: '🇪🇸', date: ts('2026-06-27T00:00:00Z'), venue: 'Guadalajara, México', resultA: null, resultB: null },
  { matchNumber: 64, phase: 'Grupo H', group: 'H', teamA: 'Cabo Verde', flagA: '🇨🇻', teamB: 'Arábia Saudita', flagB: '🇸🇦', date: ts('2026-06-27T00:00:00Z'), venue: 'Houston, EUA', resultA: null, resultB: null },
  { matchNumber: 65, phase: 'Grupo G', group: 'G', teamA: 'Egito', flagA: '🇪🇬', teamB: 'Irã', flagB: '🇮🇷', date: ts('2026-06-27T03:00:00Z'), venue: 'Seattle, EUA', resultA: null, resultB: null },
  { matchNumber: 66, phase: 'Grupo G', group: 'G', teamA: 'Nova Zelândia', flagA: '🇳🇿', teamB: 'Bélgica', flagB: '🇧🇪', date: ts('2026-06-27T03:00:00Z'), venue: 'Vancouver, Canadá', resultA: null, resultB: null },

  // Sábado, 27 de junho de 2026
  { matchNumber: 67, phase: 'Grupo L', group: 'L', teamA: 'Panamá', flagA: '🇵🇦', teamB: 'Inglaterra', flagB: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', date: ts('2026-06-27T21:00:00Z'), venue: 'Nova York/Nova Jersey, EUA', resultA: null, resultB: null },
  { matchNumber: 68, phase: 'Grupo L', group: 'L', teamA: 'Croácia', flagA: '🇭🇷', teamB: 'Gana', flagB: '🇬🇭', date: ts('2026-06-27T21:00:00Z'), venue: 'Filadélfia, EUA', resultA: null, resultB: null },
  { matchNumber: 69, phase: 'Grupo K', group: 'K', teamA: 'Colômbia', flagA: '🇨🇴', teamB: 'Portugal', flagB: '🇵🇹', date: ts('2026-06-27T23:30:00Z'), venue: 'Miami, EUA', resultA: null, resultB: null },
  { matchNumber: 70, phase: 'Grupo K', group: 'K', teamA: 'Rep. Dem. do Congo', flagA: '🇨🇩', teamB: 'Uzbequistão', flagB: '🇺🇿', date: ts('2026-06-27T23:30:00Z'), venue: 'Atlanta, EUA', resultA: null, resultB: null },
  { matchNumber: 71, phase: 'Grupo J', group: 'J', teamA: 'Argélia', flagA: '🇩🇿', teamB: 'Áustria', flagB: '🇦🇹', date: ts('2026-06-28T02:00:00Z'), venue: 'Kansas City, EUA', resultA: null, resultB: null },
  { matchNumber: 72, phase: 'Grupo J', group: 'J', teamA: 'Jordânia', flagA: '🇯🇴', teamB: 'Argentina', flagB: '🇦🇷', date: ts('2026-06-28T02:00:00Z'), venue: 'Dallas, EUA', resultA: null, resultB: null },

  // ===================== 32-AVOS DE FINAL =====================
  { matchNumber: 73, phase: '32-avos de Final', teamA: '2º Grupo A', flagA: '🏆', teamB: '2º Grupo B', flagB: '🏆', date: ts('2026-06-28T22:00:00Z'), venue: 'Los Angeles, EUA', resultA: null, resultB: null },
  { matchNumber: 74, phase: '32-avos de Final', teamA: '1º Grupo E', flagA: '🏆', teamB: '3º (A/B/C/D/F)', flagB: '🏆', date: ts('2026-06-29T19:00:00Z'), venue: 'Boston, EUA', resultA: null, resultB: null },
  { matchNumber: 75, phase: '32-avos de Final', teamA: '1º Grupo F', flagA: '🏆', teamB: '2º Grupo C', flagB: '🏆', date: ts('2026-06-29T22:00:00Z'), venue: 'Monterrey, México', resultA: null, resultB: null },
  { matchNumber: 76, phase: '32-avos de Final', teamA: '1º Grupo C', flagA: '🏆', teamB: '2º Grupo F', flagB: '🏆', date: ts('2026-06-30T01:00:00Z'), venue: 'Houston, EUA', resultA: null, resultB: null },
  { matchNumber: 77, phase: '32-avos de Final', teamA: '1º Grupo I', flagA: '🏆', teamB: '3º (C/D/F/G/H)', flagB: '🏆', date: ts('2026-06-30T19:00:00Z'), venue: 'Nova York/Nova Jersey, EUA', resultA: null, resultB: null },
  { matchNumber: 78, phase: '32-avos de Final', teamA: '2º Grupo E', flagA: '🏆', teamB: '2º Grupo I', flagB: '🏆', date: ts('2026-06-30T22:00:00Z'), venue: 'Dallas, EUA', resultA: null, resultB: null },
  { matchNumber: 79, phase: '32-avos de Final', teamA: '1º Grupo A', flagA: '🏆', teamB: '3º (C/E/F/H/I)', flagB: '🏆', date: ts('2026-07-01T01:00:00Z'), venue: 'Cidade do México, México', resultA: null, resultB: null },
  { matchNumber: 80, phase: '32-avos de Final', teamA: '1º Grupo L', flagA: '🏆', teamB: '3º (E/H/I/J/K)', flagB: '🏆', date: ts('2026-07-01T17:00:00Z'), venue: 'Atlanta, EUA', resultA: null, resultB: null },
  { matchNumber: 81, phase: '32-avos de Final', teamA: '1º Grupo D', flagA: '🏆', teamB: '3º (B/E/F/I/J)', flagB: '🏆', date: ts('2026-07-01T20:00:00Z'), venue: 'Santa Clara, EUA', resultA: null, resultB: null },
  { matchNumber: 82, phase: '32-avos de Final', teamA: '1º Grupo G', flagA: '🏆', teamB: '3º (A/E/H/I/J)', flagB: '🏆', date: ts('2026-07-01T23:00:00Z'), venue: 'Seattle, EUA', resultA: null, resultB: null },
  { matchNumber: 83, phase: '32-avos de Final', teamA: '2º Grupo K', flagA: '🏆', teamB: '2º Grupo L', flagB: '🏆', date: ts('2026-07-02T19:00:00Z'), venue: 'Toronto, Canadá', resultA: null, resultB: null },
  { matchNumber: 84, phase: '32-avos de Final', teamA: '1º Grupo H', flagA: '🏆', teamB: '2º Grupo J', flagB: '🏆', date: ts('2026-07-02T22:00:00Z'), venue: 'Los Angeles, EUA', resultA: null, resultB: null },
  { matchNumber: 85, phase: '32-avos de Final', teamA: '1º Grupo B', flagA: '🏆', teamB: '3º (E/F/G/I/J)', flagB: '🏆', date: ts('2026-07-03T01:00:00Z'), venue: 'Vancouver, Canadá', resultA: null, resultB: null },
  { matchNumber: 86, phase: '32-avos de Final', teamA: '1º Grupo J', flagA: '🏆', teamB: '2º Grupo H', flagB: '🏆', date: ts('2026-07-03T19:00:00Z'), venue: 'Miami, EUA', resultA: null, resultB: null },
  { matchNumber: 87, phase: '32-avos de Final', teamA: '1º Grupo K', flagA: '🏆', teamB: '3º (D/E/I/J/L)', flagB: '🏆', date: ts('2026-07-03T22:00:00Z'), venue: 'Kansas City, EUA', resultA: null, resultB: null },
  { matchNumber: 88, phase: '32-avos de Final', teamA: '2º Grupo D', flagA: '🏆', teamB: '2º Grupo G', flagB: '🏆', date: ts('2026-07-04T00:00:00Z'), venue: 'Dallas, EUA', resultA: null, resultB: null },

  // ===================== OITAVAS DE FINAL =====================
  { matchNumber: 89, phase: 'Oitavas de Final', teamA: 'Vencedor Jogo 74', flagA: '🏆', teamB: 'Vencedor Jogo 77', flagB: '🏆', date: ts('2026-07-04T17:00:00Z'), venue: 'Filadélfia, EUA', resultA: null, resultB: null },
  { matchNumber: 90, phase: 'Oitavas de Final', teamA: 'Vencedor Jogo 73', flagA: '🏆', teamB: 'Vencedor Jogo 75', flagB: '🏆', date: ts('2026-07-04T21:00:00Z'), venue: 'Houston, EUA', resultA: null, resultB: null },
  { matchNumber: 91, phase: 'Oitavas de Final', teamA: 'Vencedor Jogo 76', flagA: '🏆', teamB: 'Vencedor Jogo 78', flagB: '🏆', date: ts('2026-07-05T19:00:00Z'), venue: 'Nova York/Nova Jersey, EUA', resultA: null, resultB: null },
  { matchNumber: 92, phase: 'Oitavas de Final', teamA: 'Vencedor Jogo 79', flagA: '🏆', teamB: 'Vencedor Jogo 80', flagB: '🏆', date: ts('2026-07-05T22:00:00Z'), venue: 'Cidade do México, México', resultA: null, resultB: null },
  { matchNumber: 93, phase: 'Oitavas de Final', teamA: 'Vencedor Jogo 83', flagA: '🏆', teamB: 'Vencedor Jogo 84', flagB: '🏆', date: ts('2026-07-06T19:00:00Z'), venue: 'Dallas, EUA', resultA: null, resultB: null },
  { matchNumber: 94, phase: 'Oitavas de Final', teamA: 'Vencedor Jogo 81', flagA: '🏆', teamB: 'Vencedor Jogo 82', flagB: '🏆', date: ts('2026-07-06T22:00:00Z'), venue: 'Seattle, EUA', resultA: null, resultB: null },
  { matchNumber: 95, phase: 'Oitavas de Final', teamA: 'Vencedor Jogo 86', flagA: '🏆', teamB: 'Vencedor Jogo 88', flagB: '🏆', date: ts('2026-07-07T17:00:00Z'), venue: 'Atlanta, EUA', resultA: null, resultB: null },
  { matchNumber: 96, phase: 'Oitavas de Final', teamA: 'Vencedor Jogo 85', flagA: '🏆', teamB: 'Vencedor Jogo 87', flagB: '🏆', date: ts('2026-07-07T21:00:00Z'), venue: 'Vancouver, Canadá', resultA: null, resultB: null },

  // ===================== QUARTAS DE FINAL =====================
  { matchNumber: 97, phase: 'Quartas de Final', teamA: 'Vencedor Jogo 89', flagA: '🏆', teamB: 'Vencedor Jogo 90', flagB: '🏆', date: ts('2026-07-09T22:00:00Z'), venue: 'Boston, EUA', resultA: null, resultB: null },
  { matchNumber: 98, phase: 'Quartas de Final', teamA: 'Vencedor Jogo 93', flagA: '🏆', teamB: 'Vencedor Jogo 94', flagB: '🏆', date: ts('2026-07-10T22:00:00Z'), venue: 'Los Angeles, EUA', resultA: null, resultB: null },
  { matchNumber: 99, phase: 'Quartas de Final', teamA: 'Vencedor Jogo 91', flagA: '🏆', teamB: 'Vencedor Jogo 92', flagB: '🏆', date: ts('2026-07-12T19:00:00Z'), venue: 'Miami, EUA', resultA: null, resultB: null },
  { matchNumber: 100, phase: 'Quartas de Final', teamA: 'Vencedor Jogo 95', flagA: '🏆', teamB: 'Vencedor Jogo 96', flagB: '🏆', date: ts('2026-07-12T22:00:00Z'), venue: 'Kansas City, EUA', resultA: null, resultB: null },

  // ===================== SEMIFINAIS =====================
  { matchNumber: 101, phase: 'Semifinal', teamA: 'Vencedor Jogo 97', flagA: '🏆', teamB: 'Vencedor Jogo 98', flagB: '🏆', date: ts('2026-07-14T22:00:00Z'), venue: 'Dallas, EUA', resultA: null, resultB: null },
  { matchNumber: 102, phase: 'Semifinal', teamA: 'Vencedor Jogo 99', flagA: '🏆', teamB: 'Vencedor Jogo 100', flagB: '🏆', date: ts('2026-07-15T22:00:00Z'), venue: 'Atlanta, EUA', resultA: null, resultB: null },

  // ===================== DISPUTA 3º LUGAR =====================
  { matchNumber: 103, phase: 'Disputa 3º Lugar', teamA: 'Perdedor Jogo 101', flagA: '🥉', teamB: 'Perdedor Jogo 102', flagB: '🥉', date: ts('2026-07-18T22:00:00Z'), venue: 'Miami, EUA', resultA: null, resultB: null },

  // ===================== FINAL =====================
  { matchNumber: 104, phase: 'Final', teamA: 'Vencedor Jogo 101', flagA: '🏆', teamB: 'Vencedor Jogo 102', flagB: '🏆', date: ts('2026-07-19T22:00:00Z'), venue: 'Nova York/Nova Jersey, EUA', resultA: null, resultB: null },
]

// --------------- SEED ---------------
async function seed() {
  console.log(`\n🌱 Seeding ${matches.length} matches to Firestore...\n`)

  const batchSize = 400
  let count = 0

  for (let i = 0; i < matches.length; i += batchSize) {
    const batch = db.batch()
    const chunk = matches.slice(i, i + batchSize)

    for (const match of chunk) {
      const ref = db.collection('matches').doc(`match_${match.matchNumber.toString().padStart(3, '0')}`)
      batch.set(ref, match, { merge: true })
      count++
      console.log(`  [${count}/${matches.length}] Jogo ${match.matchNumber}: ${match.teamA} vs ${match.teamB}`)
    }

    await batch.commit()
    console.log(`\n  ✅ Batch committed\n`)
  }

  console.log(`\n🏆 Done! ${count} matches seeded successfully.\n`)
  process.exit(0)
}

seed().catch(err => {
  console.error('\n❌ Seed failed:', err)
  process.exit(1)
})
