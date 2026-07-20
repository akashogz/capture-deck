const BLOCKED = new Set(['localhost', '0.0.0.0', '::1'])
const PRIVATE = [/^10\./, /^172\.(1[6-9]|2[0-9]|3[01])\./, /^192\.168\./, /^127\./]

export class UrlValidationError extends Error { constructor(m) { super(m); this.name = 'UrlValidationError' } }

export function parseAndValidateUrl(raw) {
  let url
  try { url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`) }
  catch { throw new UrlValidationError(`Invalid URL: "${raw}"`) }
  if (!['http:', 'https:'].includes(url.protocol)) throw new UrlValidationError('Only http/https supported')
  if (BLOCKED.has(url.hostname)) throw new UrlValidationError('Host not allowed')
  if (PRIVATE.some(r => r.test(url.hostname))) throw new UrlValidationError('Private IP not allowed')
  return url
}
