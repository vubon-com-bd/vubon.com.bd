/**
 * InventoryLocationCode Value Object
 * @module logistics-service/domain/value-objects/primitives
 *
 * Format: 3-50 chars uppercase alphanumeric + dash
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const PATTERN = /^[A-Z0-9][A-Z0-9-]{1,48}[A-Z0-9]$/;
const MIN = 3;
const MAX = 50;

export class InventoryLocationCodeVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): InventoryLocationCodeVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('InventoryLocationCode cannot be empty', 'code');
    }
    const normalized = raw.trim().toUpperCase();
    if (normalized.length < MIN || normalized.length > MAX) {
      throw new ValidationError(
        `InventoryLocationCode must be ${MIN}-${MAX} chars`,
        'code',
      );
    }
    if (!PATTERN.test(normalized)) {
      throw new ValidationError(
        'InventoryLocationCode must be uppercase alphanumeric with dashes',
        'code',
      );
    }
    return new InventoryLocationCodeVO(normalized);
  }

  static reconstitute(raw: string): InventoryLocationCodeVO {
    return new InventoryLocationCodeVO(raw);
  }
}
