/**
 * DriverAssignmentService — pick the best available driver
 * @module logistics-service/domain/services
 *
 * Ranking score: rating + deliveries + cash headroom + warehouse proximity.
 */
import { DRIVER } from '@vubon/shared-constants/logistics';
import type { DriverEntity } from '../entities/driver.entity.js';

export interface DriverAssignmentInput {
  readonly availableDrivers: readonly DriverEntity[];
  readonly warehouseId?: string;
  readonly preferredDriverId?: string;
  readonly requiredLicenseType?: string;
  readonly requiredCashHeadroom?: number;
  readonly at?: Date;
}

export interface DriverAssignmentResult {
  readonly driver: DriverEntity | null;
  readonly reason: string;
  readonly candidateCount: number;
}

export class DriverAssignmentService {
  static select(input: DriverAssignmentInput): DriverAssignmentResult {
    const at = input.at ?? new Date();

    // 1. Preferred wins if eligible
    if (input.preferredDriverId) {
      const preferred = input.availableDrivers.find((d) => d.id === input.preferredDriverId);
      if (preferred && this.isEligible(preferred, input, at)) {
        return { driver: preferred, reason: 'preferred_driver', candidateCount: 1 };
      }
    }

    // 2. Filter eligible
    const eligible = input.availableDrivers.filter((d) => this.isEligible(d, input, at));
    if (eligible.length === 0) {
      return { driver: null, reason: 'no_eligible_driver', candidateCount: 0 };
    }

    // 3. Rank
    const ranked = this.rank(eligible, input);
    return { driver: ranked, reason: 'best_match', candidateCount: eligible.length };
  }

  private static isEligible(driver: DriverEntity, input: DriverAssignmentInput, at: Date): boolean {
    if (!driver.canBeAssigned()) return false;
    if (driver.isLicenseExpired(at)) return false;
    if (input.warehouseId && driver.warehouseId?.value !== input.warehouseId) return false;
    if (input.requiredCashHeadroom !== undefined && driver.availableCashLimit < input.requiredCashHeadroom) return false;
    if (input.requiredLicenseType) {
      const rank = driver.licenseType.rank;
      const needed = this.licenseRank(input.requiredLicenseType);
      if (rank < needed) return false;
    }
    return true;
  }

  private static licenseRank(type: string): number {
    const ranks: Record<string, number> = {
      motorcycle: 1,
      light: 2,
      medium: 3,
      heavy: 4,
      professional: 5,
    };
    return ranks[type] ?? 0;
  }

  private static rank(drivers: readonly DriverEntity[], input: DriverAssignmentInput): DriverEntity {
    const scored = drivers.map((d) => ({ driver: d, score: this.score(d, input) }));
    scored.sort((a, b) => b.score - a.score);
    return scored[0]!.driver;
  }

  private static score(driver: DriverEntity, input: DriverAssignmentInput): number {
    let score = 0;
    // Rating (0-5) — big bonus
    if (driver.rating !== undefined) score += driver.rating * 50;
    // More deliveries = more experienced, but cap the bonus
    score += Math.min(100, driver.totalDeliveries);
    // Warehouse proximity
    if (input.warehouseId && driver.warehouseId?.value === input.warehouseId) score += 200;
    // More cash headroom = better
    const headroom = driver.availableCashLimit;
    score += Math.min(100, headroom / 500);
    // Fewer minutes since active = fresher
    if (driver.lastActiveAt) {
      const mins = (Date.now() - new Date(driver.lastActiveAt).getTime()) / 60000;
      if (mins < 30) score += 50;
    }
    return score;
  }
}
