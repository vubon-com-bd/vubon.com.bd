/**
 * TokenEntity — AGGREGATE ROOT
 * @module identity-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import { TokenIdVO } from '../value-objects/primitives/token-id.vo.js';
import { SessionIdVO } from '../value-objects/primitives/session-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { TokenTypeVO } from '../value-objects/primitives/token-type.vo.js';
import { TokenValueVO } from '../value-objects/primitives/token-value.vo.js';
import { TokenExpiryVO } from '../value-objects/primitives/token-expiry.vo.js';

import {
  TokenIssuedEvent,
  TokenRevokedEvent,
  TokenReusedEvent,
} from '../events/token.events.js';

export interface TokenEntityProps {
  readonly userId: UserIdVO;
  readonly sessionId: SessionIdVO;
  readonly type: TokenTypeVO;
  readonly value: TokenValueVO;
  readonly expiry: TokenExpiryVO;
  readonly jti: string;
  readonly usedAt?: string;
  readonly revokedAt?: string;
  readonly revokedReason?: string;
}

export class TokenEntity extends AggregateRoot<string> {
  private _usedAt?: string;
  private _revokedAt?: string;
  private _revokedReason?: string;

  private readonly _userId: UserIdVO;
  private readonly _sessionId: SessionIdVO;
  private readonly _type: TokenTypeVO;
  private readonly _value: TokenValueVO;
  private readonly _expiry: TokenExpiryVO;
  private readonly _jti: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: TokenEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);
    this._userId = props.userId;
    this._sessionId = props.sessionId;
    this._type = props.type;
    this._value = props.value;
    this._expiry = props.expiry;
    this._jti = props.jti;
    this._usedAt = props.usedAt;
    this._revokedAt = props.revokedAt;
    this._revokedReason = props.revokedReason;
  }

  get userId(): UserIdVO { return this._userId; }
  get sessionId(): SessionIdVO { return this._sessionId; }
  get type(): TokenTypeVO { return this._type; }
  get value(): TokenValueVO { return this._value; }
  get expiry(): TokenExpiryVO { return this._expiry; }
  get jti(): string { return this._jti; }
  get usedAt(): string | undefined { return this._usedAt; }
  get revokedAt(): string | undefined { return this._revokedAt; }
  get revokedReason(): string | undefined { return this._revokedReason; }

  isExpired(nowMs: number = Date.now()): boolean {
    return this._expiry.isExpired(nowMs);
  }
  isUsed(): boolean { return this._usedAt !== undefined; }
  isRevoked(): boolean { return this._revokedAt !== undefined; }
  isUsable(nowMs: number = Date.now()): boolean {
    return !this.isExpired(nowMs) && !this.isUsed() && !this.isRevoked();
  }

  markUsed(now: string = new Date().toISOString()): void {
    if (this.isUsed()) {
      this.addDomainEvent(
        new TokenReusedEvent({
          aggregateId: this.id,
          payload: {
            tokenId: this.id,
            userId: this._userId.value,
            originalIssuedAt: this.createdAt,
            detectedAt: now,
          },
          version: this.version + 1,
        }),
      );
      this.incrementVersion();
      throw new BusinessRuleError(
        'Token has already been used',
        'TOKEN_ALREADY_USED',
        { tokenId: this.id },
      );
    }
    this._usedAt = now;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  revoke(reason: string, now: string = new Date().toISOString()): void {
    if (this.isRevoked()) return;
    this._revokedAt = now;
    this._revokedReason = reason;
    this.addDomainEvent(
      new TokenRevokedEvent({
        aggregateId: this.id,
        payload: {
          tokenId: this.id,
          userId: this._userId.value,
          tokenType: this._type.value,
          reason,
          revokedAt: now,
        },
        version: this.version + 1,
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  static create(params: {
    id: TokenIdVO;
    props: TokenEntityProps;
    now: string;
  }): TokenEntity {
    const entity = new TokenEntity(
      params.id.value,
      params.now,
      params.now,
      params.props,
    );

    entity.addDomainEvent(
      new TokenIssuedEvent({
        aggregateId: params.id.value,
        payload: {
          tokenId: params.id.value,
          userId: params.props.userId.value,
          sessionId: params.props.sessionId.value,
          tokenType: params.props.type.value,
          issuedAt: params.now,
          expiresAt: params.props.expiry.expiresAt,
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
    props: TokenEntityProps;
    version?: number;
  }): TokenEntity {
    const entity = new TokenEntity(params.id, params.createdAt, params.updatedAt, params.props);
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
