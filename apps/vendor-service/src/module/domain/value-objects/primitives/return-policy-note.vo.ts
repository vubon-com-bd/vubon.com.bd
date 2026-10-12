/**
 * ReturnPolicyNote Value Object — free-text policy notes
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX_LENGTH = 1000;
const MIN_LENGTH = 0;

export class ReturnPolicyNoteVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ReturnPolicyNoteVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Return policy note must be a string', 'returnPolicyNote');
    }
    const normalized = raw.trim();
    if (normalized.length < MIN_LENGTH) {
      throw new ValidationError('Return policy note is too short', 'returnPolicyNote');
    }
    if (normalized.length > MAX_LENGTH) {
      throw new ValidationError(
        `Return policy note cannot exceed ${MAX_LENGTH} chars`,
        'returnPolicyNote',
      );
    }
    return new ReturnPolicyNoteVO(normalized);
  }

  static reconstitute(raw: string): ReturnPolicyNoteVO {
    return new ReturnPolicyNoteVO(raw);
  }

  static empty(): ReturnPolicyNoteVO {
    return new ReturnPolicyNoteVO('');
  }

  isEmpty(): boolean {
    return this.value.length === 0;
  }

  get preview(): string {
    return this.value.length <= 120 ? this.value : `${this.value.slice(0, 117)}...`;
  }

  get wordCount(): number {
    return this.value.length === 0 ? 0 : this.value.split(/\s+/).length;
  }
}
