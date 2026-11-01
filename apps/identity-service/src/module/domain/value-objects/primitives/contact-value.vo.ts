/**
 * ContactValue Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class ContactValueVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ContactValueVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ContactValue must be a string', 'contactValue');
    }
    const normalized = raw.trim();
    if (normalized.length === 0) {
      throw new ValidationError('ContactValue cannot be empty', 'contactValue');
    }
    if (normalized.length > 255) {
      throw new ValidationError('ContactValue exceeds 255 chars', 'contactValue');
    }
    return new ContactValueVO(normalized);
  }

  static reconstitute(raw: string): ContactValueVO {
    return new ContactValueVO(raw);
  }
}
