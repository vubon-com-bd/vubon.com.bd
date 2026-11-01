/**
 * TemplateContent Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidTemplateContentError } from '@domain/errors/template.errors.js';

const MAX_LENGTH = 500_000;
const MIN_LENGTH = 1;

export class TemplateContentVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TemplateContentVO {
    if (typeof raw !== 'string') {
      throw new InvalidTemplateContentError('must be a string');
    }
    if (raw.length < MIN_LENGTH) {
      throw new InvalidTemplateContentError('cannot be empty');
    }
    if (raw.length > MAX_LENGTH) {
      throw new InvalidTemplateContentError(`exceeds maximum length ${MAX_LENGTH}`);
    }
    return new TemplateContentVO(raw);
  }

  static reconstitute(raw: string): TemplateContentVO {
    return new TemplateContentVO(raw);
  }

  get length(): number { return this.value.length; }

  extractVariables(): readonly string[] {
    const matches = this.value.matchAll(/\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g);
    const set = new Set<string>();
    for (const m of matches) {
      if (m[1]) set.add(m[1]);
    }
    return Array.from(set);
  }
}
