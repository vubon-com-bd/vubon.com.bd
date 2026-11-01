import { useCallback, useState } from 'react';

export interface CookieOptions {
  readonly maxAgeSeconds?: number;
  readonly path?: string;
  readonly sameSite?: 'Strict' | 'Lax' | 'None';
  readonly secure?: boolean;
}

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.split('; ').find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split('=')[1] ?? '') : null;
}

function writeCookie(name: string, value: string, options: CookieOptions = {}): void {
  if (typeof document === 'undefined') return;
  const parts = [`${name}=${encodeURIComponent(value)}`];
  parts.push(`path=${options.path ?? '/'}`);
  if (options.maxAgeSeconds !== undefined) parts.push(`max-age=${options.maxAgeSeconds}`);
  parts.push(`SameSite=${options.sameSite ?? 'Lax'}`);
  if (options.secure ?? window.location.protocol === 'https:') parts.push('Secure');
  document.cookie = parts.join('; ');
}

/**
 * Read/write a non-httpOnly cookie.
 * ⚠️ NEVER use this for auth tokens. Server sets those with httpOnly.
 */
export function useCookie(
  name: string,
  options: CookieOptions = {}
): readonly [string | null, (value: string | null) => void] {
  const [value, setValue] = useState<string | null>(() => readCookie(name));

  const update = useCallback(
    (next: string | null) => {
      if (next === null) {
        writeCookie(name, '', { ...options, maxAgeSeconds: 0 });
        setValue(null);
        return;
      }
      writeCookie(name, next, options);
      setValue(next);
    },
    [name, options]
  );

  return [value, update] as const;
}
