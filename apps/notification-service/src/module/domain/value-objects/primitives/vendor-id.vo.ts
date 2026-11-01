/**
 * VendorId Value Object (Cross-Service Reference)
 * @module notification-service/domain/value-objects/primitives
 *
 * ⚠️ External Aggregate Reference — Vendor service এর Vendor।
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import type { VendorId } from '@vubon/shared-types/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX_LENGTH = 128;

export class VendorIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VendorIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('VendorId cannot be empty', 'vendorId');
    }
    const trimmed = raw.trim();
    if (trimmed.length > MAX_LENGTH) {
      throw new ValidationError(`VendorId exceeds ${MAX_LENGTH} chars`, 'vendorId');
    }
    return new VendorIdVO(trimmed);
  }

  static reconstitute(raw: string): VendorIdVO {
    return new VendorIdVO(raw);
  }

  toBranded(): VendorId {
    return this.value as VendorId;
  }

  static fromBranded(branded: VendorId): VendorIdVO {
    return new VendorIdVO(branded as string);
  }
}
