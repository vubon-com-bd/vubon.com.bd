/**
 * InventoryId Value Object
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class InventoryIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): InventoryIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new Error('InventoryId cannot be empty');
    }
    return new InventoryIdVO(raw.trim());
  }

  static reconstitute(raw: string): InventoryIdVO {
    return new InventoryIdVO(raw);
  }
}
