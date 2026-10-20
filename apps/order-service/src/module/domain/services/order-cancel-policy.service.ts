/**
 * OrderCancelPolicyService
 * @module order-service/domain/services
 *
 * Pure domain service — determines cancel eligibility + refund amount.
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { OrderEntity } from '../entities/order.entity.js';
import { CancelReasonVO } from '../value-objects/primitives/cancel-reason.vo.js';
import { ORDER_CANCEL } from '@vubon/shared-constants/business/order';

export interface CancelPolicyContext {
  readonly now?: string;
  readonly reason?: string;
  readonly requestedBy?: string;
}

export interface CancelEligibility {
  readonly eligible: boolean;
  readonly reason?: string;
  readonly refundAmount: number;
  readonly restockInventory: boolean;
}

export class OrderCancelPolicyService {
  /**
   * Check if order can be cancelled under policy.
   */
  static checkEligibility(
    order: OrderEntity,
    ctx: CancelPolicyContext = {},
  ): CancelEligibility {
    // Terminal status → cannot cancel
    if (order.isTerminal()) {
      return {
        eligible: false,
        reason: `Order is already in terminal status "${order.status.value}"`,
        refundAmount: 0,
        restockInventory: false,
      };
    }

    // Already shipped → cannot cancel (if ALLOW_AFTER_SHIPMENT is false)
    if (order.isShipped() && !ORDER_CANCEL.ALLOW_AFTER_SHIPMENT) {
      return {
        eligible: false,
        reason: 'Order cannot be cancelled after shipment',
        refundAmount: 0,
        restockInventory: false,
      };
    }

    // Cancel window check
    const now = ctx.now ?? new Date().toISOString();
    const createdAt = new Date(order.createdAt).getTime();
    const nowTime = new Date(now).getTime();
    const elapsedHours = (nowTime - createdAt) / (1000 * 60 * 60);

    if (elapsedHours > ORDER_CANCEL.WINDOW_HOURS) {
      return {
        eligible: false,
        reason: `Cancel window of ${ORDER_CANCEL.WINDOW_HOURS}h has expired`,
        refundAmount: 0,
        restockInventory: false,
      };
    }

    return {
      eligible: true,
      refundAmount: order.total.amount,
      restockInventory: ORDER_CANCEL.RESTOCK_INVENTORY,
    };
  }

  /**
   * Enforce eligibility or throw.
   */
  static assertEligible(order: OrderEntity, ctx: CancelPolicyContext = {}): CancelEligibility {
    const result = this.checkEligibility(order, ctx);
    if (!result.eligible) {
      throw new BusinessRuleError(
        result.reason ?? 'Order cannot be cancelled',
        'ORDER_CANCEL_NOT_ELIGIBLE',
        { orderId: order.id, status: order.status.value },
      );
    }
    return result;
  }

  /**
   * Validate cancel reason + auto-approve decision.
   */
  static shouldAutoApprove(reason: string): boolean {
    try {
      const reasonVO = CancelReasonVO.create(reason);
      return ORDER_CANCEL.AUTO_APPROVE && reasonVO.isSystemInitiated();
    } catch {
      return false;
    }
  }

  /**
   * Compute refund amount (default: total order).
   */
  static computeRefundAmount(order: OrderEntity): number {
    return order.total.amount;
  }
}
