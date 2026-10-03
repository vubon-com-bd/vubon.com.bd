/**
 * ContactId Value Object
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class ContactIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ContactIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new Error('ContactId cannot be empty');
    }
    return new ContactIdVO(raw.trim());
  }
}
