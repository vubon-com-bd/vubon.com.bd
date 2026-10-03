import { AUTH_TOKEN } from '@vubon/shared-constants/auth';
import type { AuthTokenPayload } from '@vubon/shared-types/auth';
import type { RefreshToken } from '@vubon/shared-types/common/primitives';
import { signJwt } from '../jwt/jwt-signer';
import type { IssuePairInput } from './token.service.interface';

export function signRefreshToken(input: IssuePairInput): {
  token: RefreshToken;
  expiresAt: number;
  familyId: string;
} {
  const familyId = input.sessionId;
  const payload: Omit<AuthTokenPayload, 'iat' | 'exp'> = {
    sub: input.userId as AuthTokenPayload['sub'],
    sid: input.sessionId as AuthTokenPayload['sid'],
    type: 'refresh',
    iss: '',
    jti: familyId,
  };
  const token = signJwt(payload, {
    expiresIn: AUTH_TOKEN.REFRESH_TOKEN_EXPIRY,
    subject: input.userId,
  });
  const expiresAt = Math.floor(Date.now() / 1000) + parseDuration(AUTH_TOKEN.REFRESH_TOKEN_EXPIRY);
  return { token: token as RefreshToken, expiresAt, familyId };
}

function parseDuration(d: string): number {
  const m = /^(\d+)([smhd])$/.exec(d);
  if (!m) return 604800;
  const n = Number(m[1]);
  const unit = m[2];
  if (unit === 's') return n;
  if (unit === 'm') return n * 60;
  if (unit === 'h') return n * 3600;
  if (unit === 'd') return n * 86400;
  return 604800;
}
