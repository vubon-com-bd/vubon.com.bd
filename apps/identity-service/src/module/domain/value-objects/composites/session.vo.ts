/**
 * SessionVO — Login session
 * @module identity-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { SessionIdVO } from '../primitives/session-id.vo.js';
import { AuthIdVO } from '../primitives/auth-id.vo.js';
import { UserIdVO } from '../primitives/user-id.vo.js';
import { DeviceIdVO } from '../primitives/device-id.vo.js';
import { SessionStatusVO } from '../primitives/session-status.vo.js';
import { IpAddressVO } from '../primitives/ip-address.vo.js';
import { UserAgentVO } from '../primitives/user-agent.vo.js';
import { SessionExpiryVO } from '../primitives/session-expiry.vo.js';

export interface SessionVOProps {
  readonly id: SessionIdVO;
  readonly authId: AuthIdVO;
  readonly userId: UserIdVO;
  readonly status: SessionStatusVO;
  readonly expiry: SessionExpiryVO;
  readonly ipAddress?: IpAddressVO;
  readonly userAgent?: UserAgentVO;
  readonly deviceId?: DeviceIdVO;
  readonly rememberMe: boolean;
  readonly createdAt: string;
  readonly lastAccessedAt: string;
  readonly refreshedAt?: string;
  readonly revokedAt?: string;
  readonly revokedReason?: string;
}

export class SessionVO extends BaseVO<SessionVOProps> {
  private constructor(props: SessionVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: SessionVOProps): SessionVO {
    const vo = new SessionVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: SessionVOProps): SessionVO {
    return new SessionVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.status.isRevoked() && !v.revokedAt) {
      throw new ValidationError(
        'revokedAt is required when status is revoked',
        'revokedAt',
      );
    }
  }

  get id(): SessionIdVO { return this.value.id; }
  get authId(): AuthIdVO { return this.value.authId; }
  get userId(): UserIdVO { return this.value.userId; }
  get status(): SessionStatusVO { return this.value.status; }
  get expiry(): SessionExpiryVO { return this.value.expiry; }
  get ipAddress(): IpAddressVO | undefined { return this.value.ipAddress; }
  get userAgent(): UserAgentVO | undefined { return this.value.userAgent; }
  get deviceId(): DeviceIdVO | undefined { return this.value.deviceId; }
  get rememberMe(): boolean { return this.value.rememberMe; }
  get createdAt(): string { return this.value.createdAt; }
  get lastAccessedAt(): string { return this.value.lastAccessedAt; }
  get refreshedAt(): string | undefined { return this.value.refreshedAt; }
  get revokedAt(): string | undefined { return this.value.revokedAt; }
  get revokedReason(): string | undefined { return this.value.revokedReason; }

  isActive(): boolean { return this.status.isActive(); }
  isExpired(nowMs: number = Date.now()): boolean {
    const lastAccessedMs = Date.parse(this.value.lastAccessedAt);
    return this.expiry.isExpired(lastAccessedMs, nowMs);
  }
  isIdleExpired(nowMs: number = Date.now()): boolean {
    const lastAccessedMs = Date.parse(this.value.lastAccessedAt);
    return this.expiry.isIdleExpired(lastAccessedMs, nowMs);
  }
}
