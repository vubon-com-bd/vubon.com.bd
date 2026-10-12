/**
 * TwoFactorMethod Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { InvalidTwoFactorMethodError } from '../../errors/twofa.errors.js';

export type TwoFactorMethodValue =
  | 'totp'
  | 'sms'
  | 'email'
  | 'push'
  | 'webauthn'
  | 'backup_code';

const VALID_METHODS: readonly TwoFactorMethodValue[] = [
  'totp',
  'sms',
  'email',
  'push',
  'webauthn',
  'backup_code',
];

export class TwoFactorMethodVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TwoFactorMethodVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new InvalidTwoFactorMethodError(String(raw), VALID_METHODS);
    }
    const normalized = raw.trim().toLowerCase().replace(/\s+/g, '_');
    if (!VALID_METHODS.includes(normalized as TwoFactorMethodValue)) {
      throw new InvalidTwoFactorMethodError(normalized, VALID_METHODS);
    }
    return new TwoFactorMethodVO(normalized);
  }

  static totp(): TwoFactorMethodVO { return new TwoFactorMethodVO('totp'); }
  static sms(): TwoFactorMethodVO { return new TwoFactorMethodVO('sms'); }
  static email(): TwoFactorMethodVO { return new TwoFactorMethodVO('email'); }
  static push(): TwoFactorMethodVO { return new TwoFactorMethodVO('push'); }
  static webauthn(): TwoFactorMethodVO { return new TwoFactorMethodVO('webauthn'); }
  static backupCode(): TwoFactorMethodVO { return new TwoFactorMethodVO('backup_code'); }

  static reconstitute(raw: string): TwoFactorMethodVO {
    return new TwoFactorMethodVO(raw);
  }

  isStrong(): boolean {
    return ['totp', 'webauthn'].includes(this.value);
  }
  isFallback(): boolean {
    return ['backup_code', 'email'].includes(this.value);
  }
}
