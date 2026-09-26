/**
 * TemplateIdVO — Support message template identifier
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseIdVO
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const PREFIX = 'tpl_';
const MIN_LENGTH = 6;
const MAX_LENGTH = 64;

export class TemplateIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TemplateIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('TemplateId must be a string', 'templateId');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `TemplateId length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
        'templateId',
      );
    }
    return new TemplateIdVO(trimmed);
  }

  static fromSlug(slug: string): TemplateIdVO {
    if (!slug || slug.trim().length === 0) {
      throw new ValidationError('TemplateId slug required', 'templateId');
    }
    const normalized = slug.trim().toLowerCase().replace(/\s+/g, '_');
    return TemplateIdVO.create(`${PREFIX}${normalized}`);
  }
}
