/**
 * WarehouseCode Value Object
 * @module logistics-service/domain/value-objects/primitives
 *
 * Format: 3-20 chars, uppercase alphanumeric + dash
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const PATTERN = /^[A-Z0-9][A-Z0-9-]{1,18}[A-Z0-9]$/;
const MIN = 3;
const MAX = 20;

export class WarehouseCodeVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): WarehouseCodeVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('WarehouseCode cannot be empty', 'code');
    }
    const normalized = raw.trim().toUpperCase();
    if (normalized.length < MIN || normalized.length > MAX) {
      throw new ValidationError(
        `WarehouseCode must be ${MIN}-${MAX} chars`,
        'code',
      );
    }
    if (!PATTERN.test(normalized)) {
      throw new ValidationError(
        'WarehouseCode must be uppercase alphanumeric with dashes (start/end alphanumeric)',
        'code',
      );
    }
    return new WarehouseCodeVO(normalized);
  }

  static reconstitute(raw: string): WarehouseCodeVO {
    return new WarehouseCodeVO(raw);
  }
}
