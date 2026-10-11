/**
 * TemplateName Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { NOTIFICATION_TEMPLATE } from '@vubon/shared-constants/platform/notification';

const MIN = 2;
const MAX = NOTIFICATION_TEMPLATE.NAME_MAX_LENGTH;

export class TemplateNameVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TemplateNameVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Template name must be a string', 'name');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN) {
      throw new ValidationError(`Template name too short (min ${MIN})`, 'name');
    }
    if (trimmed.length > MAX) {
      throw new ValidationError(`Template name exceeds ${MAX} chars`, 'name');
    }
    return new TemplateNameVO(trimmed);
  }

  static reconstitute(raw: string): TemplateNameVO {
    return new TemplateNameVO(raw);
  }
}
