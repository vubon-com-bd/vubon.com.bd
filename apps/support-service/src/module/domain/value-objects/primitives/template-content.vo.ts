/**
 * TemplateContentVO — Message template body with placeholders
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseCodeVO
 * Business: supports {{variable}} placeholders
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VALIDATION } from '@vubon/shared-constants/common';

const MIN_LENGTH = 1;
const MAX_LENGTH = VALIDATION.DESCRIPTION_MAX_LENGTH;
const PLACEHOLDER_PATTERN = /\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g;

export class TemplateContentVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TemplateContentVO {
    BaseCodeVO.validateNonEmpty(raw, 'TemplateContent');
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH) {
      throw new ValidationError(
        `TemplateContent too short (min ${MIN_LENGTH})`,
        'templateContent',
      );
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `TemplateContent too long (max ${MAX_LENGTH})`,
        'templateContent',
      );
    }
    return new TemplateContentVO(trimmed);
  }

  get placeholders(): readonly string[] {
    const found = new Set<string>();
    const matches = this.value.matchAll(PLACEHOLDER_PATTERN);
    for (const match of matches) {
      if (match[1]) found.add(match[1]);
    }
    return Array.from(found);
  }

  get hasPlaceholders(): boolean {
    return this.placeholders.length > 0;
  }

  render(values: Readonly<Record<string, string | number>>): string {
    return this.value.replace(PLACEHOLDER_PATTERN, (_, key: string) => {
      const replacement = values[key];
      return replacement === undefined ? `{{${key}}}` : String(replacement);
    });
  }

  hasAllValues(values: Readonly<Record<string, unknown>>): boolean {
    return this.placeholders.every((key) => key in values);
  }
}
