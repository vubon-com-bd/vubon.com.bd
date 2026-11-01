/**
 * InsuranceCalculatorService — Domain Service
 * @module logistics-service/domain/services
 *
 * Business Rules:
 *   - Premium = declaredValue × premiumPercent (type-based)
 *   - Claim limit = min(declaredValue, shipment value)
 *   - Claim window: 30 days from delivery
 *   - Auto-approve under 1000 BDT
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { INSURANCE } from '@vubon/shared-constants/logistics';
import type { InsuranceTypeVO } from '../value-objects/primitives/insurance-type.vo.js';

export interface PremiumCalculation {
  readonly declaredValue: number;
  readonly premium: number;
  readonly premiumPercent: number;
  readonly currency: string;
}

export interface ClaimEligibility {
  readonly eligible: boolean;
  readonly maxClaimAmount: number;
  readonly reason?: string;
}

export class InsuranceCalculatorService {
  static calculatePremium(params: {
    declaredValue: number;
    type: InsuranceTypeVO;
    currency?: string;
  }): PremiumCalculation {
    if (params.declaredValue < INSURANCE.MIN_VALUE) {
      throw new BusinessRuleError(
        `Declared value below minimum (${INSURANCE.MIN_VALUE})`,
        'INSURANCE_VALUE_TOO_LOW',
        { declaredValue: params.declaredValue, min: INSURANCE.MIN_VALUE },
      );
    }
    if (params.declaredValue > INSURANCE.MAX_VALUE) {
      throw new BusinessRuleError(
        `Declared value exceeds maximum (${INSURANCE.MAX_VALUE})`,
        'INSURANCE_VALUE_TOO_HIGH',
        { declaredValue: params.declaredValue, max: INSURANCE.MAX_VALUE },
      );
    }
    const premium = params.type.calculatePremium(params.declaredValue);
    return {
      declaredValue: params.declaredValue,
      premium,
      premiumPercent: params.type.premiumPercent,
      currency: params.currency ?? 'BDT',
    };
  }

  static calculateClaimEligibility(params: {
    declaredValue: number;
    deliveredAt?: string;
    claimAmount: number;
    ref?: Date;
  }): ClaimEligibility {
    const ref = params.ref ?? new Date();

    // Claim window check
    if (params.deliveredAt) {
      const delivered = new Date(params.deliveredAt);
      const daysSince = (ref.getTime() - delivered.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSince > INSURANCE.CLAIM_WINDOW_DAYS) {
        return {
          eligible: false,
          maxClaimAmount: 0,
          reason: `Claim window expired (${INSURANCE.CLAIM_WINDOW_DAYS} days)`,
        };
      }
    }

    if (params.claimAmount <= 0) {
      return {
        eligible: false,
        maxClaimAmount: 0,
        reason: 'Claim amount must be positive',
      };
    }

    if (params.claimAmount > params.declaredValue) {
      return {
        eligible: false,
        maxClaimAmount: params.declaredValue,
        reason: `Claim amount ${params.claimAmount} exceeds declared value ${params.declaredValue}`,
      };
    }

    return {
      eligible: true,
      maxClaimAmount: params.declaredValue,
    };
  }

  static shouldAutoApprove(claimAmount: number): boolean {
    return claimAmount <= INSURANCE.AUTO_APPROVE_UNDER;
  }

  static calculateExpiry(startsAt: string): string {
    const start = new Date(startsAt);
    const expiry = new Date(start);
    expiry.setDate(expiry.getDate() + 30);
    return expiry.toISOString();
  }
}
