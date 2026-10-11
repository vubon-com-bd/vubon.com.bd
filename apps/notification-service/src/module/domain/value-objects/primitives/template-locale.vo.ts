/**
 * TemplateLocale Value Object — BCP-47-ish short code (en, bn, en-US, bn-BD, ...)
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const PATTERN = /^[a-z]{2}(-[A-Z]{2})?$/;

export class TemplateLocaleVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TemplateLocaleVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Locale must be a string', 'locale');
    }
    const trimmed = raw.trim();
    if (!PATTERN.test(trimmed)) {
      throw new ValidationError(`Invalid locale format: ${raw}`, 'locale');
    }
    return new TemplateLocaleVO(trimmed);
  }

  static reconstitute(raw: string): TemplateLocaleVO {
    return new TemplateLocaleVO(raw);
  }

  static en(): TemplateLocaleVO { return new TemplateLocaleVO('en'); }
  static bn(): TemplateLocaleVO { return new TemplateLocaleVO('bn'); }

  get language(): string {
    return this.value.split('-')[0] ?? this.value;
  }

  get region(): string | undefined {
    return this.value.split('-')[1];
  }
}
