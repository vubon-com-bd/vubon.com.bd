import { useMemo } from 'react';

export interface BrowserInfo {
  readonly name: string;
  readonly version: string;
  readonly engine: string;
  readonly isMobile: boolean;
}

function detect(ua: string): BrowserInfo {
  if (!ua) return { name: 'unknown', version: '', engine: 'unknown', isMobile: false };
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(ua);
  if (/Edg\//.test(ua))
    return { name: 'Edge', version: match(ua, /Edg\/([\d.]+)/), engine: 'Blink', isMobile };
  if (/OPR\//.test(ua))
    return { name: 'Opera', version: match(ua, /OPR\/([\d.]+)/), engine: 'Blink', isMobile };
  if (/Chrome\//.test(ua))
    return { name: 'Chrome', version: match(ua, /Chrome\/([\d.]+)/), engine: 'Blink', isMobile };
  if (/Firefox\//.test(ua))
    return { name: 'Firefox', version: match(ua, /Firefox\/([\d.]+)/), engine: 'Gecko', isMobile };
  if (/Safari\//.test(ua))
    return { name: 'Safari', version: match(ua, /Version\/([\d.]+)/), engine: 'WebKit', isMobile };
  return { name: 'unknown', version: '', engine: 'unknown', isMobile };
}

function match(ua: string, re: RegExp): string {
  const m = re.exec(ua);
  return m?.[1] ?? '';
}

export function useBrowserInfo(): BrowserInfo {
  return useMemo(() => {
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    return detect(ua);
  }, []);
}
