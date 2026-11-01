/**
 * OrderNumber Value Object
 * @module order-service/domain/value-objects/primitives
 *
 * Format: ORD-YYYY-NNNNNN (e.g. ORD-2024-000123)
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import {
  ORDER_NUMBER_REGEX,
  ORDER_NUMBER_PREFIX,
  ORDER_NUMBER_SEQUENCE_LENGTH,
} from '@vubon/shared-constants/business/order';

export class OrderNumberVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OrderNumberVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('OrderNumber cannot be empty', 'orderNumber');
    }
    const trimmed = raw.trim().toUpperCase();
    if (!ORDER_NUMBER_REGEX.test(trimmed)) {
      throw new ValidationError(
        `OrderNumber must match format ${ORDER_NUMBER_PREFIX}-YYYY-NNNNNN`,
        'orderNumber',
      );
    }
    return new OrderNumberVO(trimmed);
  }

  static fromParts(year: number, sequence: number): OrderNumberVO {
    const padded = String(sequence).padStart(ORDER_NUMBER_SEQUENCE_LENGTH, '0');
    return new OrderNumberVO(`${ORDER_NUMBER_PREFIX}-${year}-${padded}`);
  }

  static reconstitute(raw: string): OrderNumberVO {
    return new OrderNumberVO(raw);
  }

  get year(): number {
    return Number(this.value.split('-')[1]);
  }

  get sequence(): number {
    return Number(this.value.split('-')[2]);
  }
}
