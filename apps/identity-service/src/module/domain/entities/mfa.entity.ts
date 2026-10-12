/**
 * MfaEntity — AGGREGATE ROOT
 * @module identity-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { MfaIdVO } from '../value-objects/primitives/mfa-id.vo.js';
import { AuthIdVO } from '../value-objects/primitives/auth-id.vo.js';
import { MfaMethodVO } from '../value-objects/primitives/mfa-method.vo.js';
import { MfaSecretVO } from '../value-objects/primitives/mfa-secret.vo.js';

import {
  MfaSetupStartedEvent,
  MfaEnabledEvent,
  MfaDisabledEvent,
  MfaVerifiedEvent,
} from '../events/mfa.events.js';

export interface MfaEntityProps {
  readonly authId: AuthIdVO;
  readonly method: MfaMethodVO;
  readonly secret?: MfaSecretVO;
  readonly verified: boolean;
  readonly enabled: boolean;
  readonly enabledAt?: string;
  readonly disabledAt?: string;
  readonly verifiedAt?: string;
  readonly failedAttempts: number;
  readonly lastChallengeAt?: string;
}

export class MfaEntity extends AggregateRoot<string> {
  private _verified: boolean;
  private _enabled: boolean;
  private _enabledAt?: string;
  private _disabledAt?: string;
  private _verifiedAt?: string;
  private _failedAttempts: number;
  private _lastChallengeAt?: string;

  private readonly _authId: AuthIdVO;
  private readonly _method: MfaMethodVO;
  private readonly _secret?: MfaSecretVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: MfaEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);
    this._authId = props.authId;
    this._method = props.method;
    this._secret = props.secret;
    this._verified = props.verified;
    this._enabled = props.enabled;
    this._enabledAt = props.enabledAt;
    this._disabledAt = props.disabledAt;
    this._verifiedAt = props.verifiedAt;
    this._failedAttempts = props.failedAttempts;
    this._lastChallengeAt = props.lastChallengeAt;

    if (this._enabled && !this._verified) {
      throw new ValidationError(
        'MFA cannot be enabled before verification',
        'enabled',
      );
    }
  }

  get authId(): AuthIdVO { return this._authId; }
  get method(): MfaMethodVO { return this._method; }
  get secret(): MfaSecretVO | undefined { return this._secret; }
  get verified(): boolean { return this._verified; }
  get enabled(): boolean { return this._enabled; }
  get enabledAt(): string | undefined { return this._enabledAt; }
  get disabledAt(): string | undefined { return this._disabledAt; }
  get verifiedAt(): string | undefined { return this._verifiedAt; }
  get failedAttempts(): number { return this._failedAttempts; }

  isEnabledAndVerified(): boolean {
    return this._enabled && this._verified;
  }

  markVerified(now: string = new Date().toISOString()): void {
    if (this._verified) return;
    this._verified = true;
    this._verifiedAt = now;
    this.addDomainEvent(
      new MfaVerifiedEvent({
        aggregateId: this.id,
        payload: {
          authId: this._authId.value,
          method: this._method.value,
          verifiedAt: now,
        },
        version: this.version + 1,
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  enable(now: string = new Date().toISOString()): void {
    if (!this._verified) {
      throw new BusinessRuleError(
        'MFA must be verified before enabling',
        'MFA_NOT_VERIFIED',
        { authId: this._authId.value },
      );
    }
    if (this._enabled) return;
    this._enabled = true;
    this._enabledAt = now;
    this.addDomainEvent(
      new MfaEnabledEvent({
        aggregateId: this.id,
        payload: {
          authId: this._authId.value,
          method: this._method.value,
          enabledAt: now,
        },
        version: this.version + 1,
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  disable(now: string = new Date().toISOString()): void {
    if (!this._enabled) return;
    this._enabled = false;
    this._disabledAt = now;
    this.addDomainEvent(
      new MfaDisabledEvent({
        aggregateId: this.id,
        payload: {
          authId: this._authId.value,
          method: this._method.value,
          enabledAt: now,
        },
        version: this.version + 1,
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  recordFailedAttempt(now: string = new Date().toISOString()): void {
    this._failedAttempts += 1;
    this._lastChallengeAt = now;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  resetFailedAttempts(): void {
    this._failedAttempts = 0;
  }

  static create(params: {
    id: MfaIdVO;
    authId: AuthIdVO;
    method: MfaMethodVO;
    secret?: MfaSecretVO;
    now: string;
  }): MfaEntity {
    const entity = new MfaEntity(params.id.value, params.now, params.now, {
      authId: params.authId,
      method: params.method,
      secret: params.secret,
      verified: false,
      enabled: false,
      failedAttempts: 0,
    });

    entity.addDomainEvent(
      new MfaSetupStartedEvent({
        aggregateId: params.id.value,
        payload: {
          authId: params.authId.value,
          method: params.method.value,
          startedAt: params.now,
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
    props: MfaEntityProps;
    version?: number;
  }): MfaEntity {
    const entity = new MfaEntity(params.id, params.createdAt, params.updatedAt, params.props);
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
