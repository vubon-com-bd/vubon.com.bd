/**
 * ProductInventoryService — Real business logic
 * @module product-service/domain/services
 *
 * Responsibilities:
 *  - Stock reservation with expiry
 *  - Oversell prevention
 *  - Low-stock / critical-stock detection
 *  - Restock signals
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { INVENTORY } from '@vubon/shared-constants/business';

export interface StockAvailabilityInput {
  readonly quantity: number;
  readonly reserved: number;
  readonly incoming?: number;
}

export interface StockAvailability {
  readonly available: number;
  readonly canFulfill: boolean;
  readonly isLow: boolean;
  readonly isCritical: boolean;
  readonly isOutOfStock: boolean;
}

export interface ReservationPlanInput {
  readonly quantity: number;
  readonly reserved: number;
  readonly requested: number;
  readonly allowBackorder?: boolean;
}

export interface ReservationPlan {
  readonly accepted: number;
  readonly backordered: number;
  readonly reason: 'full' | 'partial' | 'backorder' | 'none';
}

export interface RestockTriggerInput {
  readonly quantity: number;
  readonly averageDailySales: number;
  readonly leadTimeDays: number;
  readonly lowStockThreshold: number;
}

export interface RestockTrigger {
  readonly shouldRestock: boolean;
  readonly suggestedQuantity: number;
  readonly daysOfStockLeft: number;
  readonly urgency: 'critical' | 'high' | 'medium' | 'low';
}

export class ProductInventoryService {
  /**
   * Available stock এবং alerts হিসাব।
   */
  static checkAvailability(input: StockAvailabilityInput): StockAvailability {
    if (input.quantity < 0 || input.reserved < 0) {
      throw new BusinessRuleError(
        'Quantity and reserved must be non-negative',
        'INVENTORY_NEGATIVE_INPUT',
        { quantity: input.quantity, reserved: input.reserved },
      );
    }

    const available = Math.max(0, input.quantity - input.reserved);
    const threshold = INVENTORY.LOW_STOCK_THRESHOLD;
    const critical = INVENTORY.CRITICAL_STOCK_THRESHOLD;

    return {
      available,
      canFulfill: available > 0,
      isLow: available > 0 && available <= threshold,
      isCritical: available > 0 && available <= critical,
      isOutOfStock: available === 0,
    };
  }

  /**
   * Reservation plan — full, partial, backorder, none।
   */
  static planReservation(input: ReservationPlanInput): ReservationPlan {
    if (input.requested <= 0) {
      throw new BusinessRuleError(
        'Requested quantity must be positive',
        'INVENTORY_INVALID_REQUEST',
        { requested: input.requested },
      );
    }

    const available = Math.max(0, input.quantity - input.reserved);

    if (available >= input.requested) {
      return { accepted: input.requested, backordered: 0, reason: 'full' };
    }
    if (available > 0) {
      const backordered = input.allowBackorder ? input.requested - available : 0;
      return {
        accepted: available,
        backordered,
        reason: input.allowBackorder ? 'backorder' : 'partial',
      };
    }
    if (input.allowBackorder) {
      return { accepted: 0, backordered: input.requested, reason: 'backorder' };
    }
    return { accepted: 0, backordered: 0, reason: 'none' };
  }

  /**
   * Restock trigger — sales velocity + lead time।
   */
  static evaluateRestock(input: RestockTriggerInput): RestockTrigger {
    if (input.averageDailySales < 0 || input.leadTimeDays < 0) {
      throw new BusinessRuleError(
        'Sales and lead time must be non-negative',
        'INVENTORY_INVALID_RESTOCK_INPUT',
        {
          averageDailySales: input.averageDailySales,
          leadTimeDays: input.leadTimeDays,
          quantity: input.quantity,
        },
      );
    }

    const daysOfStockLeft =
      input.averageDailySales > 0 ? input.quantity / input.averageDailySales : Infinity;

    const safetyStock = Math.ceil(input.averageDailySales * input.leadTimeDays * 1.5);
    const reorderPoint = Math.ceil(input.averageDailySales * input.leadTimeDays);

    const shouldRestock = input.quantity <= reorderPoint;
    const suggestedQuantity = Math.max(0, safetyStock - input.quantity);

    let urgency: RestockTrigger['urgency'] = 'low';
    if (daysOfStockLeft <= 2) urgency = 'critical';
    else if (daysOfStockLeft <= input.leadTimeDays) urgency = 'high';
    else if (daysOfStockLeft <= input.leadTimeDays * 2) urgency = 'medium';

    return {
      shouldRestock,
      suggestedQuantity,
      daysOfStockLeft: Math.round(daysOfStockLeft * 100) / 100,
      urgency,
    };
  }

  /**
   * Threshold cross করলে alert দরকার কিনা।
   */
  static shouldAlertLowStock(previous: number, current: number, threshold: number): boolean {
    return previous > threshold && current <= threshold && current > 0;
  }

  static shouldAlertOutOfStock(previous: number, current: number): boolean {
    return previous > 0 && current === 0;
  }

  static shouldAlertBackInStock(previous: number, current: number): boolean {
    return previous === 0 && current > 0;
  }
}
