/**
 * Deploy Firestore security rules via REST API using service account.
 */
import { createRequire } from 'module'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { readFileSync } from 'fs'
import https from 'https'

const require = createRequire(import.meta.url)
const { GoogleAuth } = require('google-auth-library')

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const keyFile = path.join(__dirname, '..', 'bolaocopacic-firebase-adminsdk-fbsvc-10ec5aa1a3.json')

const auth = new GoogleAuth({
  keyFile,
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
})

const rulesContent = readFileSync(path.join(__dirname, '..', 'firestore.rules'), 'utf8')

async function httpsRequest(method: string, url: string, token: string, body?: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const u = new URL(url)
    const options: https.RequestOptions = {
      hostname: u.hostname,
      path: u.pathname + u.search,
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...(body ? { 'Content-Length': Buffer.byteLength(body) } : {}),
      }
    }
    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        console.log(`HTTP ${res.statusCode}`)
        try { resolve(JSON.parse(data)) } catch { resolve(data) }
      })
    })
    req.on('error', reject)
    if (body) req.write(body)
    req.end()
  })
}

async function main() {
  const client = await auth.getClient()
  const tokenRes = await client.getAccessToken()
  const token = tokenRes.token!
  const projectId = 'bolaocopacic'

  console.log('📜 Deploying Firestore security rules...\n')
  console.log('Rules content:')
  console.log(rulesContent)
  console.log()

  // Create a new ruleset
  const rulesetBody = JSON.stringify({
    source: {
      files: [{
        name: 'firestore.rules',
        content: rulesContent,
      }]
    }
  })

  const rulesetResp = await httpsRequest(
    'POST',
    `https://firebaserules.googleapis.com/v1/projects/${projectId}/rulesets`,
    token,
    rulesetBody
  )
  console.log('\nRuleset created:')
  console.log(JSON.stringify(rulesetResp, null, 2))

  if (!rulesetResp.name) {
    console.error('Failed to create ruleset')
    process.exit(1)
  }

  const rulesetName = rulesetResp.name

  // Update the Cloud Firestore release to use the new ruleset
  // Try PATCH first, then PUT
  const releaseName = `projects/${projectId}/releases/cloud.firestore`
  const releaseBody = JSON.stringify({
    release: {
      name: releaseName,
      rulesetName,
    }
  })

  // First try to get existing release
  const existingRelease = await httpsRequest(
    'GET',
    `https://firebaserules.googleapis.com/v1/${releaseName}`,
    token
  )
  console.log('\nExisting release:', JSON.stringify(existingRelease, null, 2))

  const method = existingRelease.name ? 'PATCH' : 'POST'
  const releaseUrl = existingRelease.name
    ? `https://firebaserules.googleapis.com/v1/${releaseName}`
    : `https://firebaserules.googleapis.com/v1/projects/${projectId}/releases`

  const releaseResp = await httpsRequest(method, releaseUrl, token, releaseBody)
  console.log('\nRelease updated:')
  console.log(JSON.stringify(releaseResp, null, 2))

  if (releaseResp.name) {
    console.log('\n✅ Firestore rules deployed successfully!')
  } else {
    console.log('\n⚠️  May have failed — check the response above.')
  }
}

main().catch(e => { console.error(e); process.exit(1) })
