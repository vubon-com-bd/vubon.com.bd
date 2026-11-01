import { InvalidTokenError } from '../../common/errors/invalid-token-error';
import type { AuthTokenPair } from '@vubon/shared-types/auth';
import { verifyJwt } from '../jwt/jwt-verifier';
import { jwtBlacklist } from '../jwt/jwt-blacklist';
import type { SessionServiceContract } from '../session/session.service.interface';
import { tokenRotationTracker, type TokenRotationTracker } from './token-rotation';
import type { TokenServiceContract } from './token.service.interface';

export interface RefreshFlowDeps {
  readonly tokens: TokenServiceContract;
  readonly sessions: SessionServiceContract;
  readonly rotation?: TokenRotationTracker;
}

/**
 * Server-side refresh flow with rotation + reuse detection.
 * If a previously-used refresh token is replayed, the whole family
 * is revoked and ALL user sessions are invalidated.
 */
export async function handleRefreshFlow(
  refreshToken: string,
  deps: RefreshFlowDeps
): Promise<AuthTokenPair> {
  const payload = verifyJwt(refreshToken);
  if (payload.type !== 'refresh') {
    throw new InvalidTokenError('Expected refresh token');
  }
  const familyId = payload.jti ?? payload.sid ?? '';
  if (!familyId) throw new InvalidTokenError('Missing rotation family');

  const tracker = deps.rotation ?? tokenRotationTracker;

  // JWT `jti` is optional; when absent, fall back to sid+time.
  const newJti = payload.jti
    ? `${payload.jti}.next`
    : `${String(payload.sid ?? 'session')}.${Date.now().toString(36)}`;

  const { reuseDetected } = await tracker.onRotate({
    familyId: String(familyId),
    userId: String(payload.sub),
    newJti,
    ...(payload.jti ? { oldJti: payload.jti } : {}),
  });

  if (reuseDetected) {
    // Attacker replay — nuke everything
    await deps.sessions.revokeAllForUser(String(payload.sub));
    if (payload.jti) await jwtBlacklist.add(payload.jti, payload.exp);
    throw new InvalidTokenError('Refresh token reuse detected');
  }

  // Blacklist old refresh jti
  if (payload.jti) await jwtBlacklist.add(payload.jti, payload.exp);

  return deps.tokens.issuePair({
    userId: String(payload.sub),
    sessionId: String(payload.sid ?? ''),
    scope: payload.scope,
  });
}
