/**
 * SessionEntity — AGGREGATE ROOT
 * @module identity-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import { SessionIdVO } from '../value-objects/primitives/session-id.vo.js';
import { AuthIdVO } from '../value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { SessionStatusVO } from '../value-objects/primitives/session-status.vo.js';
import { SessionExpiryVO } from '../value-objects/primitives/session-expiry.vo.js';
import { IpAddressVO } from '../value-objects/primitives/ip-address.vo.js';
import { UserAgentVO } from '../value-objects/primitives/user-agent.vo.js';
import { DeviceIdVO } from '../value-objects/primitives/device-id.vo.js';

import {
  SessionCreatedEvent,
  SessionRefreshedEvent,
  SessionExpiredEvent,
  SessionRevokedEvent,
  SessionLogoutEvent,
} from '../events/session.events.js';

export interface SessionEntityProps {
  readonly authId: AuthIdVO;
  readonly userId: UserIdVO;
  readonly status: SessionStatusVO;
  readonly expiry: SessionExpiryVO;
  readonly ipAddress?: IpAddressVO;
  readonly userAgent?: UserAgentVO;
  readonly deviceId?: DeviceIdVO;
  readonly rememberMe: boolean;
  readonly lastAccessedAt: string;
  readonly refreshedAt?: string;
  readonly revokedAt?: string;
  readonly revokedReason?: string;
}

export class SessionEntity extends AggregateRoot<string> {
  private _status: SessionStatusVO;
  private _expiry: SessionExpiryVO;
  private _lastAccessedAt: string;
  private _refreshedAt?: string;
  private _revokedAt?: string;
  private _revokedReason?: string;

  private readonly _authId: AuthIdVO;
  private readonly _userId: UserIdVO;
  private readonly _ipAddress?: IpAddressVO;
  private readonly _userAgent?: UserAgentVO;
  private readonly _deviceId?: DeviceIdVO;
  private readonly _rememberMe: boolean;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: SessionEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._authId = props.authId;
    this._userId = props.userId;
    this._status = props.status;
    this._expiry = props.expiry;
    this._ipAddress = props.ipAddress;
    this._userAgent = props.userAgent;
    this._deviceId = props.deviceId;
    this._rememberMe = props.rememberMe;
    this._lastAccessedAt = props.lastAccessedAt;
    this._refreshedAt = props.refreshedAt;
    this._revokedAt = props.revokedAt;
    this._revokedReason = props.revokedReason;
  }

  // Getters
  get authId(): AuthIdVO { return this._authId; }
  get userId(): UserIdVO { return this._userId; }
  get status(): SessionStatusVO { return this._status; }
  get expiry(): SessionExpiryVO { return this._expiry; }
  get ipAddress(): IpAddressVO | undefined { return this._ipAddress; }
  get userAgent(): UserAgentVO | undefined { return this._userAgent; }
  get deviceId(): DeviceIdVO | undefined { return this._deviceId; }
  get rememberMe(): boolean { return this._rememberMe; }
  get lastAccessedAt(): string { return this._lastAccessedAt; }
  get refreshedAt(): string | undefined { return this._refreshedAt; }
  get revokedAt(): string | undefined { return this._revokedAt; }
  get revokedReason(): string | undefined { return this._revokedReason; }

  // Predicates
  isActive(): boolean { return this._status.isActive(); }
  isFinal(): boolean { return this._status.isFinal(); }
  isIdle(nowMs: number = Date.now()): boolean {
    return this._expiry.isIdleExpired(Date.parse(this._lastAccessedAt), nowMs);
  }
  isExpired(nowMs: number = Date.now()): boolean {
    return this._expiry.isExpired(Date.parse(this._lastAccessedAt), nowMs);
  }
  canAccess(nowMs: number = Date.now()): boolean {
    return this._status.isUsable() && !this.isExpired(nowMs);
  }

  // Business actions
  touchAccess(now: string = new Date().toISOString()): void {
    if (!this._status.isUsable()) {
      throw new BusinessRuleError(
        `Cannot touch session in status "${this._status.value}"`,
        'SESSION_NOT_USABLE',
        { sessionId: this.id, status: this._status.value },
      );
    }
    this._lastAccessedAt = now;
    this.touch(now);
    this.incrementVersion();
  }

  refresh(
    newExpiry: SessionExpiryVO,
    now: string = new Date().toISOString(),
  ): void {
    if (!this._status.isUsable()) {
      throw new BusinessRuleError(
        `Cannot refresh session in status "${this._status.value}"`,
        'SESSION_NOT_REFRESHABLE',
        { sessionId: this.id, status: this._status.value },
      );
    }
    this._expiry = newExpiry;
    this._lastAccessedAt = now;
    this._refreshedAt = now;
    this.addDomainEvent(
      new SessionRefreshedEvent({
        aggregateId: this.id,
        payload: {
          sessionId: this.id,
          refreshedAt: now,
          newExpiresAt: new Date(newExpiry.absoluteExpiresAt * 1000).toISOString(),
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  expire(now: string = new Date().toISOString()): void {
    if (this._status.isFinal()) return;
    this._status = SessionStatusVO.expired();
    this.addDomainEvent(
      new SessionExpiredEvent({
        aggregateId: this.id,
        payload: {
          sessionId: this.id,
          userId: this._userId.value,
          endedAt: now,
          reason: 'expired',
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  revoke(reason: string, now: string = new Date().toISOString()): void {
    if (this._status.isRevoked()) {
      throw new BusinessRuleError(
        'Session already revoked',
        'SESSION_ALREADY_REVOKED',
        { sessionId: this.id },
      );
    }
    this._status = SessionStatusVO.revoked();
    this._revokedAt = now;
    this._revokedReason = reason;
    this.addDomainEvent(
      new SessionRevokedEvent({
        aggregateId: this.id,
        payload: {
          sessionId: this.id,
          userId: this._userId.value,
          endedAt: now,
          reason,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  logout(now: string = new Date().toISOString()): void {
    if (!this._status.isUsable()) return;
    this._status = SessionStatusVO.revoked();
    this._revokedAt = now;
    this._revokedReason = 'logout';
    this.addDomainEvent(
      new SessionLogoutEvent({
        aggregateId: this.id,
        payload: {
          sessionId: this.id,
          userId: this._userId.value,
          endedAt: now,
          reason: 'logout',
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // Factories
  static create(params: {
    id: SessionIdVO;
    props: Omit<SessionEntityProps, 'status' | 'lastAccessedAt'>;
    now: string;
  }): SessionEntity {
    const entity = new SessionEntity(
      params.id.value,
      params.now,
      params.now,
      {
        ...params.props,
        status: SessionStatusVO.active(),
        lastAccessedAt: params.now,
      },
    );

    entity.addDomainEvent(
      new SessionCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          sessionId: params.id.value,
          authId: params.props.authId.value,
          userId: params.props.userId.value,
          deviceId: params.props.deviceId?.value,
          ipAddress: params.props.ipAddress?.value,
          userAgent: params.props.userAgent?.value,
          createdAt: params.now,
          expiresAt: new Date(params.props.expiry.absoluteExpiresAt * 1000).toISOString(),
        },
        version: 1,
      }),
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: SessionEntityProps;
    version?: number;
  }): SessionEntity {
    const entity = new SessionEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
