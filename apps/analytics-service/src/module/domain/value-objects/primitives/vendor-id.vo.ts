/**
 * Vendor ID Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Cross-service Vendor reference।
 * Business Rule:
 * - UUID format
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import type { VendorId } from '@vubon/shared-types/common';

export class VendorIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VendorIdVO {
    if (typeof raw !== 'string') {
      throw new Error('VendorId must be a string');
    }

    const trimmed = raw.trim();

    if (!REGEX.UUID.test(trimmed)) {
      throw new Error(`VendorId must be a valid UUID: "${trimmed}"`);
    }

    return new VendorIdVO(trimmed);
  }

  static fromBranded(id: VendorId): VendorIdVO {
    return VendorIdVO.create(id as unknown as string);
  }

  toBranded(): VendorId {
    return this.value as unknown as VendorId;
  }
}
