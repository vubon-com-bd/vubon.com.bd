/**
 * Best-effort User-Agent parser (browser, OS, device)
 * @module shared-utils/parser/url
 *
 * ⚠️ Not a full UA parser. For production use, prefer `ua-parser-js`.
 */
export interface ParsedUserAgent {
  readonly browser: string;
  readonly browserVersion: string;
  readonly os: string;
  readonly device: 'desktop' | 'mobile' | 'tablet' | 'bot' | 'unknown';
}

export function parseUserAgent(ua: string): ParsedUserAgent {
  if (typeof ua !== 'string' || ua.length === 0) {
    return {
      browser: 'unknown',
      browserVersion: '',
      os: 'unknown',
      device: 'unknown',
    };
  }

  // Bound scan length to prevent ReDoS
  const safeUa = ua.length > 512 ? ua.slice(0, 512) : ua;

  const browser = detectBrowser(safeUa);
  const os = detectOs(safeUa);
  const device = detectDevice(safeUa);

  return {
    browser: browser.name,
    browserVersion: browser.version,
    os,
    device,
  };
}

function detectBrowser(ua: string): { name: string; version: string } {
  // Order matters (Edge/Opera before Chrome)
  const checks: readonly [string, string, string][] = [
    ['Edg', 'Edge', 'Edg/'],
    ['OPR', 'Opera', 'OPR/'],
    ['MSIE', 'IE', 'MSIE '],
    ['Trident', 'IE', 'rv:'],
    ['Chrome', 'Chrome', 'Chrome/'],
    ['Firefox', 'Firefox', 'Firefox/'],
    ['Safari', 'Safari', 'Version/'],
  ];

  for (const [marker, name, versionMarker] of checks) {
    const idx = ua.indexOf(marker);
    if (idx === -1) continue;
    const versionStart = ua.indexOf(versionMarker, idx);
    if (versionStart === -1) return { name, version: '' };
    const version = readVersion(ua, versionStart + versionMarker.length);
    return { name, version };
  }
  return { name: 'unknown', version: '' };
}

function readVersion(value: string, start: number): string {
  let end = start;
  while (end < value.length) {
    const c = value.charCodeAt(end);
    const isDigit = c >= 48 && c <= 57;
    const isDot = c === 46; // .
    const isUnderscore = c === 95; // _
    if (!isDigit && !isDot && !isUnderscore) break;
    end++;
  }
  return value.slice(start, end);
}

function detectOs(ua: string): string {
  if (ua.includes('Windows NT')) return readOsToken(ua, 'Windows NT');
  if (ua.includes('Mac OS X')) return 'Mac OS X';
  if (ua.includes('Android')) return readOsToken(ua, 'Android');
  if (ua.includes('iPhone OS') || ua.includes('iPad')) return 'iOS';
  if (ua.includes('Linux')) return 'Linux';
  return 'unknown';
}

function readOsToken(ua: string, marker: string): string {
  const idx = ua.indexOf(marker);
  if (idx === -1) return marker;
  const version = readVersion(ua, idx + marker.length + 1);
  return version ? `${marker} ${version}` : marker;
}

function detectDevice(ua: string): ParsedUserAgent['device'] {
  if (ua.includes('bot') || ua.includes('crawler') || ua.includes('spider')) {
    return 'bot';
  }
  if (ua.includes('iPad') || ua.includes('Tablet')) return 'tablet';
  if (ua.includes('Mobi') || ua.includes('iPhone')) return 'mobile';
  if (ua.includes('Android') && ua.includes('Mobile')) return 'mobile';
  return 'desktop';
}
