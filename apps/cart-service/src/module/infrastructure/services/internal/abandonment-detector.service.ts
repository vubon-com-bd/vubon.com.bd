/**
 * AbandonmentDetectorService — application-level abandonment detection
 * @module cart-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { CartEntity } from '../../../domain/entities/cart.entity.js';
import { AbandonedCartDetectorService } from '../../../domain/services/abandoned-cart-detector.service.js';
import { ABANDONMENT_CONFIG } from '../../config/abandonment.config.js';

export interface AbandonmentDecision {
  readonly abandoned: boolean;
  readonly hoursSinceActivity: number;
  readonly thresholdHours: number;
  readonly nextReminderTier: number | null;
}

export const ABANDONMENT_DETECTOR = Symbol('ABANDONMENT_DETECTOR');

@Injectable()
export class AbandonmentDetectorService {
  private readonly detector = new AbandonedCartDetectorService();

  detect(cart: CartEntity, now: Date = new Date()): AbandonmentDecision {
    const decision = this.detector.detect({
      cart,
      now,
      thresholdHours: ABANDONMENT_CONFIG.THRESHOLD_HOURS,
    });

    const nextTier = decision.abandoned
      ? this.detector.nextReminderTier(decision.hoursSinceActivity, 0)
      : null;

    return {
      abandoned: decision.abandoned,
      hoursSinceActivity: decision.hoursSinceActivity,
      thresholdHours: decision.thresholdHours,
      nextReminderTier: nextTier,
    };
  }

  recoveryDiscount(): number {
    return ABANDONMENT_CONFIG.DISCOUNT_PERCENTAGE;
  }

  isEnabled(): boolean {
    return ABANDONMENT_CONFIG.ENABLED;
  }
}
