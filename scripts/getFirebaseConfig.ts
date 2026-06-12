import { createRequire } from 'module'
import * as path from 'path'
import { fileURLToPath } from 'url'
import https from 'https'

const require = createRequire(import.meta.url)
const { GoogleAuth } = require('google-auth-library')

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const keyFile = path.join(__dirname, '..', 'bolaocopacic-firebase-adminsdk-fbsvc-10ec5aa1a3.json')

const auth = new GoogleAuth({
  keyFile,
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
})

async function httpsGet(url: string, token: string): Promise<any> {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { Authorization: `Bearer ${token}` } }, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => { try { resolve(JSON.parse(data)) } catch(e) { resolve(data) } })
    }).on('error', reject)
  })
}

async function httpsPost(url: string, token: string, body: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const u = new URL(url)
    const req = https.request({
      hostname: u.hostname,
      path: u.pathname + u.search,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      }
    }, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => { try { resolve(JSON.parse(data)) } catch(e) { resolve(data) } })
    })
    req.on('error', reject)
    req.write(body)
    req.end()
  })
}

async function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

async function main() {
  const client = await auth.getClient()
  const tokenRes = await client.getAccessToken()
  const token = tokenRes.token!
  const projectId = 'bolaocopacic'

  console.log('⏳ Waiting 5s for app creation to complete...')
  await sleep(5000)

  // List apps
  let appsData = await httpsGet(
    `https://firebase.googleapis.com/v1beta1/projects/${projectId}/webApps`,
    token
  )
  console.log('\nApps response:', JSON.stringify(appsData, null, 2))

  if (!appsData.apps || appsData.apps.length === 0) {
    console.log('\nStill no apps. Trying to create again...')
    const createResp = await httpsPost(
      `https://firebase.googleapis.com/v1beta1/projects/${projectId}/webApps`,
      token,
      JSON.stringify({ displayName: 'Bolão Copa 2026' })
    )
    console.log('Create:', JSON.stringify(createResp, null, 2))
    await sleep(8000)
    appsData = await httpsGet(
      `https://firebase.googleapis.com/v1beta1/projects/${projectId}/webApps`,
      token
    )
    console.log('\nApps after wait:', JSON.stringify(appsData, null, 2))
  }

  if (appsData.apps && appsData.apps.length > 0) {
    const appName = appsData.apps[0].name
    const appId   = appsData.apps[0].appId
    console.log(`\nApp found: ${appId}`)

    const config = await httpsGet(
      `https://firebase.googleapis.com/v1beta1/${appName}/config`,
      token
    )
    console.log('\n✅ Firebase Web Config:')
    console.log(JSON.stringify(config, null, 2))

    if (config.apiKey) {
      console.log('\n📋 .env.local:')
      console.log(`VITE_FIREBASE_API_KEY=${config.apiKey}`)
      console.log(`VITE_FIREBASE_AUTH_DOMAIN=${config.authDomain}`)
      console.log(`VITE_FIREBASE_PROJECT_ID=${config.projectId}`)
      console.log(`VITE_FIREBASE_STORAGE_BUCKET=${config.storageBucket || ''}`)
      console.log(`VITE_FIREBASE_MESSAGING_SENDER_ID=${config.messagingSenderId}`)
      console.log(`VITE_FIREBASE_APP_ID=${config.appId}`)
    }
  }
}

main().catch(e => { console.error(e); process.exit(1) })
