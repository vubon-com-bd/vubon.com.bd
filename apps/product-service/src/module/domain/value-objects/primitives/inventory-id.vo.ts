/**
 * InventoryId Value Object
 * @module product-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class InventoryIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): InventoryIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('InventoryId cannot be empty', 'inventoryId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('InventoryId must be a valid UUID', 'inventoryId');
    }
    return new InventoryIdVO(trimmed);
  }

  static reconstitute(raw: string): InventoryIdVO { return new InventoryIdVO(raw); }
}
