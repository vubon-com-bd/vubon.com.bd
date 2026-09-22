import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidValueError } from '../../errors/invalid-value.errors';

const VALID = new Set<string>([
  'in_stock',
  'low_stock',
  'out_of_stock',
  'discontinued',
]);

export class InventoryStatusVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): InventoryStatusVO {
    if (!VALID.has(raw)) {
      throw new InvalidValueError('inventory_status', `Invalid inventory status: ${raw}`);
    }
    return new InventoryStatusVO(raw);
  }

  isInStock(): boolean { return this.value === 'in_stock'; }
  isOutOfStock(): boolean { return this.value === 'out_of_stock'; }
}
