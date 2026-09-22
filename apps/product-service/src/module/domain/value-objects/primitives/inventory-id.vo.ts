import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

export class InventoryIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): InventoryIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new InvalidValueError('inventory_id', 'InventoryId cannot be empty');
    }
    return new InventoryIdVO(raw);
  }
}
