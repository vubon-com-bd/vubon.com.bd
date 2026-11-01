/**
 * WarehouseAllocationService — Domain Service
 * @module logistics-service/domain/services
 *
 * Business Rules:
 *   - Filters by operational status
 *   - Filters by capacity (volume + weight)
 *   - Filters by zone coverage
 *   - Ranks by: utilization (lowest first), isDefault bonus, manager zone bonus
 */
import type { WarehouseEntity } from '../entities/warehouse.entity.js';

export interface WarehouseAllocationCriteria {
  readonly volumeM3: number;
  readonly weightKg?: number;
  readonly zone?: string;
  readonly preferDefault?: boolean;
}

export interface WarehouseAllocationResult {
  readonly warehouse: WarehouseEntity;
  readonly score: number;
  readonly reasons: readonly string[];
}

export class WarehouseAllocationService {
  static select(
    warehouses: readonly WarehouseEntity[],
    criteria: WarehouseAllocationCriteria,
  ): readonly WarehouseAllocationResult[] {
    const results: WarehouseAllocationResult[] = [];

    for (const wh of warehouses) {
      if (!wh.isOperational()) continue;
      if (!wh.canAcceptMore(criteria.volumeM3, criteria.weightKg)) continue;

      const reasons: string[] = [];

      if (criteria.zone && wh.zone !== criteria.zone) continue;
      if (criteria.zone) reasons.push(`zone match: ${criteria.zone}`);

      let score = 100;

      // Lower utilization → higher score
      const util = wh.utilizationPercent();
      score -= util;
      if (util < 50) reasons.push('low utilization');
      if (util > 80) reasons.push('high utilization');

      // Default bonus
      if (criteria.preferDefault && wh.isDefault) {
        score += 20;
        reasons.push('preferred default warehouse');
      }

      results.push({ warehouse: wh, score, reasons });
    }

    results.sort((a, b) => b.score - a.score);
    return results;
  }

  static selectBest(
    warehouses: readonly WarehouseEntity[],
    criteria: WarehouseAllocationCriteria,
  ): WarehouseEntity | null {
    const results = this.select(warehouses, criteria);
    return results[0]?.warehouse ?? null;
  }
}
