/**
 * AuthBiometricVO — Snapshot of a biometric enrollment
 * @module auth-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { BiometricIdVO } from '../primitives/biometric-id.vo';

export type BiometricKind = 'fingerprint' | 'face' | 'voice' | 'iris';

export interface AuthBiometricVOProps {
  readonly userId: UserIdVO;
  readonly biometricId: BiometricIdVO;
  readonly kind: BiometricKind;
  readonly deviceId?: string;
  readonly enrolledAt: number;
}

export class AuthBiometricVO extends BaseVO<AuthBiometricVOProps> {
  private constructor(props: AuthBiometricVOProps) {
    super(props);
  }

  static of(props: AuthBiometricVOProps): AuthBiometricVO {
    return new AuthBiometricVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get kind(): BiometricKind { return this.value.kind; }
  get biometricId(): BiometricIdVO { return this.value.biometricId; }

  isDeviceBound(): boolean { return this.value.deviceId !== undefined; }
}
