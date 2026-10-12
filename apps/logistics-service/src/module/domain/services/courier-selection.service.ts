/**
 * CourierSelectionService — picks the best courier for a shipment
 * @module logistics-service/domain/services
 *
 * Selection priority (tunable by constants COURIER.AUTO_SELECT_CHEAPEST, PREFER_FASTEST):
 *  1. Preferred courier wins if compatible
 *  2. Manual courier — no auto selection
 *  3. Filter by: operational, coverage (zone), supports COD/Insurance/International
 *  4. Rank by: cheapest cost → fastest days → priority
 */
import { COURIER } from '@vubon/shared-constants/logistics';
import type { CourierEntity } from '../entities/courier.entity.js';
import type { ShippingCostVO } from '../value-objects/primitives/shipping-cost.vo.js';
import type { WeightKgVO } from '../value-objects/primitives/weight-kg.vo.js';

export interface CourierSelectionInput {
  readonly availableCouriers: readonly CourierEntity[];
  readonly preferredCourierId?: string;
  readonly zone: string;
  readonly weightKg: number;
  readonly currency: string;
  readonly declaredValue?: number;
  readonly isCOD: boolean;
  readonly isInsured: boolean;
  readonly isInternational: boolean;
  /** Optional cost estimator; if provided, used for cheapest-ranking. */
  readonly estimateCost?: (courier: CourierEntity) => number;
}

export interface CourierSelectionResult {
  readonly courier: CourierEntity | null;
  readonly reason: string;
  readonly candidateCount: number;
}

export class CourierSelectionService {
  static select(input: CourierSelectionInput): CourierSelectionResult {
    const { availableCouriers } = input;

    // 1. Preferred courier wins if compatible
    if (input.preferredCourierId) {
      const preferred = availableCouriers.find((c) => c.id === input.preferredCourierId);
      if (preferred && this.isEligible(preferred, input)) {
        return { courier: preferred, reason: 'preferred_courier', candidateCount: 1 };
      }
    }

    // 2. Filter eligible couriers
    const eligible = availableCouriers.filter((c) => this.isEligible(c, input));
    if (eligible.length === 0) {
      return { courier: null, reason: 'no_eligible_courier', candidateCount: 0 };
    }

    // 3. Rank candidates
    const ranked = this.rank(eligible, input);
    return { courier: ranked, reason: 'best_match', candidateCount: eligible.length };
  }

  private static isEligible(courier: CourierEntity, input: CourierSelectionInput): boolean {
    if (!courier.isOperational()) return false;
    if (!courier.canShipTo(input.zone)) return false;
    if (!courier.supportsCurrency(input.currency)) return false;
    if (!courier.canHandle({
      isCOD: input.isCOD,
      isInsured: input.isInsured,
      isInternational: input.isInternational,
    })) return false;
    return true;
  }

  private static rank(couriers: readonly CourierEntity[], input: CourierSelectionInput): CourierEntity {
    const scored = couriers.map((c) => ({
      courier: c,
      score: this.score(c, input),
    }));
    scored.sort((a, b) => b.score - a.score);
    return scored[0]!.courier;
  }

  /** Higher score = better. */
  private static score(courier: CourierEntity, input: CourierSelectionInput): number {
    let score = 0;
    // Default flag is a big bonus
    if (courier.isDefault) score += 1000;
    // Priority 0-100 → 0-100 score
    score += courier.priority;

    const cost = input.estimateCost ? input.estimateCost(courier) : undefined;
    const hasCost = cost !== undefined && Number.isFinite(cost) && cost > 0;

    // COURIER.AUTO_SELECT_CHEAPEST: cost dominates — big weight on cheapest
    if (COURIER.AUTO_SELECT_CHEAPEST && hasCost) {
      score += Math.max(0, 1000 - cost);
    } else if (hasCost) {
      // Normal mode: cost is a mild tiebreaker
      score += Math.max(0, 200 - cost / 10);
    }

    // COURIER.PREFER_FASTEST: only boosts when NOT in cost-dominant mode
    if (COURIER.PREFER_FASTEST && !COURIER.AUTO_SELECT_CHEAPEST) {
      score += Math.max(0, 100 - courier.averageDeliveryDays * 10);
    }
    return score;
  }
}
