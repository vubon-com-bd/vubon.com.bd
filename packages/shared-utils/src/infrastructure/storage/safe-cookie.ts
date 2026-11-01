/**
 * SSR-safe cookie helpers
 * @module shared-utils/infrastructure/storage
 */

export interface CookieOptions {
  readonly maxAgeSeconds?: number;
  readonly expires?: Date;
  readonly path?: string;
  readonly domain?: string;
  readonly secure?: boolean;
  readonly sameSite?: 'Strict' | 'Lax' | 'None';
  readonly httpOnly?: boolean;
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  try {
    const escapedName = encodeURIComponent(name).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`(?:^|;\\s*)${escapedName}=([^;]*)`);
    const match = document.cookie.match(pattern);
    return match ? decodeURIComponent(match[1]) : null;
  } catch {
    return null;
  }
}

export function setCookie(name: string, value: string, options: CookieOptions = {}): boolean {
  if (typeof document === 'undefined') return false;

  try {
    const parts: string[] = [`${encodeURIComponent(name)}=${encodeURIComponent(value)}`];

    if (options.maxAgeSeconds !== undefined) {
      if (!Number.isFinite(options.maxAgeSeconds)) {
        throw new RangeError('maxAgeSeconds must be finite');
      }
      parts.push(`Max-Age=${Math.floor(options.maxAgeSeconds)}`);
    }

    if (options.expires) {
      parts.push(`Expires=${options.expires.toUTCString()}`);
    }

    parts.push(`Path=${options.path ?? '/'}`);

    if (options.domain) parts.push(`Domain=${options.domain}`);
    if (options.secure) parts.push('Secure');
    if (options.httpOnly) parts.push('HttpOnly');
    if (options.sameSite) parts.push(`SameSite=${options.sameSite}`);

    document.cookie = parts.join('; ');
    return true;
  } catch {
    return false;
  }
}

export function removeCookie(name: string, path = '/'): boolean {
  return setCookie(name, '', { maxAgeSeconds: 0, path });
}

export function hasCookie(name: string): boolean {
  return getCookie(name) !== null;
}
