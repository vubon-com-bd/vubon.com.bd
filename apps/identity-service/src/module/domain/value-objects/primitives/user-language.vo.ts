/**
 * UserLanguage Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class UserLanguageVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserLanguageVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('UserLanguage cannot be empty', 'language');
    }
    const normalized = raw.trim().toLowerCase();
    if (!/^[a-z]{2}(-[a-z]{2})?$/.test(normalized)) {
      throw new ValidationError(
        'UserLanguage must be ISO 639-1 format (e.g., "en", "bn", "en-us")',
        'language',
      );
    }
    return new UserLanguageVO(normalized);
  }

  static english(): UserLanguageVO { return new UserLanguageVO('en'); }
  static bangla(): UserLanguageVO { return new UserLanguageVO('bn'); }

  static reconstitute(raw: string): UserLanguageVO {
    return new UserLanguageVO(raw);
  }

  get isEnglish(): boolean { return this.value === 'en'; }
  get isBangla(): boolean { return this.value === 'bn'; }
  get primaryCode(): string { return this.value.split('-')[0] ?? ''; }
}
