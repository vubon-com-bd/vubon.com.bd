/**
 * CanRefreshTokenSpecification
 * @module identity-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { SessionEntity } from '../entities/session.entity.js';
import type { TokenEntity } from '../entities/token.entity.js';

export interface CanRefreshTokenContext {
  readonly nowMs?: number;
  readonly sessionRevoked?: boolean;
  readonly tokenReuseDetected?: boolean;
}

export interface CanRefreshTokenCandidate {
  readonly token: TokenEntity;
  readonly session?: SessionEntity;
  readonly context?: CanRefreshTokenContext;
}

export class CanRefreshTokenSpecification extends Specification<CanRefreshTokenCandidate> {
  isSatisfiedBy(c: CanRefreshTokenCandidate): boolean {
    const { token, session, context } = c;
    const nowMs = context?.nowMs ?? Date.now();

    if (token.isRevoked()) return false;
    if (token.isExpired(nowMs)) return false;
    if (token.isUsed()) return false;
    if (context?.tokenReuseDetected) return false;
    if (context?.sessionRevoked) return false;

    if (session) {
      if (!session.isActive()) return false;
      if (session.isExpired(nowMs)) return false;
    }

    return true;
  }

  explain(c: CanRefreshTokenCandidate): string | null {
    const { token, session, context } = c;
    const nowMs = context?.nowMs ?? Date.now();

    if (token.isRevoked()) return 'Token is revoked';
    if (token.isExpired(nowMs)) return 'Token has expired';
    if (token.isUsed()) return 'Token has already been used';
    if (context?.tokenReuseDetected) return 'Token reuse detected — all tokens must be revoked';
    if (context?.sessionRevoked) return 'Session has been revoked';
    if (session) {
      if (!session.isActive()) return `Session status "${session.status.value}" is not active`;
      if (session.isExpired(nowMs)) return 'Session has expired';
    }
    return null;
  }

  static strict(): CanRefreshTokenSpecification {
    return new CanRefreshTokenSpecification();
  }
}
