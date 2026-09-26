import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { InvalidContactTypeError } from '../../errors/vendor.errors';

const VALID = new Set<string>(['email', 'phone', 'whatsapp', 'fax', 'other']);

export class ContactTypeVO extends BaseTypeVO {
  static create(value: string): ContactTypeVO {
    if (!VALID.has(value)) {
      throw new InvalidContactTypeError(value);
    }
    return new ContactTypeVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
