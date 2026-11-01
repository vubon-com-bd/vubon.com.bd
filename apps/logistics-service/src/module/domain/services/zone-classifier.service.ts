/**
 * ZoneClassifierService — Domain Service
 * @module logistics-service/domain/services
 *
 * Business Rules:
 *   - Priority order: postal code → district → division
 *   - Returns most-specific zone match
 *   - Falls back to remote/fallback zone
 */
import type { ZoneEntity } from '../entities/zone.entity.js';

export interface ZoneClassificationInput {
  readonly postalCode?: string;
  readonly district?: string;
  readonly division?: string;
}

export interface ZoneClassificationResult {
  readonly zone: ZoneEntity;
  readonly matchType: 'postal_code' | 'district' | 'division' | 'fallback';
  readonly confidence: 'high' | 'medium' | 'low';
}

export class ZoneClassifierService {
  static classify(
    zones: readonly ZoneEntity[],
    input: ZoneClassificationInput,
  ): ZoneClassificationResult | null {
    const active = zones.filter((z) => z.isUsable());

    // Priority 1: Postal code
    if (input.postalCode) {
      const match = active.find((z) => z.coversPostalCode(input.postalCode!));
      if (match) {
        return { zone: match, matchType: 'postal_code', confidence: 'high' };
      }
    }

    // Priority 2: District
    if (input.district) {
      const match = active.find((z) => z.coversDistrict(input.district!));
      if (match) {
        return { zone: match, matchType: 'district', confidence: 'medium' };
      }
    }

    // Priority 3: Division
    if (input.division) {
      const match = active.find((z) => z.coversDivision(input.division!));
      if (match) {
        return { zone: match, matchType: 'division', confidence: 'low' };
      }
    }

    // Fallback: remote zone or first active
    const fallback =
      active.find((z) => z.isRemote) ?? active[0] ?? null;
    if (fallback) {
      return { zone: fallback, matchType: 'fallback', confidence: 'low' };
    }

    return null;
  }

  static calculateShipping(
    zone: ZoneEntity,
    params: { orderAmount: number; isCOD?: boolean; codAmount?: number },
  ): { shippingCost: number; codCharge: number; total: number; currency: string } {
    let shippingCost = zone.shippingCost;

    // Free shipping above threshold
    if (zone.isFreeShipping(params.orderAmount)) {
      shippingCost = 0;
    }

    let codCharge = 0;
    if (params.isCOD && params.codAmount && zone.codEnabled) {
      if (zone.canAcceptCOD(params.codAmount)) {
        codCharge = zone.codCharge ?? 0;
      }
    }

    return {
      shippingCost,
      codCharge,
      total: shippingCost + codCharge,
      currency: zone.currency,
    };
  }
}
