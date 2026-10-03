/**
 * AddressId Value Object
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import type { AddressId } from '@vubon/shared-types/common';

export class AddressIdVO extends BaseIdVO<AddressId> {
  private constructor(value: AddressId) {
    super(value);
  }

  static create(raw: string): AddressIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new Error('AddressId cannot be empty');
    }
    return new AddressIdVO(raw.trim() as AddressId);
  }
}
