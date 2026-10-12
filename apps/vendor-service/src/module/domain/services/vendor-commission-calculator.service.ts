/**
 * VendorCommissionCalculatorService
 * @module vendor-service/domain/services
 *
 * Pure domain logic for commission computation — no DI, no I/O.
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VendorCommissionEntity } from '../entities/vendor-commission.entity.js';
import { VendorEntity } from '../entities/vendor.entity.js';
import { CommissionPercentVO } from '../value-objects/primitives/commission-percent.vo.js';
import { CommissionAmountVO } from '../value-objects/primitives/commission-amount.vo.js';
import { VendorTierVO } from '../value-objects/primitives/vendor-tier.vo.js';

export interface CommissionCalculationInput {
  readonly orderAmount: number;
  readonly currency: string;
  readonly applyOnShipping: boolean;
  readonly shippingAmount?: number;
  readonly taxAmount?: number;
}

export interface CommissionBreakdown {
  readonly orderAmount: number;
  readonly shippingAmount: number;
  readonly taxAmount: number;
  readonly baseAmount: number;
  readonly percentPart: number;
  readonly fixedPart: number;
  readonly totalCommission: number;
  readonly vendorEarning: number;
  readonly currency: string;
}

export class VendorCommissionCalculatorService {
  /**
   * Compute commission on an order for a vendor.
   * `baseAmount` is order + (shipping if applyOnShipping) + (tax if applyOnTax).
   */
  static calculate(
    config: VendorCommissionEntity,
    input: CommissionCalculationInput,
  ): CommissionBreakdown {
    if (!Number.isFinite(input.orderAmount) || input.orderAmount < 0) {
      throw new ValidationError('Order amount must be non-negative', 'orderAmount');
    }
    if (input.currency.length !== 3) {
      throw new ValidationError('Currency must be a 3-char ISO code', 'currency');
    }
    if (!config.isCurrentlyEffective()) {
      throw new BusinessRuleError(
        'Commission config is not currently effective',
        'COMMISSION_CONFIG_NOT_EFFECTIVE',
        { commissionId: config.id },
      );
    }

    const shipping = input.shippingAmount ?? 0;
    const tax = input.taxAmount ?? 0;
    const shippingPart = config.applyOnShipping ? shipping : 0;
    const taxPart = config.applyOnTax ? tax : 0;
    const baseAmount = Math.round((input.orderAmount + shippingPart + taxPart) * 100) / 100;

    const { percentPart, fixedPart, total } = config.calculate(baseAmount);
    const vendorEarning = Math.round((baseAmount - total) * 100) / 100;

    return {
      orderAmount: input.orderAmount,
      shippingAmount: shipping,
      taxAmount: tax,
      baseAmount,
      percentPart,
      fixedPart,
      totalCommission: total,
      vendorEarning,
      currency: input.currency.toUpperCase(),
    };
  }

  /** Pure tier-based calculation (no config entity needed). */
  static calculateForTier(
    tier: VendorTierVO,
    orderAmount: number,
    currency: string,
  ): CommissionBreakdown {
    const percent = CommissionPercentVO.create(tier.getCommissionPercent());
    const percentPart = percent.applyTo(orderAmount);
    const total = Math.round(percentPart * 100) / 100;
    return {
      orderAmount,
      shippingAmount: 0,
      taxAmount: 0,
      baseAmount: orderAmount,
      percentPart,
      fixedPart: 0,
      totalCommission: total,
      vendorEarning: Math.round((orderAmount - total) * 100) / 100,
      currency: currency.toUpperCase(),
    };
  }

  /** Quick helper — commission amount only. */
  static calculateAmount(
    config: VendorCommissionEntity,
    orderAmount: number,
    currency: string,
  ): number {
    const result = VendorCommissionCalculatorService.calculate(config, {
      orderAmount,
      currency,
      applyOnShipping: false,
    });
    return result.totalCommission;
  }

  /**
   * Build a commission config entity from tier + overrides.
   * Useful for auto-provisioning new vendors.
   */
  static buildDefaultConfig(params: {
    id: string;
    vendorId: string;
    tier: VendorTierVO;
    currency: string;
    now: string;
  }): VendorCommissionEntity {
    return VendorCommissionEntity.create({
      id: params.id,
      vendorId: params.vendorId,
      type: 'percentage',
      percent: CommissionPercentVO.create(params.tier.getCommissionPercent()),
      fixedAmount: CommissionAmountVO.zero(params.currency),
      currency: params.currency,
      minPercent: 0,
      maxPercent: 50,
      applyOnShipping: false,
      applyOnTax: false,
      now: params.now,
    });
  }

  /**
   * Compare commission across two configs (useful for what-if analysis).
   */
  static compare(
    a: VendorCommissionEntity,
    b: VendorCommissionEntity,
    orderAmount: number,
    currency: string,
  ): { configA: number; configB: number; delta: number } {
    const configA = VendorCommissionCalculatorService.calculateAmount(a, orderAmount, currency);
    const configB = VendorCommissionCalculatorService.calculateAmount(b, orderAmount, currency);
    return { configA, configB, delta: Math.round((configB - configA) * 100) / 100 };
  }

  /** Estimate vendor lifetime value based on tier + projected sales. */
  static estimateLifetimeValue(vendor: VendorEntity, projectedSales: number): number {
    if (projectedSales < 0) {
      throw new ValidationError('Projected sales must be non-negative', 'projectedSales');
    }
    const percent = vendor.tier.getCommissionPercent();
    const commission = projectedSales * (percent / 100);
    return Math.round((projectedSales - commission) * 100) / 100;
  }
}
