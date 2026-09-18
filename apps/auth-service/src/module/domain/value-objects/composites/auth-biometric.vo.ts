import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { BiometricIdVO } from '../primitives/biometric-id.vo';

export interface AuthBiometricProps {
  readonly userId: UserIdVO;
  readonly biometricId: BiometricIdVO;
  readonly type: 'fingerprint' | 'face' | 'voice' | 'iris';
  readonly isEnabled: boolean;
  readonly enrolledAt: Date | null;
  readonly lastUsedAt: Date | null;
}

export class AuthBiometricVO extends BaseVO<AuthBiometricProps> {
  private constructor(props: AuthBiometricProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: AuthBiometricProps): AuthBiometricVO {
    return new AuthBiometricVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get biometricId(): BiometricIdVO { return this.value.biometricId; }
  get type(): AuthBiometricProps['type'] { return this.value.type; }
  get isEnabled(): boolean { return this.value.isEnabled; }
  get enrolledAt(): Date | null { return this.value.enrolledAt; }
  get lastUsedAt(): Date | null { return this.value.lastUsedAt; }
}
