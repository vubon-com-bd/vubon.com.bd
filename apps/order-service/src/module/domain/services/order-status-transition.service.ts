/**
 * OrderStatusTransitionService
 * @module order-service/domain/services
 *
 * Pure domain service — validates and describes order status transitions.
 */
import { OrderStatusVO } from '../value-objects/primitives/order-status.vo.js';

export interface StatusTransitionResult {
  readonly allowed: boolean;
  readonly from: string;
  readonly to: string;
  readonly reason?: string;
}

export class OrderStatusTransitionService {
  /**
   * Check whether a transition is allowed.
   */
  static canTransition(from: string, to: string): boolean {
    try {
      const fromVO = OrderStatusVO.create(from);
      return fromVO.canTransitionTo(to);
    } catch {
      return false;
    }
  }

  /**
   * Assert transition or throw (caller handles error).
   */
  static evaluate(from: string, to: string): StatusTransitionResult {
    try {
      const fromVO = OrderStatusVO.create(from);
      const allowed = fromVO.canTransitionTo(to);
      return {
        allowed,
        from,
        to,
        reason: allowed ? undefined : `Transition "${from}" → "${to}" is not permitted`,
      };
    } catch (err) {
      return {
        allowed: false,
        from,
        to,
        reason: err instanceof Error ? err.message : 'Invalid status',
      };
    }
  }

  /**
   * Get all next possible statuses from current.
   */
  static nextStatuses(from: string): readonly string[] {
    try {
      const fromVO = OrderStatusVO.create(from);
      const candidates: readonly string[] = [
        'pending',
        'confirmed',
        'processing',
        'packed',
        'shipped',
        'out_for_delivery',
        'delivered',
        'completed',
        'cancelled',
        'returned',
        'refunded',
        'failed',
        'on_hold',
      ];
      return candidates.filter((s) => fromVO.canTransitionTo(s));
    } catch {
      return [];
    }
  }

  /**
   * Validate that the current status is consistent with lifecycle flags.
   */
  static isTerminal(status: string): boolean {
    try {
      return OrderStatusVO.create(status).isTerminal();
    } catch {
      return false;
    }
  }
}
