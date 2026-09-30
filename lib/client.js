window.__ModuleLoader__.load({ id: 'ming-life', factory: (require) => {
  const module = { exports: {} }
  const React = require('react')
  const h = React.createElement
  const STORE_KEY = 'dsh.ming-life.v1'
  const API = '/api/ming-life'

  const css = `
  .ml-btn{width:100%;height:32px;display:flex;align-items:center;gap:8px;padding:0 9px;border:0;border-radius:8px;
    background:transparent;color:var(--dsw-alias-label-primary,#17191c);font-size:12px;cursor:pointer;text-align:left}
  .ml-btn:hover{background:var(--dsw-alias-interactive-bg-hover,#f1f2f3)}
  .ml-btn[data-open="true"]{background:var(--dsw-alias-interactive-bg-hover,#eef1f0);font-weight:600}
  .ml-btn i{width:16px;flex:none;font-style:normal;text-align:center;color:#a3701a}
  .ml-btn span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .ml-panel{position:relative;height:100%;width:100%;display:flex;flex-direction:column;min-width:0;min-height:0;overflow:hidden;
    background-color:#f7f6f3;border-right:1px solid var(--dsw-alias-border-l1,#dfe1e4);box-shadow:0 0 24px rgba(20,24,28,.10);z-index:5;
    font-family:-apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif}
  @media (prefers-color-scheme:dark){ .ml-panel{background-color:#0b0a0e} }
  .ml-head{height:48px;flex:none;display:flex;align-items:center;gap:7px;padding:0 10px;
    border-bottom:1px solid var(--dsw-alias-border-l1,#dfe1e4);background-color:#fbfaf7}
  @media (prefers-color-scheme:dark){ .ml-head{background-color:#131119} }
  .ml-head strong{font-size:12px;font-weight:600;-webkit-app-region:drag;padding:6px 2px}
  .ml-head strong b{color:#a3701a;font-weight:600}
  .ml-spacer{margin-left:auto;align-self:stretch;-webkit-app-region:drag}
  .ml-picker{position:relative;min-width:0;flex:1 1 auto;max-width:320px}
  .ml-picker-btn{width:100%;height:34px;display:flex;align-items:center;gap:7px;padding:0 9px;
    border:1px solid var(--dsw-alias-border-l1,#dfe1e4);border-radius:9px;background:var(--dsw-alias-bg-base,#fff);cursor:pointer;text-align:left}
  .ml-picker-btn:hover{border-color:var(--dsw-alias-label-secondary,#8a8e91)}
  .ml-picker-btn[data-open="true"]{border-color:#a3701a;box-shadow:0 0 0 3px rgba(163,112,26,.13)}
  .ml-picker-btn b{min-width:0;flex:1;font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .ml-picker-btn small{flex:none;color:var(--dsw-alias-label-secondary,#8a8e91);font-size:10px}
  .ml-picker-btn i{flex:none;font-style:normal;width:20px;height:20px;display:flex;align-items:center;justify-content:center;border-radius:5px;
    color:var(--dsw-alias-label-secondary,#8a8e91);font-size:13px}
  .ml-menu{position:absolute;z-index:9;left:0;top:38px;width:max(300px,100%);max-height:60vh;overflow:auto;padding:5px;
    border:1px solid var(--dsw-alias-border-l1,#dfe1e4);border-radius:11px;background-color:#fff;box-shadow:0 10px 34px rgba(20,24,28,.2)}
  @media (prefers-color-scheme:dark){ .ml-menu{background-color:#17151f} }
  .ml-menu-item{width:100%;min-height:46px;display:flex;align-items:center;gap:9px;padding:7px 9px;border:0;border-radius:8px;
    background:transparent;color:inherit;cursor:pointer;text-align:left}
  .ml-menu-item:hover{background:var(--dsw-alias-interactive-bg-hover,#f1f2f3)}
  .ml-menu-item[data-current="true"]{background:rgba(163,112,26,.11)}
  .ml-menu-item .col{min-width:0;flex:1}
  .ml-menu-item b{display:block;font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .ml-menu-item small{display:block;margin-top:2px;color:var(--dsw-alias-label-secondary,#8a8e91);font-size:10px}
  .ml-menu-item .tick{flex:none;color:#a3701a;font-size:13px}
  .ml-row-acts{flex:none;display:flex;gap:2px;opacity:0}
  .ml-menu-item:hover .ml-row-acts{opacity:1}
  .ml-row-acts span{width:26px;height:26px;display:grid;place-items:center;border-radius:6px;color:var(--dsw-alias-label-secondary,#8a8e91);font-size:12px;cursor:pointer}
  .ml-row-acts span:hover{background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-primary,#17191c)}
  .ml-row-acts span[data-danger="true"]:hover{background:rgba(197,52,52,.12);color:#c53434}
  .ml-menu-sep{margin:5px 4px;border-top:1px solid var(--dsw-alias-border-l1,#dfe1e4)}
  .ml-menu-empty{padding:14px 10px;color:var(--dsw-alias-label-secondary,#8a8e91);font-size:11px;text-align:center;line-height:1.7}
  .ml-icon{width:32px;height:32px;flex:none;border:1px solid transparent;border-radius:8px;background:transparent;
    color:var(--dsw-alias-label-secondary,#6f7578);font-size:14px;line-height:1;cursor:pointer}
  .ml-icon:hover{border-color:var(--dsw-alias-border-l1,#dfe1e4);background:var(--dsw-alias-bg-base,#fff)}
  .ml-frame{flex:1;width:100%;min-height:0;border:0;background:#f7f6f3}
  @media (prefers-color-scheme:dark){ .ml-frame{background:#0b0a0e} }
  .ml-empty{flex:1;display:grid;place-items:center;padding:24px;text-align:center;color:var(--dsw-alias-label-secondary,#6f7578);font-size:12px;line-height:1.8}
  .ml-grip{position:absolute;top:0;bottom:0;right:-4px;width:9px;cursor:col-resize;z-index:6;-webkit-app-region:no-drag;touch-action:none}
  .ml-grip:hover,.ml-grip[data-drag="true"]{background:#a3701a;opacity:.35}
  .ml-ask{position:absolute;inset:0;z-index:8;display:grid;place-items:center;background:rgba(0,0,0,.45);padding:24px}
  .ml-ask-card{width:min(420px,100%);padding:16px;border:1px solid var(--dsw-alias-border-l1,#dfe1e4);border-radius:11px;background-color:#fff}
  @media (prefers-color-scheme:dark){ .ml-ask-card{background-color:#17151f} }
  .ml-ask-card h3{margin:0 0 5px;font-size:13px}
  .ml-ask-card p{margin:0 0 10px;color:var(--dsw-alias-label-secondary,#6f7578);font-size:11px;line-height:1.6}
  .ml-ask-card input{width:100%;height:32px;padding:0 9px;border:1px solid var(--dsw-alias-border-l1,#dfe1e4);border-radius:7px;background:transparent;font-size:12px;outline:0}
  .ml-ask-card input:focus{border-color:#a3701a}
  .ml-ask-actions{display:flex;justify-content:flex-end;gap:6px;margin-top:11px}
  .ml-ask-actions button{height:28px;padding:0 12px;border:1px solid var(--dsw-alias-border-l1,#dfe1e4);border-radius:7px;background:transparent;font-size:11px;cursor:pointer}
  .ml-ask-actions button[data-primary="true"]{border-color:#a3701a;background:#a3701a;color:#fff;font-weight:600}
  .ml-toast{position:absolute;z-index:60;left:50%;bottom:22px;transform:translate(-50%,10px);max-width:70vw;padding:9px 14px;
    border:1px solid var(--dsw-alias-border-l1,#dfe1e4);border-radius:8px;background:var(--dsw-alias-bg-base,#fff);
    color:var(--dsw-alias-label-primary,#17191c);font-size:12px;box-shadow:0 6px 24px rgba(20,24,28,.16);opacity:0;pointer-events:none;transition:.18s}
  .ml-toast[data-show="true"]{opacity:1;transform:translate(-50%,0)}`

  let ownedStyle = null
  let stylesActive = false
  function ensureStyles() {
    if (!stylesActive) return null
    let style = document.querySelector('style[data-plugin="ming-life"]')
    if (!style) {
      style = document.querySelector('style[data-dsh-plugin="ming-life"]')
      if (style) style.dataset.plugin = 'ming-life'
    }
    if (!style) {
      style = document.createElement('style')
      // The module loader excludes styles with data-plugin from another module's cleanup.
      style.dataset.plugin = 'ming-life'
      style.textContent = css
      document.head.appendChild(style)
    } else if (style.textContent !== css) {
      // A prior client revision may have left its style node in place.
      style.textContent = css
    }
    ownedStyle = style
    return style
  }

  let bridge = null
  let toastTimer = null
  const listeners = new Set()
  let openState = { open: false, project: null }
  let projectIndex = []
  const boundSessions = new Map()

  function toast(message) {
    let node = document.querySelector('.ml-toast')
    if (!node) { node = document.createElement('div'); node.className = 'ml-toast'; document.querySelector('.ml-panel')?.appendChild(node) }
    node.textContent = message; node.dataset.show = 'true'
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { node.dataset.show = 'false' }, 2600)
  }
  const readStore = () => { try { return JSON.parse(localStorage.getItem(STORE_KEY) || '{}') || {} } catch { return {} } }
  const writeStore = next => { try { localStorage.setItem(STORE_KEY, JSON.stringify(next)) } catch {} }
  const emit = () => listeners.forEach(fn => fn())
  const subscribe = fn => { listeners.add(fn); return () => listeners.delete(fn) }
  function setOpen(next) { openState = { ...openState, ...next }; writeStore({ ...readStore(), ...openState }); emit() }

  async function request(path, options) {
    const response = await fetch(path, options)
    const result = await response.json()
    if (!response.ok) throw new Error(result.error || `HTTP ${response.status}`)
    return result
  }
  const post = (path, body) => request(path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
  const bootstrap = slug => request(`${API}/bootstrap?project=${encodeURIComponent(slug)}`)

  const pendingOnboarding = new Map()
  const managedDrafts = new Map()
  const pendingAuto = []
  const linking = new Map()
  let submitting = false
  let suppressFollow = 0
  // Harness 0.1.6 removed `sessions.list.getSnapshot().current`. Desktop is
  // authoritative when available; the retained main-view session keeps this
  // adapter functional while the host service is still starting.
  function currentSessionId() {
    if (typeof bridge.service?.currentSession === 'function') return bridge.service.currentSession() || null
    const snapshot = bridge.sessions?.list?.getSnapshot?.()
    const byId = snapshot?.byId
    const retained = byId && Object.keys(byId).find(id => (byId[id]?.retainedBy?.mainView ?? 0) > 0)
    return retained || snapshot?.current || null
  }
  function activeSession(sessionId, project = openState.project) {
    return bridge.service.isActive() &&
      currentSessionId() === sessionId &&
      bridge.service.ownsSession(sessionId) && openState.project === project
  }
  function inputFor(sessionId) {
    const actx = bridge.sessions.scope?.(sessionId)
    const conversation = actx?.get?.('conversation')
    if (!conversation) throw new Error('对话输入正在准备，请稍候')
    return conversation.input.for(actx)
  }
  function plainInput(input) {
    const state = input.state.getSnapshot()
    if (state.occurrences?.length || (state.phase && state.phase !== 'plain')) throw new Error('请先处理原生输入中的引用或正在提交的内容')
    return state.draft || ''
  }
  function fillDraft(sessionId, prompt, project = openState.project) {
    if (!activeSession(sessionId, project)) throw new Error('工作台或会话已切换')
    const input = inputFor(sessionId)
    const current = plainInput(input)
    input.setDraft(current.trim() ? `${current}\n\n${prompt}` : prompt)
    if (!current.trim()) managedDrafts.set(sessionId, prompt)
  }
  function flushPending() {
    for (const [project, entry] of pendingOnboarding) {
      if (!activeSession(entry.sessionId, project)) continue
      try { fillDraft(entry.sessionId, entry.prompt, project); pendingOnboarding.delete(project) } catch {}
    }
    if (submitting) return
    const job = pendingAuto.find(job => activeSession(job.sessionId, job.project) && !pendingOnboarding.has(job.project))
    if (!job) return
    let input, text
    try {
      input = inputFor(job.sessionId)
      const current = plainInput(input)
      // Only the untouched plugin-authored onboarding may accompany an auto
      // interpretation. An unrelated user draft is never submitted implicitly.
      if (current.trim() && current !== managedDrafts.get(job.sessionId) && current !== job.prepared) return
      text = job.prepared || (current.trim() ? `${current}\n\n${job.prompt}` : job.prompt)
      job.prepared = text
      input.setDraft(text)
    } catch { return }
    submitting = true
    setTimeout(async () => {
      try {
        if (!activeSession(job.sessionId, job.project)) return
        let latest
        try { latest = plainInput(input) } catch { return }
        if (latest !== text) return
        if (typeof input.submit === 'function') await input.submit('queue')
        else if (input.actions?.submit) await input.actions.submit()
        else throw new Error('对话没有 submit 接口')
        pendingAuto.splice(pendingAuto.indexOf(job), 1)
        managedDrafts.delete(job.sessionId)
        job.resolve()
      } catch (error) {
        pendingAuto.splice(pendingAuto.indexOf(job), 1)
        job.reject(error)
      } finally { submitting = false }
    }, 120)
  }
  function sendNow(sessionId, prompt, project = openState.project) {
    if (!bridge.service.ownsSession(sessionId)) return Promise.reject(new Error('会话不属于当前工作台'))
    return new Promise((resolve, reject) => {
      pendingAuto.push({ sessionId, prompt, project, resolve, reject })
      flushPending()
    })
  }

  // 开场白：是草稿，用户按回车才发。第一行就说明这一点，否则面板显示「已绑定」而对话里什么都没有。
  const onboarding = result => [
    '（按回车发送这段话，DSH 才会读到这个档案）', '',
    '你已绑定到「玄学人生工作台」。',
    `档案：${result.profile.name}　文件夹：${result.folder}`,
    '先读 CONTEXT.md——它写了这个人的盘面、信号、你该怎么说话，以及「解读请求」怎么写回 profile.json。',
    '几条底线：命理在这里是看结构的读法，不是预言；不说「必然、注定」；不替我做决定；讲到不顺的地方，把顺的那一面也讲出来。',
    '', '接下来工作台会自动把带【工作台请求解读 #…】的消息发给你：回答之后按 CONTEXT.md 里的规则写回 profile.json，界面会自动显示。'
  ].join('\n')

  function projectForSession(sessionId) {
    if (!sessionId) return null
    return projectIndex.find(p => p.sessionId === sessionId)?.id || null
  }

  async function ensureSession(slug, result) {
    if (linking.has(slug)) return linking.get(slug)
    const task = (async () => {
      const saved = result.profile?.sessionId || null
      suppressFollow++
      let sessionId
      try { sessionId = await bridge.service.ensureSession({ folder: result.folder, sessionId: saved }) }
      finally { suppressFollow-- }
      boundSessions.set(slug, { sessionId, folder: result.folder })
      if (sessionId !== saved) {
        await post(`${API}/action`, { project: slug, type: 'bind-session', sessionId })
        const row = projectIndex.find(p => p.id === slug)
        if (row) row.sessionId = sessionId; else projectIndex.push({ id: slug, sessionId })
        pendingOnboarding.set(slug, { sessionId, prompt: onboarding(result) })
      }
      flushPending()
      return sessionId
    })()
    linking.set(slug, task)
    try { return await task } finally { linking.delete(slug) }
  }
  function retryCurrent() {
    const slug = openState.project
    if (!slug || !bridge.service.isActive()) return
    bootstrap(slug).then(result => ensureSession(slug, result)).catch(error => toast(`自动关联会话失败，可点击重试：${error.message}`))
  }
  async function openProject(slug) {
    // Show business data immediately; native preparation proceeds independently.
    setOpen({ open: true, project: slug })
    const result = await bootstrap(slug)
    if (openState.project === slug && bridge.service.isActive())
      void ensureSession(slug, result).catch(error => toast(`自动关联会话失败，可点击重试：${error.message}`))
    return result
  }

  /** 把工作台当前看的东西，连同用户的问题，填进右侧输入框。 */
  function askPrompt(data) {
    const c = data.context || {}
    const lines = ['我在玄学人生工作台里。']
    if (c.pageLabel) lines.push(`当前页面：${c.pageLabel}`)
    if (c.eventLabel) lines.push(`当前事件：${c.eventLabel}`)
    if (c.focusLabel) lines.push(`我正在看的是：${c.focusLabel}`)
    if (data.excerpt) lines.push('', '页面上这段话：', String(data.excerpt).slice(0, 1200))
    lines.push('', data.question || '这一条是根据什么说的？请引用盘面依据讲清楚推理链，别再编新的判断。语气留余地，不要下断言。')
    return lines.join('\n')
  }

  // ── 组件 ────────────────────────────────────────────────
  function Panel() {
    const iframeRef = React.useRef(null)
    const [state, setState] = React.useState(openState)
    const [projects, setProjects] = React.useState([])
    const [ask, setAsk] = React.useState(null)
    const [menuOpen, setMenuOpen] = React.useState(false)
    const [rename, setRename] = React.useState(null)
    const [confirmDel, setConfirmDel] = React.useState(null)

    // A host reload can remove the stylesheet while this panel is still mounted.
    React.useEffect(() => { ensureStyles() })
    React.useEffect(() => {
      const observer = typeof MutationObserver === 'function'
        ? new MutationObserver(() => ensureStyles())
        : null
      observer?.observe(document.head, { childList: true })
      return () => observer?.disconnect()
    }, [])

    React.useEffect(() => subscribe(() => setState({ ...openState })), [])

    const reload = React.useCallback(() => {
      request(`${API}/projects`).then(r => {
        setProjects(r.projects)
        projectIndex = r.projects.map(row => ({ id: row.id, sessionId: row.sessionId || '' }))
      }).catch(e => toast(e.message))
    }, [])
    React.useEffect(() => { reload() }, [reload])
    React.useEffect(() => {
      if (!menuOpen) return undefined
      const close = () => setMenuOpen(false)
      document.addEventListener('click', close); window.addEventListener('blur', close)
      return () => { document.removeEventListener('click', close); window.removeEventListener('blur', close) }
    }, [menuOpen])

    const current = projects.find(row => row.id === state.project) || null

    // iframe ↔ 面板 的消息
    React.useEffect(() => {
      const onMessage = async event => {
        if (event.origin !== window.location.origin || event.source !== iframeRef.current?.contentWindow || event.data?.project !== openState.project || !bridge.service.isActive()) return
        const data = event.data
        if (data?.type === 'dsh-ming-life:ask') {
          try {
            const result = await bootstrap(data.project)
            const sessionId = await ensureSession(data.project, result)
            if (data.auto) await sendNow(sessionId, data.question || askPrompt(data), data.project)
            else fillDraft(sessionId, askPrompt(data), data.project)
            event.source?.postMessage?.({ type: 'dsh-ming-life:ask-result', ok: true, key: data.key || '' }, event.origin)
          } catch (error) {
            event.source?.postMessage?.({ type: 'dsh-ming-life:ask-result', ok: false, error: error.message }, event.origin)
            toast(error.message)
          }
        }
        if (data?.type === 'dsh-ming-life:projects-changed') reload()
        if (data?.type === 'dsh-ming-life:whoami') {
          // 面板记住的档案不经过下拉选择也要绑上会话，否则第一次自动请求前界面一直显示「未绑定」
          if (!boundSessions.get(data.project)) {
            try { const result = await bootstrap(data.project); await ensureSession(data.project, result) } catch {}
          }
          const bound = boundSessions.get(data.project)
          event.source?.postMessage?.({
            type: 'dsh-ming-life:bound', ok: !!bound,
            detail: bound ? `已绑定会话 ${String(bound.sessionId).slice(0, 8)}… · ${bound.folder}　（右侧输入框里的开场白要按回车发出去）` : '尚未绑定会话——从上方档案下拉里重新选一次即可'
          }, event.origin)
        }
      }
      window.addEventListener('message', onMessage)
      return () => window.removeEventListener('message', onMessage)
    }, [reload])

    const submitCreate = async () => {
      const nm = String(ask.value || '').trim()
      if (!nm) return
      setAsk(null)
      try {
        const result = await post(`${API}/projects`, { name: nm })
        reload(); await openProject(result.project.id); toast('档案已创建，先在工作台里填出生信息')
      } catch (error) { toast(`创建失败：${error.message}`) }
    }

    return h('section', { className: 'ml-panel' },
      h('header', { className: 'ml-head' },
        h('strong', null, h('b', null, '玄'), '学人生工作台'),
        h('div', { className: 'ml-picker' },
          h('button', { className: 'ml-picker-btn', type: 'button', 'data-open': String(menuOpen), title: '切换档案',
            onClick: e => { e.stopPropagation(); setMenuOpen(!menuOpen); if (!menuOpen) reload() } },
            h('b', null, current ? current.name : (projects.length ? '选择档案…' : '还没有档案')),
            current ? h('small', null, current.birth) : null,
            h('i', null, menuOpen ? '▴' : '▾')),
          menuOpen ? h('div', { className: 'ml-menu', onClick: e => e.stopPropagation() },
            projects.length
              ? projects.map(row => h('button', { key: row.id, className: 'ml-menu-item', type: 'button', 'data-current': String(row.id === state.project),
                  onClick: () => { setMenuOpen(false); openProject(row.id).catch(err => toast(err.message)) } },
                  h('span', { className: 'col' }, h('b', null, row.name), h('small', null, `${row.birth} · ${row.events} 件事`)),
                  h('span', { className: 'ml-row-acts' },
                    h('span', { title: '重命名', role: 'button', onClick: e => { e.stopPropagation(); setMenuOpen(false); setRename({ id: row.id, value: row.name }) } }, '✎'),
                    h('span', { title: '删除档案', role: 'button', 'data-danger': 'true', onClick: e => { e.stopPropagation(); setMenuOpen(false); setConfirmDel(row) } }, '🗑')),
                  row.id === state.project ? h('span', { className: 'tick' }, '✓') : null))
              : h('div', { className: 'ml-menu-empty' }, '还没有档案。', h('br'), '一个人一个档案，可以给自己、家人分别建。'),
            h('div', { className: 'ml-menu-sep' }),
            h('button', { className: 'ml-menu-item', type: 'button', onClick: () => { setMenuOpen(false); setAsk({ value: '' }) } },
              h('span', { className: 'col' }, h('b', null, '＋ 新建档案'), h('small', null, '先起个名字，出生信息在工作台里填')))) : null),
        h('button', { className: 'ml-icon', type: 'button', title: '刷新档案列表', onClick: reload }, '↻'),
        h('span', { className: 'ml-spacer' }),
        h('button', { className: 'ml-icon', type: 'button', title: '重试关联会话', onClick: retryCurrent }, '↪')),
      state.project
        ? h('iframe', { ref: iframeRef, className: 'ml-frame', title: '玄学人生工作台', src: `${API}/app/?project=${encodeURIComponent(state.project)}` })
        : h('div', { className: 'ml-empty' }, '还没有打开档案。', h('br'), '点上方下拉，新建一个或选一个已有的。'),
      rename && h('div', { className: 'ml-ask', onMouseDown: e => { if (e.target === e.currentTarget) setRename(null) } },
        h('form', { className: 'ml-ask-card', onSubmit: async e => {
          e.preventDefault(); const nm = String(rename.value || '').trim(); const id = rename.id; setRename(null); if (!nm) return
          try { await post(`${API}/action`, { project: id, type: 'rename', name: nm }); reload(); toast('已重命名') } catch (error) { toast(`重命名失败：${error.message}`) } } },
          h('h3', null, '重命名档案'), h('p', null, '只改显示名称，文件夹和绑定的会话都不动。'),
          h('input', { autoFocus: true, value: rename.value, onChange: e => setRename(prev => ({ ...prev, value: e.target.value })),
            onKeyDown: e => { if (e.key === 'Escape') { e.preventDefault(); setRename(null) } } }),
          h('div', { className: 'ml-ask-actions' }, h('button', { type: 'button', onClick: () => setRename(null) }, '取消'), h('button', { type: 'submit', 'data-primary': 'true' }, '保存')))),
      confirmDel && h('div', { className: 'ml-ask', onMouseDown: e => { if (e.target === e.currentTarget) setConfirmDel(null) } },
        h('form', { className: 'ml-ask-card', onSubmit: async e => {
          e.preventDefault(); const row = confirmDel; setConfirmDel(null)
          try { await post(`${API}/projects/delete`, { project: row.id }); if (state.project === row.id) setOpen({ project: null }); reload(); toast('档案已移入回收站') } catch (error) { toast(`删除失败：${error.message}`) } } },
          h('h3', null, `删除「${confirmDel.name}」？`),
          h('p', null, '不会真的删掉文件——整个文件夹会移到数据目录下的 .trash/ 里，需要时可以手动找回。'),
          h('div', { className: 'ml-ask-actions' }, h('button', { type: 'button', onClick: () => setConfirmDel(null) }, '取消'), h('button', { type: 'submit', 'data-primary': 'true', style: { background: '#c53434', borderColor: '#c53434' } }, '删除')))),
      ask && h('div', { className: 'ml-ask', onMouseDown: e => { if (e.target === e.currentTarget) setAsk(null) } },
        h('form', { className: 'ml-ask-card', onSubmit: e => { e.preventDefault(); submitCreate() } },
          h('h3', null, '新建档案'), h('p', null, '一个人一个档案。名字只是用来区分，出生信息在工作台第一屏填。'),
          h('input', { autoFocus: true, value: ask.value, placeholder: '例如：我、小满、妈妈', onChange: e => setAsk(prev => ({ ...prev, value: e.target.value })),
            onKeyDown: e => { if (e.key === 'Escape') { e.preventDefault(); setAsk(null) } } }),
          h('div', { className: 'ml-ask-actions' }, h('button', { type: 'button', onClick: () => setAsk(null) }, '取消'), h('button', { type: 'submit', 'data-primary': 'true' }, '创建')))),
      null)
  }

  const inject = ['desktopWorkbenches', 'sessions', 'conversation']
  function apply(ctx) {
    bridge = { sessions: ctx.sessions, conversation: ctx.conversation, service: ctx.desktopWorkbenches }
    Object.assign(openState, { project: readStore().project || null, open: true })

    request(`${API}/projects`).then(r => {
      projectIndex = r.projects.map(row => ({ id: row.id, sessionId: row.sessionId || '' }))
      const slug = projectForSession(currentSessionId())
      if (slug && slug !== openState.project) setOpen({ project: slug })
    }).catch(() => {})

    // 跟着对话走：切到哪个会话，面板就切到它绑定的档案
    ctx.effect(() => {
      const list = ctx.sessions?.list
      if (!list?.getSnapshot) return () => {}
      const read = () => currentSessionId()
      let last = read()
      const check = () => { if (suppressFollow || !bridge.service.isActive()) return; const id = read(); if (id === last) return; last = id; const slug = projectForSession(id); if (slug && slug !== openState.project) setOpen({ project: slug }) }
      if (typeof list.subscribe === 'function') return list.subscribe(check)
      const timer = setInterval(check, 600)
      return () => clearInterval(timer)
    }, 'ming-life: follow the active conversation')

    ctx.effect(() => {
      stylesActive = true
      ensureStyles()
      return () => { stylesActive = false; ownedStyle?.remove(); ownedStyle = null; document.querySelector('.ml-toast')?.remove() }
    }, 'ming-life: styles')

    ctx.effect(() => ctx.desktopWorkbenches.register({
      title: '玄学人生工作台', icon: '☯', panelTitle: '人生档案',
      repository: 'https://github.com/dataelement/dsh-ming-life',
      description: '本地排盘、人生档案与原版自动解读流程。',
      author: 'dataelement / liqingb0220-stack', embedded: true,
      initialization: 'empty', layout: { businessSide: 'left', businessWidth: 0.65 }
    }, Panel))
    ctx.effect(() => {
      const timer = setInterval(flushPending, 400)
      return () => clearInterval(timer)
    })

  }

  module.exports = { inject, apply, ensureSession, openProject, fillDraft, sendNow, flushPending, activeSession, currentSessionId }
  return module.exports
} })
