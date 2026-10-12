/**
 * VendorName Value Object — business display name
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives/name.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 2;
const MAX_LENGTH = 200;

export class VendorNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VendorNameVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Vendor name must be a string', 'name');
    }
    const normalized = raw.trim().replace(/\s+/g, ' ');
    if (normalized.length < MIN_LENGTH) {
      throw new ValidationError(`Vendor name must be at least ${MIN_LENGTH} chars`, 'name');
    }
    if (normalized.length > MAX_LENGTH) {
      throw new ValidationError(`Vendor name cannot exceed ${MAX_LENGTH} chars`, 'name');
    }
    if (!/^[\p{L}\p{N}\s'.,&()\-]+$/u.test(normalized)) {
      throw new ValidationError('Vendor name contains invalid characters', 'name');
    }
    return new VendorNameVO(normalized);
  }

  static reconstitute(raw: string): VendorNameVO {
    return new VendorNameVO(raw);
  }

  static fromLegalName(legalName: string): VendorNameVO {
    return VendorNameVO.create(legalName);
  }
}
