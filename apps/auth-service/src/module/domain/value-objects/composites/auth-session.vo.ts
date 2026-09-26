/**
 * AuthSessionVO — Snapshot of an authentication session
 * @module auth-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { SessionTokenVO } from '../primitives/session-token.vo';

export interface AuthSessionVOProps {
  readonly sessionId: string;
  readonly userId: UserIdVO;
  readonly token: SessionTokenVO;
  readonly ipAddress: string;
  readonly userAgent: string;
  readonly deviceId?: string;
  readonly createdAt: number;
  readonly expiresAt: number;
  readonly revokedAt?: number;
}

export class AuthSessionVO extends BaseVO<AuthSessionVOProps> {
  private constructor(props: AuthSessionVOProps) {
    super(props);
  }

  static of(props: AuthSessionVOProps): AuthSessionVO {
    if (props.expiresAt <= props.createdAt) {
      throw new Error('Session expiry must be after creation');
    }
    return new AuthSessionVO(props);
  }

  get sessionId(): string { return this.value.sessionId; }
  get userId(): UserIdVO { return this.value.userId; }
  get token(): SessionTokenVO { return this.value.token; }
  get expiresAt(): number { return this.value.expiresAt; }

  isExpired(now: number): boolean { return this.value.expiresAt <= now; }
  isRevoked(): boolean { return this.value.revokedAt !== undefined; }
  isActive(now: number): boolean { return !this.isExpired(now) && !this.isRevoked(); }
}
