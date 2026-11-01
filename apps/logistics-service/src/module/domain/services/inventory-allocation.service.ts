/**
 * InventoryAllocationService — Domain Service
 * @module logistics-service/domain/services
 *
 * Business Rules:
 *  - Filters by: isActive, not quarantine, isPickable
 *  - Filters by: capacity (weightKg + volumeM3)
 *  - Ranks by: priority (high first), utilization (low first)
 */
import type { InventoryLocationEntity } from '../entities/inventory-location.entity.js';

export interface InventoryAllocationCriteria {
  readonly weightKg: number;
  readonly volumeM3?: number;
  readonly zone?: string;
  readonly preferPickable?: boolean;
}

export interface InventoryAllocationResult {
  readonly location: InventoryLocationEntity;
  readonly score: number;
  readonly reasons: readonly string[];
}

export class InventoryAllocationService {
  static select(
    locations: readonly InventoryLocationEntity[],
    criteria: InventoryAllocationCriteria,
  ): readonly InventoryAllocationResult[] {
    const results: InventoryAllocationResult[] = [];

    for (const loc of locations) {
      if (!loc.isUsable) continue;
      if (loc.isQuarantine) continue;
      if (!loc.canHold(criteria.weightKg, criteria.volumeM3)) continue;

      const reasons: string[] = [];

      if (criteria.zone && loc.zone !== criteria.zone) continue;
      if (criteria.zone) reasons.push(`zone match: ${criteria.zone}`);

      if (criteria.preferPickable && !loc.isPickable) continue;
      if (criteria.preferPickable && loc.isPickable) reasons.push('pickable');

      let score = 100 + loc.priority;

      const utilKg = loc.utilizationPercentKg();
      score -= utilKg * 0.5;
      if (utilKg < 50) reasons.push('low utilization');
      if (utilKg > 80) reasons.push('high utilization');

      results.push({ location: loc, score, reasons });
    }

    results.sort((a, b) => b.score - a.score);
    return results;
  }

  static selectBest(
    locations: readonly InventoryLocationEntity[],
    criteria: InventoryAllocationCriteria,
  ): InventoryLocationEntity | null {
    const results = this.select(locations, criteria);
    return results[0]?.location ?? null;
  }
}
