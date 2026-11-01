import { InvalidTokenError } from '../errors/invalid-token-error';
import type { JwtDecodeResult, JwtPayload } from './jwt.types';
import { assertWellFormedJwt } from './jwt.errors';

/**
 * Decode JWT WITHOUT verifying signature.
 * Safe for CLIENT usage (read-only).
 *
 * ⚠️ NEVER use this to trust a token. Verification is server-only.
 */
export function decodeJwt(token: string): JwtDecodeResult {
  assertWellFormedJwt(token);
  const [headerB64, payloadB64, signature] = token.split('.');

  const decodeB64 = (input: string): string => {
    if (typeof atob === 'function') {
      return decodeURIComponent(
        Array.from(atob(input))
          .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`)
          .join('')
      );
    }
    // Node fallback
    return Buffer.from(input, 'base64').toString('utf-8');
  };

  try {
    const header = JSON.parse(decodeB64(headerB64 ?? '')) as Record<string, unknown>;
    const payload = JSON.parse(decodeB64(payloadB64 ?? '')) as JwtPayload;
    return { header, payload, signature: signature ?? '', raw: token };
  } catch (err) {
    throw new InvalidTokenError('Failed to decode JWT', err);
  }
}

/** Extract payload only. */
export function getJwtPayload(token: string): JwtPayload | null {
  return decodeJwt(token).payload;
}
