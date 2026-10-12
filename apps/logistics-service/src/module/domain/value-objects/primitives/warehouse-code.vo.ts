/**
 * WarehouseCode Value Object — WH-XXXX short code
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const WAREHOUSE_CODE_PATTERN = /^[A-Z0-9][A-Z0-9\-_]{1,49}$/;

export class WarehouseCodeVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): WarehouseCodeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Warehouse code must be a string', 'code');
    }
    const cleaned = raw.trim().toUpperCase();
    if (!WAREHOUSE_CODE_PATTERN.test(cleaned)) {
      throw new ValidationError('Warehouse code must be 2-50 uppercase alnum', 'code');
    }
    return new WarehouseCodeVO(cleaned);
  }

  static reconstitute(raw: string): WarehouseCodeVO { return new WarehouseCodeVO(raw); }

  get length(): number { return this.value.length; }
}
