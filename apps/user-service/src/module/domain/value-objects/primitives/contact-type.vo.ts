import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidContactTypeError } from '../../errors/contact.errors';

const VALID = new Set(['email', 'phone', 'whatsapp', 'telegram']);

export class ContactTypeVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ContactTypeVO {
    if (!VALID.has(raw)) {
      throw new InvalidContactTypeError(raw);
    }
    return new ContactTypeVO(raw);
  }
}
