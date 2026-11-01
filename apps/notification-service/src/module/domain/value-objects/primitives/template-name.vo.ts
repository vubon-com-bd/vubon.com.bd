/**
 * TemplateName Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { InvalidTemplateVariableError } from '@domain/errors/template.errors.js';

const MIN_LENGTH = 3;
const MAX_LENGTH = 100;

export class TemplateNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TemplateNameVO {
    if (typeof raw !== 'string') {
      throw new InvalidTemplateVariableError('name', 'must be a string');
    }
    const normalized = raw.trim().replace(/\s+/g, ' ');
    if (normalized.length < MIN_LENGTH) {
      throw new InvalidTemplateVariableError('name', `too short (min ${MIN_LENGTH})`);
    }
    if (normalized.length > MAX_LENGTH) {
      throw new InvalidTemplateVariableError('name', `too long (max ${MAX_LENGTH})`);
    }
    return new TemplateNameVO(normalized);
  }

  static reconstitute(raw: string): TemplateNameVO {
    return new TemplateNameVO(raw);
  }

  toSlug(): string {
    return this.value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
}
