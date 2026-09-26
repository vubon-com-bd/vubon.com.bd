import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { InvalidContactIdError } from '../../errors/vendor.errors';

export class ContactIdVO extends BaseIdVO {
  static create(value: string): ContactIdVO {
    if (!value || value.trim().length === 0) {
      throw new InvalidContactIdError(value);
    }
    return new ContactIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
