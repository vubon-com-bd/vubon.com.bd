/**
 * InventoryLocationId Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class InventoryLocationIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): InventoryLocationIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('InventoryLocationId cannot be empty', 'inventoryLocationId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('InventoryLocationId must be a valid UUID', 'inventoryLocationId');
    }
    return new InventoryLocationIdVO(trimmed);
  }

  static reconstitute(raw: string): InventoryLocationIdVO {
    return new InventoryLocationIdVO(raw);
  }
}
