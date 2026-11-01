/**
 * OrderReturnPolicyService
 * @module order-service/domain/services
 *
 * Pure domain service — determines return eligibility + refund amount.
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { OrderEntity } from '../entities/order.entity.js';
import { ReturnReasonVO } from '../value-objects/primitives/return-reason.vo.js';
import { ORDER_RETURN } from '@vubon/shared-constants/business/order';

export interface ReturnPolicyContext {
  readonly now?: string;
  readonly reason?: string;
  readonly itemIds?: readonly string[];
}

export interface ReturnEligibility {
  readonly eligible: boolean;
  readonly reason?: string;
  readonly refundAmount: number;
  readonly restockFee: number;
}

export class OrderReturnPolicyService {
  /**
   * Check if order can be returned under policy.
   */
  static checkEligibility(
    order: OrderEntity,
    ctx: ReturnPolicyContext = {},
  ): ReturnEligibility {
    // Must be delivered/completed
    if (!order.isReturnable()) {
      return {
        eligible: false,
        reason: `Order status "${order.status.value}" is not returnable`,
        refundAmount: 0,
        restockFee: 0,
      };
    }

    // Must have a deliveredAt timestamp
    if (!order.deliveredAt) {
      return {
        eligible: false,
        reason: 'Order has no delivery timestamp',
        refundAmount: 0,
        restockFee: 0,
      };
    }

    // Check return window
    const now = ctx.now ?? new Date().toISOString();
    const deliveredTime = new Date(order.deliveredAt).getTime();
    const nowTime = new Date(now).getTime();
    const elapsedDays = (nowTime - deliveredTime) / (1000 * 60 * 60 * 24);

    if (elapsedDays > ORDER_RETURN.MAX_DAYS_AFTER_DELIVERY) {
      return {
        eligible: false,
        reason: `Return window of ${ORDER_RETURN.MAX_DAYS_AFTER_DELIVERY}d has expired`,
        refundAmount: 0,
        restockFee: 0,
      };
    }

    // Compute refund
    const refundAmount = this.computeRefundAmount(order, ctx.itemIds);
    const restockFee = this.computeRestockFee(refundAmount);

    return {
      eligible: true,
      refundAmount,
      restockFee,
    };
  }

  /**
   * Enforce eligibility or throw.
   */
  static assertEligible(
    order: OrderEntity,
    ctx: ReturnPolicyContext = {},
  ): ReturnEligibility {
    const result = this.checkEligibility(order, ctx);
    if (!result.eligible) {
      throw new BusinessRuleError(
        result.reason ?? 'Order cannot be returned',
        'ORDER_RETURN_NOT_ELIGIBLE',
        { orderId: order.id, status: order.status.value },
      );
    }
    return result;
  }

  /**
   * Validate return reason — defective = free, change-of-mind = restock fee.
   */
  static shouldChargeRestockFee(reason: string): boolean {
    try {
      const reasonVO = ReturnReasonVO.create(reason);
      return reasonVO.isChangeOfMind() && ORDER_RETURN.RESTOCK_FEE_PERCENT > 0;
    } catch {
      return false;
    }
  }

  /**
   * Compute refund (partial if itemIds specified).
   */
  static computeRefundAmount(order: OrderEntity, itemIds?: readonly string[]): number {
    if (!itemIds || itemIds.length === 0) {
      return order.total.amount;
    }
    const selectedItems = order.items.filter((item) =>
      itemIds.includes(item.id.value),
    );
    if (selectedItems.length === 0) {
      throw new BusinessRuleError(
        'No matching items found for return',
        'ORDER_RETURN_ITEM_NOT_FOUND',
        { orderId: order.id, itemIds },
      );
    }
    const itemsTotal = selectedItems.reduce(
      (sum, item) => sum + item.lineTotal.amount,
      0,
    );
    return Math.round(itemsTotal * 100) / 100;
  }

  /**
   * Compute restock fee.
   */
  static computeRestockFee(refundAmount: number): number {
    const percent = ORDER_RETURN.RESTOCK_FEE_PERCENT / 100;
    return Math.round(refundAmount * percent * 100) / 100;
  }
}
