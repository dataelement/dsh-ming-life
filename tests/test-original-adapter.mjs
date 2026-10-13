import test from 'node:test'
import assert from 'node:assert/strict'
import vm from 'node:vm'
import { readFile } from 'node:fs/promises'
const source = await readFile(new URL('../lib/client.js', import.meta.url), 'utf8')
const tick = () => new Promise(resolve => setImmediate(resolve))
function sessionSnapshot(mode, current) {
  if (mode === 'legacy') return { current }
  const byId = { other: { retainedBy: { mainView: 0 } } }
  if (current) byId[current] = { retainedBy: { mainView: 1 } }
  return { ids: Object.keys(byId), byId }
}
function fixture({ mode = 'legacy', projects = [], stored = new Map(), savedSession = '' } = {}) {
  let plugin, draft = '', current = null, ready = true, resultSession = 's1', ensureWait
  const calls = [], timers = [], listeners = new Set()
  const snapshots = { state: { active: 'dataelement/dsh-ming-life', added: ['dataelement/dsh-ming-life'], sessionBindings: {} } }
  const input = { state: { getSnapshot: () => ({ draft, phase: 'plain', occurrences: [] }) }, setDraft: text => { draft = text; calls.push(['draft', text]) }, submit: async () => { calls.push(['submit', draft]); draft = '' } }
  const ctx = { effect: fn => fn(), sessions: { list: { getSnapshot: () => sessionSnapshot(mode, current), subscribe: fn => { listeners.add(fn); return () => listeners.delete(fn) } }, scope: () => ({ get: () => ready ? { input: { for: () => input } } : null }) },
    desktopWorkbenches: { getSnapshot: () => snapshots, isActive: () => snapshots.state.active === 'dataelement/dsh-ming-life', ownsSession: id => snapshots.state.sessionBindings[id] === 'dataelement/dsh-ming-life', register: (descriptor) => { calls.push(['register', descriptor.title]); return () => {} }, ensureSession: async args => {
      calls.push(['ensure', args]); if (ensureWait) await ensureWait
      snapshots.state.sessionBindings[resultSession] = 'dataelement/dsh-ming-life'; current = resultSession; return resultSession
    } }
  }
  if (mode === 'service') ctx.desktopWorkbenches.currentSession = () => current || undefined
  vm.runInNewContext(source, {
    window: { location: { origin: 'http://local' }, __ModuleLoader__: { load: spec => { plugin = spec.factory(() => ({ createElement() {} })) } } },
    document: { createElement: () => ({ dataset: {} }), head: { appendChild() {} }, querySelector: () => null },
    localStorage: { getItem: key => stored.get(key) || '{}', setItem: (key, value) => { stored.set(key, value) } },
    fetch: async (url, options) => { if (options) calls.push(['post', JSON.parse(options.body)]); return { ok: true, json: async () => url.endsWith('/projects') ? { projects } : { folder: '/profiles/A', profile: { name: 'A', sessionId: savedSession } } } },
    setTimeout: fn => { timers.push(fn); return 1 }, clearTimeout() {}, setInterval: () => 1, clearInterval() {}
  })
  plugin.apply(ctx)
  return { plugin, calls, snapshots, input, timers, draft: () => draft, setDraft: value => { draft = value }, ready: value => { ready = value }, current: value => { current = value; listeners.forEach(fn => fn()) }, resultSession: value => { resultSession = value }, wait: promise => { ensureWait = promise },
    project: () => JSON.parse(stored.get('dsh.ming-life.v1') || '{}').project }
}
test('original creation automatically ensures folder session, saves original binding, then fills onboarding only', async () => {
  const c = fixture(); await c.plugin.openProject('A'); await tick()
  const ensure = c.calls.find(row => row[0] === 'ensure')[1]
  assert.equal(Object.hasOwn(ensure, 'workbenchId'), false); assert.equal(ensure.folder, '/profiles/A')
  assert.deepEqual(c.calls.filter(row => row[0] === 'post').map(row => ({ ...row[1] })), [{ project: 'A', type: 'bind-session', sessionId: 's1' }])
  assert.match(c.draft(), /按回车发送/)
  assert.equal(c.calls.filter(row => row[0] === 'submit').length, 0)
  assert.ok(c.calls.findIndex(row => row[0] === 'post') < c.calls.findIndex(row => row[0] === 'draft'))
})
test('business selection does not await native session creation', async () => {
  const c = fixture(); let release; c.wait(new Promise(r => { release = r }))
  await c.plugin.openProject('A')
  assert.equal(c.draft(), '')
  release(); await tick(); assert.match(c.draft(), /按回车发送/)
})
test('input readiness failure retains onboarding and fills it once when scope is ready', async () => {
  const c = fixture(); c.ready(false); await c.plugin.openProject('A'); await tick()
  assert.equal(c.draft(), '')
  c.ready(true); c.plugin.flushPending(); const first = c.draft(); assert.match(first, /按回车发送/)
  c.plugin.flushPending(); assert.equal(c.draft(), first)
})
test('restoring an original saved session does not create another onboarding', async () => {
  const c = fixture(); await c.plugin.openProject('A'); await tick(); c.setDraft('')
  await c.plugin.ensureSession('A', { folder: '/profiles/A', profile: { name: 'A', sessionId: 's1' } })
  assert.equal(c.calls.filter(row => row[0] === 'post').length, 1)
  assert.equal(c.draft(), '')
})
test('original auto interpretation submits on the owned session, with untouched onboarding', async () => {
  const c = fixture(); await c.plugin.openProject('A'); await tick()
  const action = c.plugin.sendNow('s1', '【自动解读】', 'A')
  await c.timers.shift()(); await action
  const submitted = c.calls.find(row => row[0] === 'submit')[1]
  assert.match(submitted, /按回车发送/); assert.match(submitted, /【自动解读】/)
})
test('automatic interpretation waits instead of submitting unrelated user draft', async () => {
  const c = fixture(); c.setDraft('用户自己写的草稿'); await c.plugin.openProject('A'); await tick()
  const action = c.plugin.sendNow('s1', '自动解读内容', 'A')
  assert.equal(c.timers.length, 0); assert.equal(c.calls.filter(row => row[0] === 'submit').length, 0)
  assert.match(c.draft(), /^用户自己写的草稿\n\n/)
  c.setDraft(''); c.plugin.flushPending(); await c.timers.shift()(); await action
  assert.equal(c.calls.find(row => row[0] === 'submit')[1], '自动解读内容')
})
test('switching during send delay cannot submit to a hidden workbench or another session', async () => {
  const c = fixture(); await c.plugin.openProject('A'); await tick()
  const action = c.plugin.sendNow('s1', '自动解读内容', 'A')
  c.snapshots.state.active = 'another'; await c.timers.shift()()
  assert.equal(c.calls.filter(row => row[0] === 'submit').length, 0)
  c.snapshots.state.active = 'dataelement/dsh-ming-life'; c.plugin.flushPending(); await c.timers.shift()(); await action
  assert.equal(c.calls.filter(row => row[0] === 'submit').length, 1)
})
for (const mode of ['service', 'retained', 'legacy']) {
  test(`[${mode}] current session gates workbench actions`, async () => {
    const c = fixture({ mode }); await c.plugin.openProject('A'); await tick()
    assert.equal(c.plugin.currentSessionId(), 's1')
    assert.equal(c.plugin.activeSession('s1', 'A'), true)
    c.current('other')
    assert.equal(c.plugin.currentSessionId(), 'other')
    assert.equal(c.plugin.activeSession('s1', 'A'), false)
    c.current(null)
    assert.equal(c.plugin.currentSessionId(), null)
  })

  test(`[${mode}] panel follows the session selected in the main view`, async () => {
    const c = fixture({ mode, projects: [{ id: 'A', sessionId: 'sA' }, { id: 'B', sessionId: 'sB' }] })
    c.current('sB'); await tick(); await tick()
    assert.equal(c.project(), 'B')
    c.current('sA')
    assert.equal(c.project(), 'A')
  })
}
test('adapter keeps original auto-interpretation components and guards iframe source', async () => {
  const originalApp = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8')
  const interpretation = await readFile(new URL('../src/components/Interpretation.jsx', import.meta.url), 'utf8')
  assert.match(originalApp, /auto: true/); assert.match(interpretation, /requested\.add/)
  assert.match(source, /event\.source !== iframeRef\.current\?\.contentWindow/)
  assert.doesNotMatch(source, /shell\.overlay|sidebar\.footer|paddingLeft|createSession\(folder\)/)
})

test('host assets and data routes fail closed through native authentication', async () => {
  const { apply } = await import('../dsh/index.js')
  const routes = []
  apply({ effect: fn => fn(), webServer: { register: route => { routes.push(route); return () => {} } }, connection: { requestRejection: () => 401 } })
  for (const route of routes) {
    let status
    await route.handler({ method: 'GET' }, { writeHead: code => { status = code }, end() {} })
    assert.equal(status, 401)
  }
})

test('registration takes identity and displayed version from the host catalog', async () => {
  const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'))
  let descriptor
  const ctx = { effect: fn => fn(), sessions: { list: { getSnapshot: () => ({}), subscribe: () => () => {} }, scope: () => ({ get: () => null }) },
    desktopWorkbenches: { isActive: () => false, ownsSession: () => false, register: value => { descriptor = value; return () => {} } } }
  let plugin
  vm.runInNewContext(source, {
    window: { location: { origin: 'http://local' }, __ModuleLoader__: { load: spec => { plugin = spec.factory(() => ({ createElement() {} })) } } },
    document: { createElement: () => ({ dataset: {} }), head: { appendChild() {} }, querySelector: () => null },
    localStorage: { getItem: () => '{}', setItem() {} }, fetch: async () => ({ ok: true, json: async () => ({ projects: [] }) }),
    setTimeout: () => 1, clearTimeout() {}, setInterval: () => 1, clearInterval() {}
  })
  plugin.apply(ctx)
  assert.equal(Object.hasOwn(descriptor, 'version'), false)
  assert.equal(Object.hasOwn(descriptor, 'id'), false)
  assert.equal(pkg.repository.url, 'git+https://github.com/dataelement/dsh-ming-life.git')
  assert.ok(!pkg.files.includes('workbench.json'))
})

test('pending onboarding survives host reload and is delivered only once to its owned session', async () => {
  const stored = new Map()
  const first = fixture({ stored }); first.ready(false)
  await first.plugin.openProject('A'); await tick()
  assert.equal(first.draft(), '')
  const restarted = fixture({ stored, savedSession: 's1' })
  await restarted.plugin.openProject('A'); await tick()
  assert.match(restarted.draft(), /按回车发送/)
  assert.equal(restarted.calls.filter(row => row[0] === 'post').length, 0)
  restarted.setDraft(''); restarted.plugin.flushPending()
  assert.equal(restarted.draft(), '')
  assert.equal(stored.get('dsh.ming-life.initial-drafts.v2'), '[]')
})
