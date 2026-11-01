/**
 * AbandonedCartDetectorService — Determine abandonment
 * @module cart-service/domain/services
 *
 * Rules:
 *  - Cart must be active + non-empty
 *  - Last activity >= threshold hours ago
 *  - Not already converted
 */
import { CartEntity } from '../entities/cart.entity.js';

export interface AbandonmentConfig {
  readonly thresholdHours: number;
  readonly minItemCount: number;
  readonly minCartValue: number;
}

export const DEFAULT_ABANDONMENT_CONFIG: AbandonmentConfig = {
  thresholdHours: 24,
  minItemCount: 1,
  minCartValue: 0,
};

export interface AbandonmentEvaluation {
  readonly isAbandoned: boolean;
  readonly idleHours: number;
  readonly reason?: string;
}

export class AbandonedCartDetectorService {
  static evaluate(
    cart: CartEntity,
    config: AbandonmentConfig = DEFAULT_ABANDONMENT_CONFIG,
    at: Date = new Date(),
  ): AbandonmentEvaluation {
    const lastActivity = new Date(cart.lastActivityAt);
    const idleMs = at.getTime() - lastActivity.getTime();
    const idleHours = Math.floor(idleMs / (1000 * 60 * 60));

    if (!cart.isActive()) {
      return {
        isAbandoned: false,
        idleHours,
        reason: `Cart not active (status: ${cart.status.value})`,
      };
    }

    if (cart.itemCount < config.minItemCount) {
      return {
        isAbandoned: false,
        idleHours,
        reason: `Insufficient items (${cart.itemCount} < ${config.minItemCount})`,
      };
    }

    if (cart.total < config.minCartValue) {
      return {
        isAbandoned: false,
        idleHours,
        reason: `Cart value below threshold (${cart.total} < ${config.minCartValue})`,
      };
    }

    if (idleHours < config.thresholdHours) {
      return {
        isAbandoned: false,
        idleHours,
        reason: `Idle ${idleHours}h < threshold ${config.thresholdHours}h`,
      };
    }

    return {
      isAbandoned: true,
      idleHours,
    };
  }

  static isAbandoned(
    cart: CartEntity,
    config: AbandonmentConfig = DEFAULT_ABANDONMENT_CONFIG,
    at: Date = new Date(),
  ): boolean {
    return this.evaluate(cart, config, at).isAbandoned;
  }
}
