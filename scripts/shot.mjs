// Dev-only capture tool: node scripts/shot.mjs <outName> <url> <w> <h> [full=1] [clickSel] [extraWaitMs] [mobile=0]
import { spawn } from 'node:child_process'
import { writeFileSync, mkdirSync } from 'node:fs'
import { setTimeout as sleep } from 'node:timers/promises'

mkdirSync('shots', { recursive: true })

const [name, url, w = '1440', h = '900', full = '1', clickSel = '', extraWait = '2500', mobile = '0'] =
  process.argv.slice(2)

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const PORT = 9333

const chrome = spawn(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  `--remote-debugging-port=${PORT}`,
  `--window-size=${w},${h}`,
  'about:blank',
])

const waitReady = async () => {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`)
      const targets = await res.json()
      const page = targets.find((t) => t.type === 'page')
      if (page) return page
    } catch {}
    await sleep(400)
  }
  throw new Error('chrome not ready')
}

const target = await waitReady()
const ws = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((res, rej) => {
  ws.onopen = res
  ws.onerror = rej
})

let id = 0
const pending = new Map()
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data)
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg.result)
    pending.delete(msg.id)
  }
}
const send = (method, params = {}) =>
  new Promise((res) => {
    const mid = ++id
    pending.set(mid, res)
    ws.send(JSON.stringify({ id: mid, method, params }))
  })

await send('Page.enable')
await send('Emulation.setDeviceMetricsOverride', {
  width: Number(w),
  height: Number(h),
  deviceScaleFactor: 1,
  mobile: mobile === '1',
})
await send('Emulation.setEmulatedMedia', {
  features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
})

await send('Page.navigate', { url })
await sleep(Number(extraWait) + 2500)

if (clickSel) {
  for (const sel of clickSel.split('|')) {
    await send('Runtime.evaluate', { expression: `document.querySelector('${sel}').click()` })
    await sleep(1200)
  }
}

if (full === '1') {
  const height = (await send('Runtime.evaluate', { expression: 'document.body.scrollHeight' })).result.value
  for (let y = 0; y < height; y += 700) {
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${y})` })
    await sleep(120)
  }
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 0)' })
  await sleep(900)
}

const shot = await send('Page.captureScreenshot', {
  format: 'png',
  captureBeyondViewport: full === '1',
})
writeFileSync(`shots/${name}.png`, Buffer.from(shot.data, 'base64'))
console.log('saved', name)

ws.close()
chrome.kill()
process.exit(0)
