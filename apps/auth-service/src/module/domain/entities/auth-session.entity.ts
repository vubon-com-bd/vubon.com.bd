/**
 * AuthSessionEntity — A user session aggregate
 * @module auth-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { UserId } from '@vubon/shared-types/common';
import { SessionTokenVO } from '../value-objects/primitives/session-token.vo';
import { SessionExpiryVO } from '../value-objects/primitives/session-expiry.vo';
import { SessionExpiredError } from '../errors/session.errors';

export interface AuthSessionEntityProps {
  readonly id: string;
  readonly userId: UserId;
  readonly token: SessionTokenVO;
  readonly expiry: SessionExpiryVO;
  readonly ipAddress: string;
  readonly userAgent: string;
  readonly deviceId?: string;
  readonly revokedAt?: number;
  readonly revokedReason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
}

export class AuthSessionEntity extends BaseEntity<string> {
  readonly userId: UserId;
  private _token: SessionTokenVO;
  private _expiry: SessionExpiryVO;
  private _ipAddress: string;
  private _userAgent: string;
  private _deviceId?: string;
  private _revokedAt?: number;
  private _revokedReason?: string;

  private constructor(props: AuthSessionEntityProps) {
    super(props.id, props.createdAt, props.updatedAt, props.deletedAt ?? null);
    this.userId = props.userId;
    this._token = props.token;
    this._expiry = props.expiry;
    this._ipAddress = props.ipAddress;
    this._userAgent = props.userAgent;
    this._deviceId = props.deviceId;
    this._revokedAt = props.revokedAt;
    this._revokedReason = props.revokedReason;
  }

  static create(props: AuthSessionEntityProps): AuthSessionEntity {
    return new AuthSessionEntity(props);
  }

  get token(): SessionTokenVO { return this._token; }
  get expiry(): SessionExpiryVO { return this._expiry; }
  get ipAddress(): string { return this._ipAddress; }
  get userAgent(): string { return this._userAgent; }
  get deviceId(): string | undefined { return this._deviceId; }
  get revokedAt(): number | undefined { return this._revokedAt; }

  isExpired(now: number): boolean { return this._expiry.isExpired(now); }
  isRevoked(): boolean { return this._revokedAt !== undefined; }

  isActive(now: number): boolean {
    return !this.isExpired(now) && !this.isRevoked();
  }

  assertActive(now: number): void {
    if (this.isExpired(now)) {
      throw new SessionExpiredError(this.id, this._expiry.toISOString());
    }
  }

  revoke(at: number, reason?: string): void {
    if (this._revokedAt) return;
    this._revokedAt = at;
    this._revokedReason = reason;
  }

  touch(now: number, extendByMs: number): void {
    this._expiry = this._expiry.extendBy(extendByMs, now);
  }
}
