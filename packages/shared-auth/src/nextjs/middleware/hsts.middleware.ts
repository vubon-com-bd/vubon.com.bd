import { NextResponse, type NextRequest } from 'next/server';

export interface HstsOptions {
  readonly maxAgeSeconds?: number;
  readonly includeSubDomains?: boolean;
  readonly preload?: boolean;
}

/**
 * Adds HSTS + other security headers.
 * Apply in Next.js `middleware.ts` (root).
 */
export function hstsMiddleware(_req: NextRequest, options: HstsOptions = {}): NextResponse {
  const res = NextResponse.next();
  const maxAge = options.maxAgeSeconds ?? 31_536_000;
  const parts = [`max-age=${maxAge}`];
  if (options.includeSubDomains !== false) parts.push('includeSubDomains');
  if (options.preload) parts.push('preload');

  res.headers.set('Strict-Transport-Security', parts.join('; '));
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  return res;
}
