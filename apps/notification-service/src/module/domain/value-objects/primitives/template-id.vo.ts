/**
 * TemplateId Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class TemplateIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TemplateIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('TemplateId cannot be empty', 'templateId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('TemplateId must be a valid UUID', 'templateId');
    }
    return new TemplateIdVO(trimmed);
  }

  static reconstitute(raw: string): TemplateIdVO {
    return new TemplateIdVO(raw);
  }
}
