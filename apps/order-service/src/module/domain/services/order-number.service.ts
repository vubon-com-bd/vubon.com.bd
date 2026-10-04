/**
 * OrderNumberService — generate & validate order numbers
 * @module order-service/domain/services
 *
 * Format: ORD-YYYY-NNNNNN  (e.g., ORD-2026-000123)
 * Uses ORDER_NUMBER_PREFIX and ORDER_NUMBER_SEQUENCE_LENGTH from constants.
 */
import {
  ORDER_NUMBER_PREFIX,
  ORDER_NUMBER_SEQUENCE_LENGTH,
  ORDER_NUMBER_REGEX,
} from '@vubon/shared-constants/business/order';
import { OrderNumberVO } from '../value-objects/primitives/order-number.vo.js';
import { InvalidOrderNumberError } from '../errors/order.errors.js';

export class OrderNumberService {
  /** Generate a new order number from a sequence and optional year. */
  static generate(
    sequence: number,
    year: number = new Date().getFullYear(),
  ): OrderNumberVO {
    if (!Number.isInteger(sequence) || sequence < 1) {
      throw new InvalidOrderNumberError(`Invalid sequence: ${sequence}`);
    }
    const maxSeq = Math.pow(10, ORDER_NUMBER_SEQUENCE_LENGTH) - 1;
    if (sequence > maxSeq) {
      throw new InvalidOrderNumberError(
        `Sequence ${sequence} exceeds max ${maxSeq}`,
      );
    }
    const seq = String(sequence).padStart(ORDER_NUMBER_SEQUENCE_LENGTH, '0');
    return OrderNumberVO.create(`${ORDER_NUMBER_PREFIX}-${year}-${seq}`);
  }

  /** Check if a raw string is a valid order number format. */
  static isValidFormat(raw: string): boolean {
    if (typeof raw !== 'string') return false;
    return ORDER_NUMBER_REGEX.test(raw.trim());
  }

  /** Extract year from an order number. */
  static extractYear(orderNumber: OrderNumberVO): number {
    const parts = orderNumber.value.split('-');
    return parseInt(parts[1] ?? '0', 10);
  }

  /** Extract sequence from an order number. */
  static extractSequence(orderNumber: OrderNumberVO): number {
    const parts = orderNumber.value.split('-');
    return parseInt(parts[2] ?? '0', 10);
  }

  /** Check if two order numbers are from the same year. */
  static isSameYear(a: OrderNumberVO, b: OrderNumberVO): boolean {
    return OrderNumberService.extractYear(a) === OrderNumberService.extractYear(b);
  }

  /**
   * Compute next sequence given the highest existing sequence.
   * Useful for sequential generation (safe for non-concurrent use;
   * in production, DB sequence should be used).
   */
  static nextSequence(highestExisting: number): number {
    if (highestExisting < 0) return 1;
    return highestExisting + 1;
  }
}
