export function loadSecret() {
  if (!window.localStorage) return
  const secret = window.localStorage.getItem('secret')
  if (secret === null) return
  window.CURRENT_SECRET = secret
}

export function setSecret(secret) {
  history.pushState(null, '', buildEmptyUrl())
  if (!window.localStorage) {
    alert('localStorage is not supported - cannot save the secret!')
  }
  window.localStorage.setItem('secret', secret)
  loadSecret()
}

export function loadOrSetSecret() {
  const url = new URL(String(document.location))
  const secret = url.searchParams.get('s')
  if (secret) {
    setSecret(secret)
  } else {
    loadSecret()
  }

  if (!window.CURRENT_SECRET) {
    alert('Please set the secret!')
  }
}

export function base64ToUint8Array(x) {
  return Uint8Array.from(
    atob(x)
      .split('')
      .map((x) => x.charCodeAt(0))
  )
}

export function buildEmptyUrl() {
  const u = new URL(String(document.location))
  u.searchParams.delete('s')
  return String(u)
}

export function jsonParse(s) {
  try {
    return JSON.parse(s)
  } catch (_) {
    return null
  }
}

export function buildSignedUrl(s) {
  const u = new URL(String(document.location))
  u.pathname = '/'
  u.search = ''
  u.searchParams.set('q', s)
  return String(u)
}
