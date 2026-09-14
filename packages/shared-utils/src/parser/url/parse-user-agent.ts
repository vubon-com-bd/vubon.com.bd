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
    return { browser: 'unknown', browserVersion: '', os: 'unknown', device: 'unknown' };
  }

  const browserMatch = ua.match(/(Edg|Chrome|Firefox|Safari|Opera|OPR|MSIE|Trident)\/?([\d.]*)/);
  let browser = 'unknown';
  let browserVersion = '';
  if (browserMatch) {
    browser = normalizeBrowser(browserMatch[1]);
    browserVersion = browserMatch[2] || '';
  }

  const osMatch = ua.match(
    /(Windows NT [\d.]+|Mac OS X [\d._]+|Android [\d.]+|iPhone OS [\d_]+|Linux)/
  );
  const os = osMatch ? osMatch[1].replace(/_/g, '.') : 'unknown';

  let device: ParsedUserAgent['device'] = 'desktop';
  if (/bot|crawler|spider/i.test(ua)) device = 'bot';
  else if (/iPad|Tablet/i.test(ua)) device = 'tablet';
  else if (/Mobi|iPhone|Android.*Mobile/i.test(ua)) device = 'mobile';

  return { browser, browserVersion, os, device };
}

function normalizeBrowser(raw: string): string {
  const map: Record<string, string> = {
    Edg: 'Edge',
    OPR: 'Opera',
    MSIE: 'IE',
    Trident: 'IE',
    Chrome: 'Chrome',
    Firefox: 'Firefox',
    Safari: 'Safari',
    Opera: 'Opera',
  };
  return map[raw] ?? raw;
}
