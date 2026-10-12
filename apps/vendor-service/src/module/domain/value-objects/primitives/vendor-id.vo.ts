/**
 * VendorId Value Object — UUID v4
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import type { VendorId } from '@vubon/shared-types/common';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export class VendorIdVO extends BaseIdVO<VendorId> {
  private constructor(value: VendorId) {
    super(value);
  }

  static create(raw: string): VendorIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Vendor ID must be a string', 'id');
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new ValidationError('Vendor ID cannot be empty', 'id');
    }
    if (!UUID_PATTERN.test(trimmed)) {
      throw new ValidationError('Vendor ID must be a valid UUID', 'id');
    }
    return new VendorIdVO(trimmed as VendorId);
  }

  static reconstitute(raw: string): VendorIdVO {
    return new VendorIdVO(raw as VendorId);
  }
}
