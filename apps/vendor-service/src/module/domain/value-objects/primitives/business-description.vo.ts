/**
 * BusinessDescription Value Object — long-form vendor description
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 10;
const MAX_LENGTH = 5000;

export class BusinessDescriptionVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BusinessDescriptionVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Business description must be a string', 'description');
    }
    const normalized = raw.trim();
    if (normalized.length < MIN_LENGTH) {
      throw new ValidationError(
        `Business description must be at least ${MIN_LENGTH} chars`,
        'description',
      );
    }
    if (normalized.length > MAX_LENGTH) {
      throw new ValidationError(
        `Business description cannot exceed ${MAX_LENGTH} chars`,
        'description',
      );
    }
    return new BusinessDescriptionVO(normalized);
  }

  static reconstitute(raw: string): BusinessDescriptionVO {
    return new BusinessDescriptionVO(raw);
  }

  static empty(): BusinessDescriptionVO {
    return new BusinessDescriptionVO('');
  }

  get wordCount(): number {
    return this.value.trim().length === 0 ? 0 : this.value.trim().split(/\s+/).length;
  }

  get firstSentence(): string {
    const match = this.value.match(/^[^.!?]*[.!?]/);
    return match ? match[0].trim() : this.value;
  }

  get preview(): string {
    return this.value.length <= 160 ? this.value : `${this.value.slice(0, 157)}...`;
  }
}
