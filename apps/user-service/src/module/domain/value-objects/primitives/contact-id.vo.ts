import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidContactIdError } from '../../errors/contact.errors';

export class ContactIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ContactIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new InvalidContactIdError('ContactId cannot be empty');
    }
    return new ContactIdVO(raw);
  }
}
