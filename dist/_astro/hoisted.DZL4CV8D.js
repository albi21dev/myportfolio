const g = 'data-astro-transition-persist'
function J(e) {
  for (const t of document.scripts)
    for (const n of e.scripts)
      if (
        !n.hasAttribute('data-astro-rerun') &&
        ((!t.src && t.textContent === n.textContent) || (t.src && t.type === n.type && t.src === n.src))
      ) {
        n.dataset.astroExec = ''
        break
      }
}
function Q(e) {
  const t = document.documentElement,
    n = [...t.attributes].filter(({ name: o }) => (t.removeAttribute(o), o.startsWith('data-astro-')))
  ;[...e.documentElement.attributes, ...n].forEach(({ name: o, value: r }) => t.setAttribute(o, r))
}
function Z(e) {
  for (const t of Array.from(document.head.children)) {
    const n = ne(t, e)
    n ? n.remove() : t.remove()
  }
  document.head.append(...e.head.children)
}
function ee(e, t) {
  t.replaceWith(e)
  for (const n of t.querySelectorAll(`[${g}]`)) {
    const o = n.getAttribute(g),
      r = e.querySelector(`[${g}="${o}"]`)
    r &&
      (r.replaceWith(n),
      r.localName === 'astro-island' &&
        oe(n) &&
        (n.setAttribute('ssr', ''), n.setAttribute('props', r.getAttribute('props'))))
  }
}
const te = () => {
    const e = document.activeElement
    if (e?.closest(`[${g}]`)) {
      if (e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement) {
        const t = e.selectionStart,
          n = e.selectionEnd
        return () => R({ activeElement: e, start: t, end: n })
      }
      return () => R({ activeElement: e })
    } else return () => R({ activeElement: null })
  },
  R = ({ activeElement: e, start: t, end: n }) => {
    e &&
      (e.focus(),
      (e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement) &&
        (typeof t == 'number' && (e.selectionStart = t), typeof n == 'number' && (e.selectionEnd = n)))
  },
  ne = (e, t) => {
    const n = e.getAttribute(g),
      o = n && t.head.querySelector(`[${g}="${n}"]`)
    if (o) return o
    if (e.matches('link[rel=stylesheet]')) {
      const r = e.getAttribute('href')
      return t.head.querySelector(`link[rel=stylesheet][href="${r}"]`)
    }
    return null
  },
  oe = (e) => {
    const t = e.dataset.astroTransitionPersistProps
    return t == null || t === 'false'
  },
  re = (e) => {
    J(e), Q(e), Z(e)
    const t = te()
    ee(e.body, document.body), t()
  },
  ie = 'astro:before-preparation',
  se = 'astro:after-preparation',
  ae = 'astro:before-swap',
  ce = 'astro:after-swap',
  le = (e) => document.dispatchEvent(new Event(e))
class $ extends Event {
  from
  to
  direction
  navigationType
  sourceElement
  info
  newDocument
  signal
  constructor(t, n, o, r, i, u, a, c, f, l) {
    super(t, n),
      (this.from = o),
      (this.to = r),
      (this.direction = i),
      (this.navigationType = u),
      (this.sourceElement = a),
      (this.info = c),
      (this.newDocument = f),
      (this.signal = l),
      Object.defineProperties(this, {
        from: { enumerable: !0 },
        to: { enumerable: !0, writable: !0 },
        direction: { enumerable: !0, writable: !0 },
        navigationType: { enumerable: !0 },
        sourceElement: { enumerable: !0 },
        info: { enumerable: !0 },
        newDocument: { enumerable: !0, writable: !0 },
        signal: { enumerable: !0 },
      })
  }
}
class ue extends $ {
  formData
  loader
  constructor(t, n, o, r, i, u, a, c, f, l) {
    super(ie, { cancelable: !0 }, t, n, o, r, i, u, a, c),
      (this.formData = f),
      (this.loader = l.bind(this, this)),
      Object.defineProperties(this, { formData: { enumerable: !0 }, loader: { enumerable: !0, writable: !0 } })
  }
}
class fe extends $ {
  direction
  viewTransition
  swap
  constructor(t, n) {
    super(ae, void 0, t.from, t.to, t.direction, t.navigationType, t.sourceElement, t.info, t.newDocument, t.signal),
      (this.direction = t.direction),
      (this.viewTransition = n),
      (this.swap = () => re(this.newDocument)),
      Object.defineProperties(this, {
        direction: { enumerable: !0 },
        viewTransition: { enumerable: !0 },
        swap: { enumerable: !0, writable: !0 },
      })
  }
}
async function de(e, t, n, o, r, i, u, a, c) {
  const f = new ue(e, t, n, o, r, i, window.document, u, a, c)
  return (
    document.dispatchEvent(f) &&
      (await f.loader(), f.defaultPrevented || (le(se), f.navigationType !== 'traverse' && x({ scrollX, scrollY }))),
    f
  )
}
function me(e, t) {
  const n = new fe(e, t)
  return document.dispatchEvent(n), n.swap(), n
}
const he = history.pushState.bind(history),
  v = history.replaceState.bind(history),
  x = (e) => {
    history.state && ((history.scrollRestoration = 'manual'), v({ ...history.state, ...e }, ''))
  },
  D = !!document.startViewTransition,
  I = () => !!document.querySelector('[name="astro-view-transitions-enabled"]'),
  q = (e, t) => e.pathname === t.pathname && e.search === t.search
let d, w, E
const U = (e) => document.dispatchEvent(new Event(e)),
  B = () => U('astro:page-load'),
  pe = () => {
    let e = document.createElement('div')
    e.setAttribute('aria-live', 'assertive'),
      e.setAttribute('aria-atomic', 'true'),
      (e.className = 'astro-route-announcer'),
      document.body.append(e),
      setTimeout(() => {
        let t = document.title || document.querySelector('h1')?.textContent || location.pathname
        e.textContent = t
      }, 60)
  },
  H = 'data-astro-transition-persist',
  M = 'data-astro-transition',
  P = 'data-astro-transition-fallback'
let O,
  b = 0
history.state
  ? ((b = history.state.index), scrollTo({ left: history.state.scrollX, top: history.state.scrollY }))
  : I() && (v({ index: b, scrollX, scrollY }, ''), (history.scrollRestoration = 'manual'))
async function we(e, t) {
  try {
    const n = await fetch(e, t),
      r = (n.headers.get('content-type') ?? '').split(';', 1)[0].trim()
    return r !== 'text/html' && r !== 'application/xhtml+xml'
      ? null
      : { html: await n.text(), redirected: n.redirected ? n.url : void 0, mediaType: r }
  } catch {
    return null
  }
}
function V() {
  const e = document.querySelector('[name="astro-view-transitions-fallback"]')
  return e ? e.getAttribute('content') : 'animate'
}
function ge() {
  let e = Promise.resolve()
  for (const t of Array.from(document.scripts)) {
    if (t.dataset.astroExec === '') continue
    const n = t.getAttribute('type')
    if (n && n !== 'module' && n !== 'text/javascript') continue
    const o = document.createElement('script')
    o.innerHTML = t.innerHTML
    for (const r of t.attributes) {
      if (r.name === 'src') {
        const i = new Promise((u) => {
          o.onload = o.onerror = u
        })
        e = e.then(() => i)
      }
      o.setAttribute(r.name, r.value)
    }
    ;(o.dataset.astroExec = ''), t.replaceWith(o)
  }
  return e
}
const W = (e, t, n, o, r) => {
  const i = q(t, e),
    u = document.title
  document.title = o
  let a = !1
  if (e.href !== location.href && !r)
    if (n.history === 'replace') {
      const c = history.state
      v({ ...n.state, index: c.index, scrollX: c.scrollX, scrollY: c.scrollY }, '', e.href)
    } else he({ ...n.state, index: ++b, scrollX: 0, scrollY: 0 }, '', e.href)
  if (((document.title = u), (E = e), i || (scrollTo({ left: 0, top: 0, behavior: 'instant' }), (a = !0)), r))
    scrollTo(r.scrollX, r.scrollY)
  else {
    if (e.hash) {
      history.scrollRestoration = 'auto'
      const c = history.state
      ;(location.href = e.href), history.state || (v(c, ''), i && window.dispatchEvent(new PopStateEvent('popstate')))
    } else a || scrollTo({ left: 0, top: 0, behavior: 'instant' })
    history.scrollRestoration = 'manual'
  }
}
function be(e) {
  const t = []
  for (const n of e.querySelectorAll('head link[rel=stylesheet]'))
    if (
      !document.querySelector(`[${H}="${n.getAttribute(H)}"], link[rel=stylesheet][href="${n.getAttribute('href')}"]`)
    ) {
      const o = document.createElement('link')
      o.setAttribute('rel', 'preload'),
        o.setAttribute('as', 'style'),
        o.setAttribute('href', n.getAttribute('href')),
        t.push(
          new Promise((r) => {
            ;['load', 'error'].forEach((i) => o.addEventListener(i, r)), document.head.append(o)
          }),
        )
    }
  return t
}
async function F(e, t, n, o, r) {
  async function i(c) {
    function f(h) {
      const m = h.effect
      return !m || !(m instanceof KeyframeEffect) || !m.target
        ? !1
        : window.getComputedStyle(m.target, m.pseudoElement).animationIterationCount === 'infinite'
    }
    const l = document.getAnimations()
    document.documentElement.setAttribute(P, c)
    const p = document.getAnimations().filter((h) => !l.includes(h) && !f(h))
    return Promise.allSettled(p.map((h) => h.finished))
  }
  if (r === 'animate' && !n.transitionSkipped && !e.signal.aborted)
    try {
      await i('old')
    } catch {}
  const u = document.title,
    a = me(e, n.viewTransition)
  W(a.to, a.from, t, u, o),
    U(ce),
    r === 'animate' &&
      (!n.transitionSkipped && !a.signal.aborted
        ? i('new').finally(() => n.viewTransitionFinished())
        : n.viewTransitionFinished())
}
function ye() {
  return d?.controller.abort(), (d = { controller: new AbortController() })
}
async function j(e, t, n, o, r) {
  const i = ye()
  if (!I() || location.origin !== n.origin) {
    i === d && (d = void 0), (location.href = n.href)
    return
  }
  const u = r ? 'traverse' : o.history === 'replace' ? 'replace' : 'push'
  if (
    (u !== 'traverse' && x({ scrollX, scrollY }), q(t, n) && ((e !== 'back' && n.hash) || (e === 'back' && t.hash)))
  ) {
    W(n, t, o, document.title, r), i === d && (d = void 0)
    return
  }
  const a = await de(t, n, e, u, o.sourceElement, o.info, i.controller.signal, o.formData, c)
  if (a.defaultPrevented || a.signal.aborted) {
    i === d && (d = void 0), a.signal.aborted || (location.href = n.href)
    return
  }
  async function c(s) {
    const p = s.to.href,
      h = { signal: s.signal }
    if (s.formData) {
      h.method = 'POST'
      const L =
        s.sourceElement instanceof HTMLFormElement
          ? s.sourceElement
          : s.sourceElement instanceof HTMLElement && 'form' in s.sourceElement
            ? s.sourceElement.form
            : s.sourceElement?.closest('form')
      h.body =
        L?.attributes.getNamedItem('enctype')?.value === 'application/x-www-form-urlencoded'
          ? new URLSearchParams(s.formData)
          : s.formData
    }
    const m = await we(p, h)
    if (m === null) {
      s.preventDefault()
      return
    }
    if (
      (m.redirected && (s.to = new URL(m.redirected)),
      (O ??= new DOMParser()),
      (s.newDocument = O.parseFromString(m.html, m.mediaType)),
      s.newDocument.querySelectorAll('noscript').forEach((L) => L.remove()),
      !s.newDocument.querySelector('[name="astro-view-transitions-enabled"]') && !s.formData)
    ) {
      s.preventDefault()
      return
    }
    const S = be(s.newDocument)
    S.length && !s.signal.aborted && (await Promise.all(S))
  }
  async function f() {
    if (w && w.viewTransition) {
      try {
        w.viewTransition.skipTransition()
      } catch {}
      try {
        await w.viewTransition.updateCallbackDone
      } catch {}
    }
    return (w = { transitionSkipped: !1 })
  }
  const l = await f()
  if (a.signal.aborted) {
    i === d && (d = void 0)
    return
  }
  if ((document.documentElement.setAttribute(M, a.direction), D))
    l.viewTransition = document.startViewTransition(async () => await F(a, o, l, r))
  else {
    const s = (async () => {
      await Promise.resolve(), await F(a, o, l, r, V())
    })()
    l.viewTransition = {
      updateCallbackDone: s,
      ready: s,
      finished: new Promise((p) => (l.viewTransitionFinished = p)),
      skipTransition: () => {
        ;(l.transitionSkipped = !0), document.documentElement.removeAttribute(P)
      },
    }
  }
  l.viewTransition.updateCallbackDone.finally(async () => {
    await ge(), B(), pe()
  }),
    l.viewTransition.finished.finally(() => {
      ;(l.viewTransition = void 0),
        l === w && (w = void 0),
        i === d && (d = void 0),
        document.documentElement.removeAttribute(M),
        document.documentElement.removeAttribute(P)
    })
  try {
    await l.viewTransition.updateCallbackDone
  } catch (s) {
    const p = s
    console.log('[astro]', p.name, p.message, p.stack)
  }
}
async function C(e, t) {
  await j('forward', E, new URL(e, location.href), t ?? {})
}
function ve(e) {
  if (!I() && e.state) {
    location.reload()
    return
  }
  if (e.state === null) return
  const t = history.state,
    n = t.index,
    o = n > b ? 'forward' : 'back'
  ;(b = n), j(o, E, new URL(location.href), {}, t)
}
const X = () => {
  history.state && (scrollX !== history.state.scrollX || scrollY !== history.state.scrollY) && x({ scrollX, scrollY })
}
{
  if (D || V() !== 'none')
    if (
      ((E = new URL(location.href)),
      addEventListener('popstate', ve),
      addEventListener('load', B),
      'onscrollend' in window)
    )
      addEventListener('scrollend', X)
    else {
      let e, t, n, o
      const r = () => {
        if (o !== history.state?.index) {
          clearInterval(e), (e = void 0)
          return
        }
        if (t === scrollY && n === scrollX) {
          clearInterval(e), (e = void 0), X()
          return
        } else (t = scrollY), (n = scrollX)
      }
      addEventListener(
        'scroll',
        () => {
          e === void 0 && ((o = history.state.index), (t = scrollY), (n = scrollX), (e = window.setInterval(r, 50)))
        },
        { passive: !0 },
      )
    }
  for (const e of document.scripts) e.dataset.astroExec = ''
}
const K = new Set(),
  T = new WeakSet()
let k,
  G,
  Y = !1
function Te(e) {
  Y || ((Y = !0), (k ??= e?.prefetchAll ?? !1), (G ??= e?.defaultStrategy ?? 'hover'), Ee(), Ae(), Se(), Re())
}
function Ee() {
  for (const e of ['touchstart', 'mousedown'])
    document.body.addEventListener(
      e,
      (t) => {
        y(t.target, 'tap') && A(t.target.href, { ignoreSlowConnection: !0 })
      },
      { passive: !0 },
    )
}
function Ae() {
  let e
  document.body.addEventListener(
    'focusin',
    (o) => {
      y(o.target, 'hover') && t(o)
    },
    { passive: !0 },
  ),
    document.body.addEventListener('focusout', n, { passive: !0 }),
    N(() => {
      for (const o of document.getElementsByTagName('a'))
        T.has(o) ||
          (y(o, 'hover') &&
            (T.add(o),
            o.addEventListener('mouseenter', t, { passive: !0 }),
            o.addEventListener('mouseleave', n, { passive: !0 })))
    })
  function t(o) {
    const r = o.target.href
    e && clearTimeout(e),
      (e = setTimeout(() => {
        A(r)
      }, 80))
  }
  function n() {
    e && (clearTimeout(e), (e = 0))
  }
}
function Se() {
  let e
  N(() => {
    for (const t of document.getElementsByTagName('a'))
      T.has(t) || (y(t, 'viewport') && (T.add(t), (e ??= Le()), e.observe(t)))
  })
}
function Le() {
  const e = new WeakMap()
  return new IntersectionObserver((t, n) => {
    for (const o of t) {
      const r = o.target,
        i = e.get(r)
      o.isIntersecting
        ? (i && clearTimeout(i),
          e.set(
            r,
            setTimeout(() => {
              n.unobserve(r), e.delete(r), A(r.href)
            }, 300),
          ))
        : i && (clearTimeout(i), e.delete(r))
    }
  })
}
function Re() {
  N(() => {
    for (const e of document.getElementsByTagName('a')) y(e, 'load') && A(e.href)
  })
}
function A(e, t) {
  const n = t?.ignoreSlowConnection ?? !1
  if (Pe(e, n))
    if ((K.add(e), document.createElement('link').relList?.supports?.('prefetch') && t?.with !== 'fetch')) {
      const o = document.createElement('link')
      ;(o.rel = 'prefetch'), o.setAttribute('href', e), document.head.append(o)
    } else fetch(e, { priority: 'low' })
}
function Pe(e, t) {
  if (!navigator.onLine || (!t && z())) return !1
  try {
    const n = new URL(e, location.href)
    return (
      location.origin === n.origin && (location.pathname !== n.pathname || location.search !== n.search) && !K.has(e)
    )
  } catch {}
  return !1
}
function y(e, t) {
  if (e?.tagName !== 'A') return !1
  const n = e.dataset.astroPrefetch
  return n === 'false'
    ? !1
    : t === 'tap' && (n != null || k) && z()
      ? !0
      : (n == null && k) || n === ''
        ? t === G
        : n === t
}
function z() {
  if ('connection' in navigator) {
    const e = navigator.connection
    return e.saveData || /2g/.test(e.effectiveType)
  }
  return !1
}
function N(e) {
  e()
  let t = !1
  document.addEventListener('astro:page-load', () => {
    if (!t) {
      t = !0
      return
    }
    e()
  })
}
function ke() {
  const e = document.querySelector('[name="astro-view-transitions-fallback"]')
  return e ? e.getAttribute('content') : 'animate'
}
function _(e) {
  return e.dataset.astroReload !== void 0
}
;(D || ke() !== 'none') &&
  (document.addEventListener('click', (e) => {
    let t = e.target
    if (
      (e.composed && (t = e.composedPath()[0]),
      t instanceof Element && (t = t.closest('a, area')),
      !(t instanceof HTMLAnchorElement) && !(t instanceof SVGAElement) && !(t instanceof HTMLAreaElement))
    )
      return
    const n = t instanceof HTMLElement ? t.target : t.target.baseVal,
      o = t instanceof HTMLElement ? t.href : t.href.baseVal,
      r = new URL(o, location.href).origin
    _(t) ||
      t.hasAttribute('download') ||
      !t.href ||
      (n && n !== '_self') ||
      r !== location.origin ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.altKey ||
      e.shiftKey ||
      e.defaultPrevented ||
      (e.preventDefault(),
      C(o, { history: t.dataset.astroHistory === 'replace' ? 'replace' : 'auto', sourceElement: t }))
  }),
  document.addEventListener('submit', (e) => {
    let t = e.target
    if (t.tagName !== 'FORM' || e.defaultPrevented || _(t)) return
    const n = t,
      o = e.submitter,
      r = new FormData(n, o),
      i = typeof n.action == 'string' ? n.action : n.getAttribute('action'),
      u = typeof n.method == 'string' ? n.method : n.getAttribute('method')
    let a = o?.getAttribute('formaction') ?? i ?? location.pathname
    const c = o?.getAttribute('formmethod') ?? u ?? 'get'
    if (c === 'dialog' || location.origin !== new URL(a, location.href).origin) return
    const f = { sourceElement: o ?? n }
    if (c === 'get') {
      const l = new URLSearchParams(r),
        s = new URL(a)
      ;(s.search = l.toString()), (a = s.toString())
    } else f.formData = r
    e.preventDefault(), C(a, f)
  }),
  Te({ prefetchAll: !0 }))
