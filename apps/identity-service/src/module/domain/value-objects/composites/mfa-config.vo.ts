/**
 * MfaConfigVO — MFA setup + status
 * @module identity-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { AuthIdVO } from '../primitives/auth-id.vo.js';
import { MfaMethodVO } from '../primitives/mfa-method.vo.js';
import { MfaSecretVO } from '../primitives/mfa-secret.vo.js';

export interface MfaConfigVOProps {
  readonly authId: AuthIdVO;
  readonly enabled: boolean;
  readonly primaryMethod: MfaMethodVO;
  readonly backupMethods: readonly MfaMethodVO[];
  readonly secret?: MfaSecretVO;
  readonly verified: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly verifiedAt?: string;
}

export class MfaConfigVO extends BaseVO<MfaConfigVOProps> {
  private constructor(props: MfaConfigVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: MfaConfigVOProps): MfaConfigVO {
    const vo = new MfaConfigVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: MfaConfigVOProps): MfaConfigVO {
    return new MfaConfigVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.enabled && !v.verified) {
      throw new ValidationError(
        'MFA cannot be enabled before verification',
        'enabled',
      );
    }
    if (v.enabled && v.primaryMethod.isTotp() && !v.secret) {
      throw new ValidationError(
        'TOTP method requires a secret',
        'secret',
      );
    }
    // ✅ Use structural equality instead of Array.includes (reference equality)
    const isPrimaryInBackup = v.backupMethods.some((m) => m.equals(v.primaryMethod));
    if (isPrimaryInBackup) {
      throw new ValidationError(
        'primaryMethod cannot be in backupMethods',
        'backupMethods',
      );
    }
  }

  get authId(): AuthIdVO { return this.value.authId; }
  get enabled(): boolean { return this.value.enabled; }
  get primaryMethod(): MfaMethodVO { return this.value.primaryMethod; }
  get backupMethods(): readonly MfaMethodVO[] { return this.value.backupMethods; }
  get secret(): MfaSecretVO | undefined { return this.value.secret; }
  get verified(): boolean { return this.value.verified; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }
  get verifiedAt(): string | undefined { return this.value.verifiedAt; }

  isEnabledAndVerified(): boolean { return this.enabled && this.verified; }
  hasMethod(m: MfaMethodVO): boolean {
    return this.primaryMethod.equals(m) || this.backupMethods.some((x) => x.equals(m));
  }
}
