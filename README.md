# Bolão Copa 2026

Site de bolão para a Copa do Mundo de 2026 (EUA, Canadá, México).

Stack: React 18 + TypeScript + Vite + Tailwind CSS + Firebase Firestore

## Setup

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar Firebase Web SDK

Acesse [Firebase Console](https://console.firebase.google.com) → Projeto `bolaocopacic` → Configurações do Projeto → Seus apps → Adicionar app Web (se não existir).

Copie o objeto `firebaseConfig` e preencha o arquivo `.env.local`:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=bolaocopacic.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=bolaocopacic
VITE_FIREBASE_STORAGE_BUCKET=bolaocopacic.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### 3. Popular os jogos no Firestore

```bash
npm run seed
```

Isso cria todos os 104 jogos da Copa 2026 na coleção `matches`.

### 4. Publicar regras do Firestore

No [Firebase Console](https://console.firebase.google.com) → Firestore → Rules, cole o conteúdo de `firestore.rules`.

Ou via CLI:
```bash
npx firebase-tools deploy --only firestore:rules
```

### 5. Rodar localmente

```bash
npm run dev
```

### 6. Build para produção

```bash
npm run build
```

A pasta `dist/` é apontada no Cloudflare Pages.

## Estrutura

```
src/
  components/
    layout/      → Header
    matches/     → MatchCard, MatchTimeline
    profiles/    → ProfileList, ProfileModal
    ranking/     → RankingTable
  hooks/         → useProfiles, useMatches, useBets, useRanking
  lib/           → firebase.ts
  pages/         → HomePage, AdminPage
  types/         → index.ts
scripts/
  seedMatches.ts → Seed dos 104 jogos
```

## Admin

Acesse `/admin` para inserir resultados oficiais dos jogos.  
O ranking é atualizado automaticamente em tempo real via Firestore.

## Sistema de pontuação

| Acerto | Pontos |
|--------|--------|
| Resultado correto (vencedor ou empate) | 1 ponto |
| Placar exato | 3 pontos |
