import test from 'node:test'
import assert from 'node:assert/strict'
import vm from 'node:vm'
import { readFile } from 'node:fs/promises'

const source = await readFile(new URL('../lib/client.js', import.meta.url), 'utf8')

function fixture() {
  let plugin, panel
  const effects = []
  const observers = new Set()
  const styles = []
  const document = {
    head: { appendChild(style) { styles.push(style); observers.forEach(observer => observer.notify()) } },
    createElement: () => ({ dataset: {}, remove() { const index = styles.indexOf(this); if (index !== -1) styles.splice(index, 1); observers.forEach(observer => observer.notify()) } }),
    querySelector(selector) {
      if (selector === 'style[data-plugin="ming-life"]') return styles.find(style => style.dataset.plugin === 'ming-life') || null
      if (selector === 'style[data-dsh-plugin="ming-life"]') return styles.find(style => style.dataset.dshPlugin === 'ming-life') || null
      return null
    }
  }
  class MutationObserver {
    constructor(notify) { this.notify = notify }
    observe() { observers.add(this) }
    disconnect() { observers.delete(this) }
  }
  const React = {
    createElement: (type, props, ...children) => ({ type, props, children }),
    useRef: value => ({ current: value }),
    useState: value => [value, () => {}],
    useCallback: callback => callback,
    useEffect: callback => { const cleanup = callback(); if (cleanup) effects.push(cleanup) }
  }
  vm.runInNewContext(source, {
    window: { location: { origin: 'http://local' }, addEventListener() {}, removeEventListener() {}, __ModuleLoader__: { load: spec => { plugin = spec.factory(() => React) } } },
    document, MutationObserver,
    localStorage: { getItem: () => '{}', setItem() {} },
    fetch: async () => ({ ok: true, json: async () => ({ projects: [] }) }),
    setInterval: () => 1, clearInterval() {}, setTimeout: () => 1, clearTimeout() {}
  })
  plugin.apply({
    effect: callback => { const cleanup = callback(); if (cleanup) effects.push(cleanup) },
    sessions: { list: { getSnapshot: () => ({}), subscribe: () => () => {} } },
    conversation: {},
    desktopWorkbenches: { register: (_, component) => { panel = component; return () => {} } }
  })
  return { panel: () => panel(), styles, effects, observers, removeStyles: () => {
    for (const style of [...styles]) style.remove()
  } }
}

test('workbench stylesheet is owned and restored when removed while panel is mounted', () => {
  const app = fixture()
  assert.equal(app.styles.length, 1)
  assert.equal(app.styles[0].dataset.plugin, 'ming-life')
  assert.match(app.styles[0].textContent, /\.ml-frame\{flex:1/)

  app.panel()
  app.panel()
  assert.equal(app.styles.length, 1, 'rerenders must not duplicate styles')

  // The host's other-module reload only claims style nodes without data-plugin.
  for (const style of [...app.styles].filter(style => !style.dataset.plugin)) style.remove()
  assert.equal(app.styles.length, 1, 'another module must not claim this stylesheet')

  app.removeStyles()
  assert.equal(app.styles.length, 1, 'mounted panel must restore a removed stylesheet')
  assert.equal(app.styles[0].dataset.plugin, 'ming-life')

  for (const cleanup of app.effects.reverse()) cleanup()
  assert.equal(app.styles.length, 0, 'plugin teardown must remove its stylesheet')
  assert.equal(app.observers.size, 0)
})
