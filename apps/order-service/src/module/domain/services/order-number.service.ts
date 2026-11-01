/**
 * OrderNumberService
 * @module order-service/domain/services
 *
 * Pure domain service — generates order numbers.
 * Format: ORD-YYYY-NNNNNN (e.g. ORD-2024-000123)
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import {
  ORDER_NUMBER_PREFIX,
  ORDER_NUMBER_SEQUENCE_LENGTH,
} from '@vubon/shared-constants/business/order';

export interface OrderNumberInput {
  readonly year: number;
  readonly sequence: number;
}

export class OrderNumberService {
  /**
   * Generate order number from year + sequence.
   */
  static generate(input: OrderNumberInput): string {
    if (!Number.isInteger(input.year) || input.year < 2000 || input.year > 9999) {
      throw new BusinessRuleError(
        `Invalid year "${input.year}" — must be 2000-9999`,
        'INVALID_ORDER_NUMBER_YEAR',
        { year: input.year },
      );
    }
    if (!Number.isInteger(input.sequence) || input.sequence < 1) {
      throw new BusinessRuleError(
        `Invalid sequence "${input.sequence}" — must be positive integer`,
        'INVALID_ORDER_NUMBER_SEQUENCE',
        { sequence: input.sequence },
      );
    }
    const maxSeq = Math.pow(10, ORDER_NUMBER_SEQUENCE_LENGTH) - 1;
    if (input.sequence > maxSeq) {
      throw new BusinessRuleError(
        `Sequence ${input.sequence} exceeds max ${maxSeq}`,
        'ORDER_NUMBER_SEQUENCE_OVERFLOW',
        { sequence: input.sequence, maxSeq },
      );
    }
    const padded = String(input.sequence).padStart(ORDER_NUMBER_SEQUENCE_LENGTH, '0');
    return `${ORDER_NUMBER_PREFIX}-${input.year}-${padded}`;
  }

  /**
   * Parse existing order number into parts.
   */
  static parse(orderNumber: string): { year: number; sequence: number } {
    if (typeof orderNumber !== 'string') {
      throw new BusinessRuleError(
        'OrderNumber must be a string',
        'INVALID_ORDER_NUMBER_FORMAT',
        { orderNumber },
      );
    }
    const parts = orderNumber.split('-');
    if (parts.length !== 3 || parts[0] !== ORDER_NUMBER_PREFIX) {
      throw new BusinessRuleError(
        `Invalid OrderNumber format: "${orderNumber}"`,
        'INVALID_ORDER_NUMBER_FORMAT',
        { orderNumber },
      );
    }
    return {
      year: Number(parts[1]),
      sequence: Number(parts[2]),
    };
  }

  /**
   * Extract next sequence from current (for idempotency).
   */
  static nextSequence(currentOrderNumber: string | null): number {
    if (!currentOrderNumber) return 1;
    return this.parse(currentOrderNumber).sequence + 1;
  }
}
