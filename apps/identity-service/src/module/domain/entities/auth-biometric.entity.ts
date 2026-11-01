/**
 * AuthBiometricEntity — AggregateRoot
 * @module identity-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import { BiometricIdVO } from '../value-objects/primitives/biometric-id.vo.js';
import { AuthIdVO } from '../value-objects/primitives/auth-id.vo.js';
import { BiometricTypeVO } from '../value-objects/primitives/biometric-type.vo.js';
import { DeviceIdVO } from '../value-objects/primitives/device-id.vo.js';

import {
  BiometricEnabledEvent,
  BiometricDisabledEvent,
} from '../events/biometric.events.js';

export interface AuthBiometricEntityProps {
  readonly authId: AuthIdVO;
  readonly type: BiometricTypeVO;
  deviceId?: DeviceIdVO;
  enabled: boolean;
  publicKeyHash?: string;
  failedAttempts: number;
  maxAttempts: number;
  lastUsedAt?: string;
  lastFailedAt?: string;
  enabledAt?: string;
  disabledAt?: string;
}

export class AuthBiometricEntity extends AggregateRoot<string> {
  private props: AuthBiometricEntityProps;

  private constructor(id: BiometricIdVO, createdAt: string, updatedAt: string, props: AuthBiometricEntityProps) {
    super(id.value, createdAt, updatedAt, null);
    this.props = props;
  }

  get biometricId(): BiometricIdVO { return BiometricIdVO.reconstitute(this.id); }
  get authId(): AuthIdVO { return this.props.authId; }
  get type(): BiometricTypeVO { return this.props.type; }
  get deviceId(): DeviceIdVO | undefined { return this.props.deviceId; }
  get enabled(): boolean { return this.props.enabled; }
  get publicKeyHash(): string | undefined { return this.props.publicKeyHash; }
  get failedAttempts(): number { return this.props.failedAttempts; }
  get maxAttempts(): number { return this.props.maxAttempts; }
  get lastUsedAt(): string | undefined { return this.props.lastUsedAt; }
  get lastFailedAt(): string | undefined { return this.props.lastFailedAt; }
  get enabledAt(): string | undefined { return this.props.enabledAt; }
  get disabledAt(): string | undefined { return this.props.disabledAt; }

  isExhausted(): boolean { return this.props.failedAttempts >= this.props.maxAttempts; }
  remainingAttempts(): number { return Math.max(0, this.props.maxAttempts - this.props.failedAttempts); }

  enable(publicKeyHash: string, now: string = new Date().toISOString()): void {
    if (this.props.enabled) {
      throw new BusinessRuleError(
        'Biometric already enabled',
        'BIOMETRIC_ALREADY_ENABLED',
        { authId: this.props.authId.value },
      );
    }
    this.props = {
      ...this.props,
      enabled: true,
      publicKeyHash,
      enabledAt: now,
      disabledAt: undefined,
      failedAttempts: 0,
    };
    this.addDomainEvent(
      new BiometricEnabledEvent({
        aggregateId: this.id,
        payload: {
          authId: this.props.authId.value,
          biometricId: this.id,
          type: this.props.type.value,
          enabledAt: now,
        },
        version: this.version + 1,
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  disable(now: string = new Date().toISOString()): void {
    if (!this.props.enabled) return;
    this.props = { ...this.props, enabled: false, disabledAt: now, publicKeyHash: undefined };
    this.addDomainEvent(
      new BiometricDisabledEvent({
        aggregateId: this.id,
        payload: { authId: this.props.authId.value, biometricId: this.id, disabledAt: now },
        version: this.version + 1,
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  recordSuccess(now: string = new Date().toISOString()): void {
    this.props = { ...this.props, lastUsedAt: now, failedAttempts: 0 };
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  recordFailure(now: string = new Date().toISOString()): void {
    this.props = {
      ...this.props,
      failedAttempts: this.props.failedAttempts + 1,
      lastFailedAt: now,
    };
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  static create(params: {
    id: BiometricIdVO;
    authId: AuthIdVO;
    type: BiometricTypeVO;
    deviceId?: DeviceIdVO;
    maxAttempts?: number;
    now: string;
  }): AuthBiometricEntity {
    return new AuthBiometricEntity(params.id, params.now, params.now, {
      authId: params.authId,
      type: params.type,
      deviceId: params.deviceId,
      enabled: false,
      failedAttempts: 0,
      maxAttempts: params.maxAttempts ?? 5,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: AuthBiometricEntityProps;
    version?: number;
  }): AuthBiometricEntity {
    const entity = new AuthBiometricEntity(BiometricIdVO.reconstitute(params.id), params.createdAt, params.updatedAt, params.props);
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
