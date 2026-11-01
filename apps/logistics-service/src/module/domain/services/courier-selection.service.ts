/**
 * CourierSelectionService — Domain Service
 * @module logistics-service/domain/services
 *
 * Business Rules:
 *   - Filters couriers by: status=active, COD, insurance, zone coverage, weight
 *   - Ranks by: priority (high first), averageDeliveryDays (fast first)
 *   - Returns sorted list — caller picks first
 */
import type { CourierEntity } from '../entities/courier.entity.js';

export interface CourierSelectionCriteria {
  readonly requiresCOD?: boolean;
  readonly requiresInsurance?: boolean;
  readonly requiresInternational?: boolean;
  readonly requiresAPI?: boolean;
  readonly zone?: string;
  readonly maxDeliveryDays?: number;
  readonly preferredType?: string;
}

export interface CourierSelectionResult {
  readonly courier: CourierEntity;
  readonly score: number;
  readonly reasons: readonly string[];
}

export class CourierSelectionService {
  static select(
    couriers: readonly CourierEntity[],
    criteria: CourierSelectionCriteria,
  ): readonly CourierSelectionResult[] {
    const results: CourierSelectionResult[] = [];

    for (const courier of couriers) {
      if (!courier.isOperational()) continue;

      const reasons: string[] = [];

      if (criteria.requiresCOD && !courier.supportsCOD) continue;
      if (criteria.requiresCOD) reasons.push('supports COD');

      if (criteria.requiresInsurance && !courier.supportsInsurance) continue;
      if (criteria.requiresInsurance) reasons.push('supports insurance');

      if (criteria.requiresInternational && !courier.supportsInternational) continue;
      if (criteria.requiresInternational) reasons.push('supports international');

      if (criteria.requiresAPI && !courier.hasApi()) continue;
      if (criteria.requiresAPI) reasons.push('has API');

      if (criteria.zone && !courier.coversZone(criteria.zone)) continue;
      if (criteria.zone) reasons.push(`covers zone ${criteria.zone}`);

      if (
        criteria.maxDeliveryDays !== undefined &&
        courier.averageDeliveryDays > criteria.maxDeliveryDays
      ) {
        continue;
      }

      // Scoring: priority (0-100) + fast delivery bonus + default bonus
      let score = courier.priority;
      if (courier.averageDeliveryDays <= 2) {
        score += 30;
        reasons.push('fast delivery');
      } else if (courier.averageDeliveryDays <= 4) {
        score += 15;
      }
      if (courier.isDefault) {
        score += 20;
        reasons.push('default courier');
      }
      if (criteria.preferredType && courier.type.value === criteria.preferredType) {
        score += 10;
        reasons.push(`preferred type ${criteria.preferredType}`);
      }

      results.push({ courier, score, reasons });
    }

    // Sort by score desc
    results.sort((a, b) => b.score - a.score);
    return results;
  }

  static selectBest(
    couriers: readonly CourierEntity[],
    criteria: CourierSelectionCriteria,
  ): CourierEntity | null {
    const results = this.select(couriers, criteria);
    return results[0]?.courier ?? null;
  }
}
