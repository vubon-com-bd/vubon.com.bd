/**
 * WarehouseName Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN = 3;
const MAX = 150;

export class WarehouseNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): WarehouseNameVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('WarehouseName must be a string', 'name');
    }
    const normalized = raw.trim().replace(/\s+/g, ' ');
    if (normalized.length < MIN || normalized.length > MAX) {
      throw new ValidationError(
        `WarehouseName must be ${MIN}-${MAX} chars`,
        'name',
      );
    }
    return new WarehouseNameVO(normalized);
  }

  static reconstitute(raw: string): WarehouseNameVO {
    return new WarehouseNameVO(raw);
  }
}
