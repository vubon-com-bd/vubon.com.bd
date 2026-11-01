/**
 * OrderEligibilityService
 * @module order-service/domain/services
 *
 * Pure domain service — checks if order can be placed.
 * Does NOT call customer-service or inventory-service — caller provides context.
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ORDER_LIMIT, ORDER_ITEM_LIMIT } from '@vubon/shared-constants/business/order';

export interface EligibilityContext {
  readonly customerStatus?: 'active' | 'inactive' | 'blocked' | 'suspended';
  readonly customerBalance?: number;
  readonly itemCount?: number;
  readonly subtotal?: number;
  readonly currency?: string;
  readonly isGuestOrder?: boolean;
}

export interface EligibilityResult {
  readonly eligible: boolean;
  readonly reasons: readonly string[];
}

export class OrderEligibilityService {
  /**
   * Check if order can be placed under rules.
   */
  static checkEligibility(ctx: EligibilityContext = {}): EligibilityResult {
    const reasons: string[] = [];

    // Customer status
    if (ctx.customerStatus === 'blocked' || ctx.customerStatus === 'suspended') {
      reasons.push(`Customer status "${ctx.customerStatus}" is not eligible`);
    }

    // Guest order
    if (ctx.isGuestOrder && !ORDER_LIMIT.ALLOW_GUEST_ORDER) {
      reasons.push('Guest orders are not allowed');
    }

    // Item count
    if (ctx.itemCount !== undefined) {
      if (ctx.itemCount < 1) {
        reasons.push('Order must have at least 1 item');
      }
      if (ctx.itemCount > ORDER_ITEM_LIMIT.MAX_ITEMS_PER_ORDER) {
        reasons.push(
          `Order items exceed limit ${ORDER_ITEM_LIMIT.MAX_ITEMS_PER_ORDER}`,
        );
      }
    }

    // Amount
    if (ctx.subtotal !== undefined) {
      if (ctx.subtotal < ORDER_LIMIT.MIN_AMOUNT) {
        reasons.push(`Order subtotal below minimum ${ORDER_LIMIT.MIN_AMOUNT}`);
      }
      if (ctx.subtotal > ORDER_LIMIT.MAX_AMOUNT) {
        reasons.push(`Order subtotal exceeds maximum ${ORDER_LIMIT.MAX_AMOUNT}`);
      }
    }

    // Currency check
    if (ctx.currency !== undefined && (!ctx.currency || ctx.currency.length < 3)) {
      reasons.push('Invalid currency');
    }

    return { eligible: reasons.length === 0, reasons };
  }

  /**
   * Enforce eligibility or throw.
   */
  static assertEligible(ctx: EligibilityContext = {}): void {
    const result = this.checkEligibility(ctx);
    if (!result.eligible) {
      throw new BusinessRuleError(
        `Order not eligible: ${result.reasons.join('; ')}`,
        'ORDER_NOT_ELIGIBLE',
        { reasons: result.reasons },
      );
    }
  }

  /**
   * Check if customer is blacklisted.
   */
  static isBlacklisted(customerStatus?: string): boolean {
    return customerStatus === 'blocked' || customerStatus === 'suspended';
  }
}
