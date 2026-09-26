import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidContactValueError } from '../../errors/contact.errors';

export class ContactValueVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ContactValueVO {
    const trimmed = raw.trim();
    if (trimmed.length < 3 || trimmed.length > 255) {
      throw new InvalidContactValueError('contact', raw);
    }
    return new ContactValueVO(trimmed);
  }
}
