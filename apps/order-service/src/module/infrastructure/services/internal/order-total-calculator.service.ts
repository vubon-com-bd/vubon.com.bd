/**
 * OrderTotalCalculatorService — DI-injectable wrapper for OrderTotalService
 * @module order-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { OrderItemEntity } from '../../../domain/entities/order-item.entity.js';
import { OrderTotalsCompositeVO } from '../../../domain/value-objects/composites/order-total.vo.js';
import { OrderTotalService } from '../../../domain/services/order-total.service.js';

export const ORDER_TOTAL_CALCULATOR = Symbol('ORDER_TOTAL_CALCULATOR');

export interface ITotalCalculationInput {
  readonly items: readonly OrderItemEntity[];
  readonly currency: string;
  readonly taxRate?: number;
  readonly shippingCost?: number;
  readonly orderLevelDiscount?: number;
}

export interface IOrderTotalCalculatorService {
  calculate(input: ITotalCalculationInput): OrderTotalsCompositeVO;
  calculateTax(amount: number, rate: number): number;
  calculateLineSubtotal(unitPrice: number, qty: number): number;
}

@Injectable()
export class OrderTotalCalculatorService implements IOrderTotalCalculatorService {
  calculate(input: ITotalCalculationInput): OrderTotalsCompositeVO {
    return OrderTotalService.calculate(input);
  }

  calculateTax(amount: number, rate: number): number {
    return OrderTotalService.calculateTax(amount, rate);
  }

  calculateLineSubtotal(unitPrice: number, qty: number): number {
    return OrderTotalService.calculateLineSubtotal(unitPrice, qty);
  }
}
