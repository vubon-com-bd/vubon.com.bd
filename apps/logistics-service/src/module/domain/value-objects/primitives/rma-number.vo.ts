/**
 * RmaNumber Value Object — RMA-YYYY-XXXXXX
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { RETURN_SHIPMENT } from '@vubon/shared-constants/logistics';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const RMA_PATTERN = /^RMA-\d{4}-[A-Z0-9]{6}$/;

export class RmaNumberVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static generate(sequence: number, year = new Date().getFullYear()): RmaNumberVO {
    if (!Number.isInteger(sequence) || sequence < 0) {
      throw new ValidationError('RMA sequence must be non-negative integer', 'sequence');
    }
    const padded = String(sequence).padStart(6, '0');
    return new RmaNumberVO(`${RETURN_SHIPMENT.RMA_PREFIX}-${year}-${padded}`);
  }

  static create(raw: string): RmaNumberVO {
    if (typeof raw !== 'string' || !RMA_PATTERN.test(raw.trim().toUpperCase())) {
      throw new ValidationError('Invalid RMA number format (expected RMA-YYYY-XXXXXX)', 'rmaNumber');
    }
    return new RmaNumberVO(raw.trim().toUpperCase());
  }

  static reconstitute(raw: string): RmaNumberVO { return new RmaNumberVO(raw); }

  get year(): number { return Number(this.value.split('-')[1]); }
  get sequence(): number { return Number(this.value.split('-')[2]); }
}
