/**
 * OrderNumber Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import {
  ORDER_NUMBER_REGEX,
  ORDER_NUMBER_PREFIX,
  ORDER_NUMBER_SEQUENCE_LENGTH,
} from '@vubon/shared-constants/business/order';
import { InvalidOrderNumberError } from '../../errors/order.errors.js';

export class OrderNumberVO extends BaseCodeVO {
  private static readonly MAX_LENGTH = 50;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OrderNumberVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new InvalidOrderNumberError(String(raw));
    }
    const trimmed = raw.trim();
    if (trimmed.length > OrderNumberVO.MAX_LENGTH) {
      throw new InvalidOrderNumberError(trimmed);
    }
    if (!ORDER_NUMBER_REGEX.test(trimmed)) {
      throw new InvalidOrderNumberError(trimmed);
    }
    return new OrderNumberVO(trimmed);
  }

  static generate(sequence: number, year: number = new Date().getFullYear()): OrderNumberVO {
    if (!Number.isInteger(sequence) || sequence < 1) {
      throw new InvalidOrderNumberError(`Invalid sequence: ${sequence}`);
    }
    const seq = String(sequence).padStart(ORDER_NUMBER_SEQUENCE_LENGTH, '0');
    return new OrderNumberVO(`${ORDER_NUMBER_PREFIX}-${year}-${seq}`);
  }

  static reconstitute(raw: string): OrderNumberVO {
    return new OrderNumberVO(raw);
  }

  get year(): number {
    const parts = this.value.split('-');
    return parseInt(parts[1] ?? '0', 10);
  }

  get sequence(): number {
    const parts = this.value.split('-');
    return parseInt(parts[2] ?? '0', 10);
  }
}
