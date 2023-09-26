export function loadSecret() {
  if (!window.localStorage) {
    alert('Local storage unavailable!')
    return false
  }
  const secret = window.localStorage.getItem('secret')
  if (secret === null) {
    alert('No secret found!')
    return false
  }
  window.CURRENT_SECRET = secret
  return true
}

export function setSecret(secret) {
  history.pushState(null, '', buildEmptyUrl())
  if (!window.localStorage) {
    alert('localStorage is not supported - cannot save the secret!')
    return false
  }
  window.localStorage.setItem('secret', secret)
  return loadSecret()
}

export function loadOrSetSecret() {
  const url = new URL(String(document.location))
  const secret = url.searchParams.get('s')
  if (secret) {
    return setSecret(secret)
  } else {
    return loadSecret()
  }
}

export function base64ToUint8Array(x) {
  return Uint8Array.from(
    atob(x)
      .split('')
      .map((x) => x.charCodeAt(0))
  )
}

export function uint8ArrayToBase64(x) {
  return btoa(String.fromCharCode(...x))
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

export function buildSecretUrl(s) {
  const u = new URL(String(document.location))
  u.pathname = '/'
  u.search = ''
  u.searchParams.set('s', s)
  return String(u)
}

export function userConfirm(promptText) {
  const rnd = String(Math.floor(Math.random() * 1000)).padStart(4, '0')
  const result = prompt(`${promptText}\nEnter ${rnd} and click OK to confirm.`)
  if (result.trim() === rnd) {
    return true
  } else {
    alert('Invalid confirmation code!')
    return false
  }
}
