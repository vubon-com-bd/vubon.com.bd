/**
 * MfaMethod Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { AUTH_MFA_METHOD } from '@vubon/shared-constants/auth';
import { InvalidMfaMethodError } from '../../errors/mfa.errors.js';

const VALID_METHODS: readonly string[] = Object.values(AUTH_MFA_METHOD);

export class MfaMethodVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): MfaMethodVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new InvalidMfaMethodError(String(raw), VALID_METHODS);
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_METHODS.includes(normalized)) {
      throw new InvalidMfaMethodError(normalized, VALID_METHODS);
    }
    return new MfaMethodVO(normalized);
  }

  static totp(): MfaMethodVO { return new MfaMethodVO(AUTH_MFA_METHOD.TOTP); }
  static sms(): MfaMethodVO { return new MfaMethodVO(AUTH_MFA_METHOD.SMS); }
  static email(): MfaMethodVO { return new MfaMethodVO(AUTH_MFA_METHOD.EMAIL); }
  static push(): MfaMethodVO { return new MfaMethodVO(AUTH_MFA_METHOD.PUSH); }
  static webauthn(): MfaMethodVO { return new MfaMethodVO(AUTH_MFA_METHOD.WEBAUTHN); }
  static backupCode(): MfaMethodVO { return new MfaMethodVO(AUTH_MFA_METHOD.BACKUP_CODE); }

  static reconstitute(raw: string): MfaMethodVO {
    return new MfaMethodVO(raw);
  }

  isTotp(): boolean { return this.value === AUTH_MFA_METHOD.TOTP; }
  isSms(): boolean { return this.value === AUTH_MFA_METHOD.SMS; }
  isEmail(): boolean { return this.value === AUTH_MFA_METHOD.EMAIL; }
  isPush(): boolean { return this.value === AUTH_MFA_METHOD.PUSH; }
  isWebauthn(): boolean { return this.value === AUTH_MFA_METHOD.WEBAUTHN; }
  isBackupCode(): boolean { return this.value === AUTH_MFA_METHOD.BACKUP_CODE; }
  isPrimary(): boolean { return this.isTotp() || this.isWebauthn(); }
}
