/**
 * BusinessDescription Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * Business Rules:
 * - Min 20, Max 5000 chars
 * - Cannot be only whitespace
 * - Preserves internal formatting (newlines, paragraphs)
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 20;
const MAX_LENGTH = 5000;

export class BusinessDescriptionVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BusinessDescriptionVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('BusinessDescription must be a string', 'description');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `BusinessDescription must be ${MIN_LENGTH}-${MAX_LENGTH} chars`,
        'description',
      );
    }
    return new BusinessDescriptionVO(trimmed);
  }

  static reconstitute(raw: string): BusinessDescriptionVO {
    return new BusinessDescriptionVO(raw);
  }

  get wordCount(): number {
    return this.value.split(/\s+/).filter(Boolean).length;
  }

  get paragraphCount(): number {
    return this.value.split(/\n\s*\n/).filter(Boolean).length;
  }

  isShort(): boolean {
    return this.value.length <= 200;
  }

  excerpt(maxChars = 160): string {
    if (this.value.length <= maxChars) return this.value;
    return `${this.value.slice(0, maxChars).trimEnd()}...`;
  }
}
