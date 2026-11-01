/**
 * BiometricVO
 * @module identity-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { BiometricIdVO } from '../primitives/biometric-id.vo.js';
import { AuthIdVO } from '../primitives/auth-id.vo.js';
import { DeviceIdVO } from '../primitives/device-id.vo.js';
import { BiometricTypeVO } from '../primitives/biometric-type.vo.js';

export interface BiometricVOProps {
  readonly id: BiometricIdVO;
  readonly authId: AuthIdVO;
  readonly deviceId?: DeviceIdVO;
  readonly type: BiometricTypeVO;
  readonly enabled: boolean;
  readonly publicKeyHash?: string;
  readonly failedAttempts: number;
  readonly maxAttempts: number;
  readonly lastUsedAt?: string;
  readonly lastFailedAt?: string;
  readonly enabledAt?: string;
  readonly disabledAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class BiometricVO extends BaseVO<BiometricVOProps> {
  private constructor(props: BiometricVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: BiometricVOProps): BiometricVO {
    const vo = new BiometricVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: BiometricVOProps): BiometricVO {
    return new BiometricVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.failedAttempts < 0 || v.failedAttempts > v.maxAttempts) {
      throw new ValidationError(
        `failedAttempts must be between 0 and ${v.maxAttempts}`,
        'failedAttempts',
      );
    }
    if (v.enabled && !v.enabledAt) {
      throw new ValidationError('enabledAt is required when enabled', 'enabledAt');
    }
  }

  get id(): BiometricIdVO { return this.value.id; }
  get authId(): AuthIdVO { return this.value.authId; }
  get deviceId(): DeviceIdVO | undefined { return this.value.deviceId; }
  get type(): BiometricTypeVO { return this.value.type; }
  get enabled(): boolean { return this.value.enabled; }
  get publicKeyHash(): string | undefined { return this.value.publicKeyHash; }
  get failedAttempts(): number { return this.value.failedAttempts; }
  get maxAttempts(): number { return this.value.maxAttempts; }
  get lastUsedAt(): string | undefined { return this.value.lastUsedAt; }
  get lastFailedAt(): string | undefined { return this.value.lastFailedAt; }
  get enabledAt(): string | undefined { return this.value.enabledAt; }
  get disabledAt(): string | undefined { return this.value.disabledAt; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isExhausted(): boolean {
    return this.value.failedAttempts >= this.value.maxAttempts;
  }
  remainingAttempts(): number {
    return Math.max(0, this.value.maxAttempts - this.value.failedAttempts);
  }
}
