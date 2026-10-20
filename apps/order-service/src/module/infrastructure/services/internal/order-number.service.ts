/**
 * OrderNumberService — generates order numbers (ORD-YYYY-NNNNNN)
 * @module order-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { ORDER_NUMBER_PREFIX, ORDER_NUMBER_SEQUENCE_LENGTH } from '@vubon/shared-constants/business/order';

@Injectable()
export class OrderNumberService {
  generate(year: number, sequence: number): string {
    const padded = String(sequence).padStart(ORDER_NUMBER_SEQUENCE_LENGTH, '0');
    return `${ORDER_NUMBER_PREFIX}-${year}-${padded}`;
  }

  parse(orderNumber: string): { year: number; sequence: number } {
    const parts = orderNumber.split('-');
    return {
      year: Number(parts[1]),
      sequence: Number(parts[2]),
    };
  }

  nextSequence(currentOrderNumber: string | null): number {
    if (!currentOrderNumber) return 1;
    return this.parse(currentOrderNumber).sequence + 1;
  }
}
