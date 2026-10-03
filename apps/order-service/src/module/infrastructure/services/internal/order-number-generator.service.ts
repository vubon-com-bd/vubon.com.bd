/**
 * OrderNumberGeneratorService — DI-injectable wrapper around OrderNumberService
 * @module order-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';
import { OrderNumberVO } from '../../../domain/value-objects/primitives/order-number.vo.js';
import { OrderNumberService } from '../../../domain/services/order-number.service.js';

export const ORDER_NUMBER_GENERATOR = Symbol('ORDER_NUMBER_GENERATOR');

export interface IOrderNumberGeneratorService {
  generate(year?: number): Promise<OrderNumberVO>;
  isValid(value: string): boolean;
}

@Injectable()
export class OrderNumberGeneratorService implements IOrderNumberGeneratorService {
  private readonly logger = new Logger(OrderNumberGeneratorService.name);

  async generate(year: number = new Date().getFullYear()): Promise<OrderNumberVO> {
    // Timestamp-based 6-digit sequence (matches ORDER_NUMBER_SEQUENCE_LENGTH)
    const seq = Number(String(Date.now()).slice(-6));
    const vo = OrderNumberService.generate(seq, year);
    this.logger.debug?.(`Generated order number: ${vo.value}`);
    return vo;
  }

  isValid(value: string): boolean {
    return OrderNumberService.isValidFormat(value);
  }
}
