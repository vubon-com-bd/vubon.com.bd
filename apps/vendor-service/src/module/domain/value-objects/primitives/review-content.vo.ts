/**
 * ReviewContent Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * Business Rules:
 * - 10 – 5000 chars
 * - Cannot be only whitespace
 * - Preserves paragraph structure
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_REVIEW } from '@vubon/shared-constants/business';

const MIN_LENGTH = VENDOR_REVIEW.MIN_CONTENT_LENGTH;  // 10
const MAX_LENGTH = VENDOR_REVIEW.MAX_CONTENT_LENGTH;  // 5000

export class ReviewContentVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ReviewContentVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ReviewContent must be a string', 'content');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH) {
      throw new ValidationError(
        `ReviewContent must be at least ${MIN_LENGTH} chars`,
        'content',
      );
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `ReviewContent cannot exceed ${MAX_LENGTH} chars`,
        'content',
      );
    }
    return new ReviewContentVO(trimmed);
  }

  static reconstitute(raw: string): ReviewContentVO {
    return new ReviewContentVO(raw);
  }

  get wordCount(): number {
    return this.value.split(/\s+/).filter(Boolean).length;
  }

  isShort(): boolean {
    return this.value.length <= 100;
  }

  isDetailed(): boolean {
    return this.value.length >= 500;
  }

  excerpt(maxChars = 160): string {
    if (this.value.length <= maxChars) return this.value;
    return `${this.value.slice(0, maxChars).trimEnd()}...`;
  }
}
