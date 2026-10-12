/**
 * WarehouseAllocationService — pick the best warehouse for a shipment origin
 * @module logistics-service/domain/services
 *
 * Ranking: zone match + available capacity + utilization + default flag.
 */
import type { WarehouseEntity } from '../entities/warehouse.entity.js';

export interface WarehouseAllocationInput {
  readonly candidates: readonly WarehouseEntity[];
  readonly volumeM3: number;
  readonly weightKg: number;
  readonly zone?: string;
  readonly preferredWarehouseId?: string;
  readonly at?: Date;
}

export interface WarehouseAllocationResult {
  readonly warehouse: WarehouseEntity | null;
  readonly reason: string;
  readonly candidateCount: number;
}

export class WarehouseAllocationService {
  static select(input: WarehouseAllocationInput): WarehouseAllocationResult {
    const at = input.at ?? new Date();

    // 1. Preferred
    if (input.preferredWarehouseId) {
      const preferred = input.candidates.find((w) => w.id === input.preferredWarehouseId);
      if (preferred && this.isEligible(preferred, input, at)) {
        return { warehouse: preferred, reason: 'preferred_warehouse', candidateCount: 1 };
      }
    }

    // 2. Filter
    const eligible = input.candidates.filter((w) => this.isEligible(w, input, at));
    if (eligible.length === 0) {
      return { warehouse: null, reason: 'no_eligible_warehouse', candidateCount: 0 };
    }

    // 3. Rank
    const ranked = this.rank(eligible, input);
    return { warehouse: ranked, reason: 'best_match', candidateCount: eligible.length };
  }

  private static isEligible(w: WarehouseEntity, input: WarehouseAllocationInput, at: Date): boolean {
    if (!w.canAcceptInbound()) return false;
    if (!w.isOpenNow(at)) return false;
    if (input.zone && w.zone !== input.zone && !w.isDefault) return false;
    if (!w.capacity.canFit(input.volumeM3, input.weightKg)) return false;
    return true;
  }

  private static rank(warehouses: readonly WarehouseEntity[], input: WarehouseAllocationInput): WarehouseEntity {
    const scored = warehouses.map((w) => ({ warehouse: w, score: this.score(w, input) }));
    scored.sort((a, b) => b.score - a.score);
    return scored[0]!.warehouse;
  }

  private static score(w: WarehouseEntity, input: WarehouseAllocationInput): number {
    let score = 0;
    if (w.isDefault) score += 1000;
    // Zone match
    if (input.zone && w.zone === input.zone) score += 500;
    // Lower utilization is better (more room)
    const util = w.utilizationPercent.value;
    score += Math.max(0, 200 - util * 2);
    // More headroom — bonus
    const headroomKg = w.capacity.availableKg;
    score += Math.min(150, headroomKg / 1000);
    return score;
  }
}
