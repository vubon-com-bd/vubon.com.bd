import { ForbiddenException } from '@nestjs/common';

export interface CsrfVerifyOptions {
  readonly cookieName: string;
  readonly headerName: string;
  readonly safeMethods?: readonly string[];
}

export const DEFAULT_CSRF_VERIFY_OPTIONS: CsrfVerifyOptions = {
  cookieName: 'XSRF-TOKEN',
  headerName: 'x-xsrf-token',
  safeMethods: ['GET', 'HEAD', 'OPTIONS'],
};

interface CsrfRequest {
  method?: string;
  headers?: Record<string, string | undefined>;
  cookies?: Record<string, string>;
}

/**
 * Double-submit CSRF verification (server-side).
 * Compares the CSRF cookie against the request header.
 */
export function verifyCsrf(
  req: CsrfRequest,
  options: CsrfVerifyOptions = DEFAULT_CSRF_VERIFY_OPTIONS
): void {
  const method = (req.method ?? 'GET').toUpperCase();
  const safe = options.safeMethods ?? ['GET', 'HEAD', 'OPTIONS'];
  if (safe.includes(method)) return;

  const cookieToken = req.cookies?.[options.cookieName];
  const headerToken = req.headers?.[options.headerName];

  if (!cookieToken || !headerToken) {
    throw new ForbiddenException('Missing CSRF token');
  }
  if (!constantTimeEqual(cookieToken, headerToken)) {
    throw new ForbiddenException('CSRF token mismatch');
  }
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
