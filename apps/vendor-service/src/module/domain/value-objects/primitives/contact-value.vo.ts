import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { InvalidContactValueError } from '../../errors/vendor.errors';

export class ContactValueVO extends BaseCodeVO {
  static create(value: string): ContactValueVO {
    const trimmed = value.trim();
    if (trimmed.length < 3 || trimmed.length > 500) {
      throw new InvalidContactValueError(value);
    }
    return new ContactValueVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }
}
