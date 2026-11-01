import { JWT_CONFIG } from '@vubon/shared-config/security/jwt';

/** Standard Authorization header value for a token. */
export function buildBearerHeader(accessToken: string): string {
  return `${JWT_CONFIG.bearerPrefix}${accessToken}`;
}

/** Extract token from an Authorization header. */
export function extractBearerToken(authorizationHeader: string | undefined | null): string | null {
  if (!authorizationHeader) return null;
  const prefix = JWT_CONFIG.bearerPrefix;
  if (!authorizationHeader.startsWith(prefix)) return null;
  const token = authorizationHeader.slice(prefix.length).trim();
  return token.length > 0 ? token : null;
}

/** Split JWT into 3 parts (header.payload.signature). */
export function splitJwt(token: string): readonly [string, string, string] {
  const parts = token.split('.');
  if (parts.length !== 3 || !parts[0] || !parts[1] || !parts[2]) {
    throw new Error('JWT must have 3 non-empty parts');
  }
  return [parts[0], parts[1], parts[2]];
}
