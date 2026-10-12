/**
 * Composite VO Coverage — Batch 1C (final 9 composites)
 * @module vendor-service/test/unit/domain/value-objects/composites
 */
import { describe, it, expect } from '@jest/globals';

import { VendorReturnPolicyConfigVO } from '../../../../../src/module/domain/value-objects/composites/vendor-return-policy-config.vo.js';
import { VendorSuspensionInfoVO } from '../../../../../src/module/domain/value-objects/composites/vendor-suspension-info.vo.js';
import { VendorPerformanceSummaryVO } from '../../../../../src/module/domain/value-objects/composites/vendor-performance-summary.vo.js';
import { VendorPayoutConfigVO } from '../../../../../src/module/domain/value-objects/composites/vendor-payout-config.vo.js';
import { VendorCommissionConfigVO } from '../../../../../src/module/domain/value-objects/composites/vendor-commission-config.vo.js';
import { VendorStatsSummaryVO } from '../../../../../src/module/domain/value-objects/composites/vendor-stats-summary.vo.js';
import { VendorTeamSummaryVO } from '../../../../../src/module/domain/value-objects/composites/vendor-team-summary.vo.js';
import { VendorBrandingVO } from '../../../../../src/module/domain/value-objects/composites/vendor-branding.vo.js';
import { VendorShippingConfigVO } from '../../../../../src/module/domain/value-objects/composites/vendor-shipping-config.vo.js';

import { ReturnTypeVO } from '../../../../../src/module/domain/value-objects/primitives/return-type.vo.js';
import { ReturnWindowDaysVO } from '../../../../../src/module/domain/value-objects/primitives/return-window-days.vo.js';
import { SuspensionReasonVO } from '../../../../../src/module/domain/value-objects/primitives/suspension-reason.vo.js';
import { PerformanceMetricTypeVO } from '../../../../../src/module/domain/value-objects/primitives/performance-metric-type.vo.js';
import { PayoutAmountVO } from '../../../../../src/module/domain/value-objects/primitives/payout-amount.vo.js';
import { PayoutMethodVO } from '../../../../../src/module/domain/value-objects/primitives/payout-method.vo.js';
import { PayoutCycleVO } from '../../../../../src/module/domain/value-objects/primitives/payout-cycle.vo.js';
import { CommissionPercentVO } from '../../../../../src/module/domain/value-objects/primitives/commission-percent.vo.js';
import { CommissionAmountVO } from '../../../../../src/module/domain/value-objects/primitives/commission-amount.vo.js';
import { RatingScoreVO } from '../../../../../src/module/domain/value-objects/primitives/rating-score.vo.js';
import { MemberRoleVO } from '../../../../../src/module/domain/value-objects/primitives/member-role.vo.js';
import { VendorLogoVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-logo.vo.js';
import { VendorBannerVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-banner.vo.js';
import { ShippingMethodVO } from '../../../../../src/module/domain/value-objects/primitives/shipping-method.vo.js';
import { ShippingZoneVO } from '../../../../../src/module/domain/value-objects/primitives/shipping-zone.vo.js';
import { ShippingCostVO } from '../../../../../src/module/domain/value-objects/primitives/shipping-cost.vo.js';
import { DeliveryDaysVO } from '../../../../../src/module/domain/value-objects/primitives/delivery-days.vo.js';

const NOW = '2025-01-01T00:00:00.000Z';
const FUTURE = '2030-01-01T00:00:00.000Z';
const PAST = '2020-01-01T00:00:00.000Z';

// ═══════════════════════════════════════════════════════════════════
// 1. VendorReturnPolicyConfigVO
// ═══════════════════════════════════════════════════════════════════
describe('VendorReturnPolicyConfigVO', () => {
  function valid(overrides: Record<string, unknown> = {}) {
    return {
      type: ReturnTypeVO.reconstitute('full_return'),
      window: ReturnWindowDaysVO.default(),
      freeReturn: true,
      restockFeePercent: 0,
      requireReason: true,
      requireImages: false,
      maxImages: 5,
      autoApprove: false,
      approvalSlaHours: 48,
      ...overrides,
    } as never;
  }

  it('create() valid', () => {
    expect(VendorReturnPolicyConfigVO.create(valid()).type.value).toBe('full_return');
  });

  it('create() rejects invalid type', () => {
    expect(() => VendorReturnPolicyConfigVO.create(valid({ type: 'bad' }))).toThrow();
  });

  it('create() rejects invalid window', () => {
    expect(() => VendorReturnPolicyConfigVO.create(valid({ window: 'bad' }))).toThrow();
  });

  it('create() rejects restockFeePercent > 100', () => {
    expect(() => VendorReturnPolicyConfigVO.create(valid({ restockFeePercent: 101 }))).toThrow();
  });

  it('create() rejects maxImages > 10', () => {
    expect(() => VendorReturnPolicyConfigVO.create(valid({ maxImages: 11 }))).toThrow();
  });

  it('create() rejects approvalSlaHours <= 0', () => {
    expect(() => VendorReturnPolicyConfigVO.create(valid({ approvalSlaHours: 0 }))).toThrow();
  });

  it('create() rejects NO_RETURN with positive window', () => {
    expect(() =>
      VendorReturnPolicyConfigVO.create(valid({
        type: ReturnTypeVO.reconstitute('no_return'),
        window: ReturnWindowDaysVO.create(7),
      })),
    ).toThrow();
  });

  it('defaults() returns default config', () => {
    expect(VendorReturnPolicyConfigVO.defaults().type.value).toBe('full_return');
  });

  it('allowsReturn/allowsRefund/isExchangeOnly', () => {
    const vo = VendorReturnPolicyConfigVO.create(valid());
    expect(vo.allowsReturn()).toBe(true);
    expect(vo.allowsRefund()).toBe(true);
    expect(vo.isExchangeOnly()).toBe(false);
  });

  it('calculateRestockFee 0 when not freeReturn', () => {
    const vo = VendorReturnPolicyConfigVO.create(valid({ freeReturn: false, restockFeePercent: 10 }));
    expect(vo.calculateRestockFee(1000)).toBe(0);
  });

  it('calculateRestockFee computes when freeReturn', () => {
    const vo = VendorReturnPolicyConfigVO.create(valid({ freeReturn: true, restockFeePercent: 10 }));
    expect(vo.calculateRestockFee(1000)).toBe(100);
  });

  it('canReturnAt true within window', () => {
    const vo = VendorReturnPolicyConfigVO.create(valid());
    expect(vo.canReturnAt(new Date('2025-01-01T00:00:00Z'), new Date('2025-01-03T00:00:00Z'))).toBe(true);
  });

  it('canReturnAt false outside window', () => {
    const vo = VendorReturnPolicyConfigVO.create(valid());
    expect(vo.canReturnAt(new Date('2025-01-01T00:00:00Z'), new Date('2025-02-15T00:00:00Z'))).toBe(false);
  });

  it('getReturnDeadline returns date', () => {
    const vo = VendorReturnPolicyConfigVO.create(valid());
    expect(vo.getReturnDeadline(new Date(NOW))).toBeInstanceOf(Date);
  });

  it('isGenerousPolicy true when generous + freeReturn', () => {
    const vo = VendorReturnPolicyConfigVO.create(valid({
      window: ReturnWindowDaysVO.create(20),
      freeReturn: true,
    }));
    expect(vo.isGenerousPolicy()).toBe(true);
  });

  it('isStrictPolicy true for short window', () => {
    const vo = VendorReturnPolicyConfigVO.create(valid({
      window: ReturnWindowDaysVO.create(3),
    }));
    expect(vo.isStrictPolicy()).toBe(true);
  });

  it('isStrictPolicy true when not freeReturn', () => {
    const vo = VendorReturnPolicyConfigVO.create(valid({ freeReturn: false }));
    expect(vo.isStrictPolicy()).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════════
// 2. VendorSuspensionInfoVO
// ═══════════════════════════════════════════════════════════════════
describe('VendorSuspensionInfoVO', () => {
  function valid(overrides: Record<string, unknown> = {}) {
    return {
      reason: SuspensionReasonVO.create('policy_violation'),
      suspendedAt: NOW,
      suspendedBy: 'admin-1',
      durationDays: 30,
      autoLiftOnResolution: true,
      ...overrides,
    } as never;
  }

  it('create() valid', () => {
    expect(VendorSuspensionInfoVO.create(valid()).reason.value).toBe('policy_violation');
  });

  it('create() rejects invalid reason', () => {
    expect(() => VendorSuspensionInfoVO.create(valid({ reason: 'bad' }))).toThrow();
  });

  it('create() rejects invalid suspendedAt', () => {
    expect(() => VendorSuspensionInfoVO.create(valid({ suspendedAt: 'bad' }))).toThrow();
  });

  it('create() rejects duration <= 0', () => {
    expect(() => VendorSuspensionInfoVO.create(valid({ durationDays: 0 }))).toThrow();
  });

  it('create() rejects notes > 1000', () => {
    expect(() => VendorSuspensionInfoVO.create(valid({ notes: 'x'.repeat(1001) }))).toThrow();
  });

  it('calculateLiftDate returns future', () => {
    expect(VendorSuspensionInfoVO.create(valid()).calculateLiftDate().getTime()).toBeGreaterThan(new Date(NOW).getTime());
  });

  it('isExpired false within window', () => {
    expect(VendorSuspensionInfoVO.create(valid()).isExpired(new Date(NOW))).toBe(false);
  });

  it('isExpired true after window', () => {
    const vo = VendorSuspensionInfoVO.create(valid({ suspendedAt: PAST, durationDays: 1 }));
    expect(vo.isExpired(new Date(NOW))).toBe(true);
  });

  it('daysRemaining positive within window', () => {
    expect(VendorSuspensionInfoVO.create(valid()).daysRemaining(new Date(NOW))).toBeGreaterThan(0);
  });

  it('daysRemaining 0 when expired', () => {
    const vo = VendorSuspensionInfoVO.create(valid({ suspendedAt: PAST, durationDays: 1 }));
    expect(vo.daysRemaining(new Date(NOW))).toBe(0);
  });

  it('canAppeal true within window', () => {
    const vo = VendorSuspensionInfoVO.create(valid({
      appealDeadline: FUTURE,
    }));
    expect(vo.canAppeal(new Date(NOW))).toBe(true);
  });

  it('canAppeal false when appeal submitted', () => {
    const vo = VendorSuspensionInfoVO.create(valid({
      appealDeadline: FUTURE,
      appealSubmittedAt: NOW,
    }));
    expect(vo.canAppeal(new Date(NOW))).toBe(false);
  });

  it('hasAppeal false when not submitted', () => {
    expect(VendorSuspensionInfoVO.create(valid()).hasAppeal()).toBe(false);
  });

  it('hasAppeal true when submitted', () => {
    const vo = VendorSuspensionInfoVO.create(valid({ appealSubmittedAt: NOW }));
    expect(vo.hasAppeal()).toBe(true);
  });

  it('computeAppealDeadline returns future', () => {
    expect(new Date(VendorSuspensionInfoVO.computeAppealDeadline(NOW)).getTime()).toBeGreaterThan(new Date(NOW).getTime());
  });

  it('isSevere true for fraud', () => {
    const vo = VendorSuspensionInfoVO.create(valid({ reason: SuspensionReasonVO.create('fraud') }));
    expect(vo.isSevere()).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════════
// 3. VendorPerformanceSummaryVO
// ═══════════════════════════════════════════════════════════════════
describe('VendorPerformanceSummaryVO', () => {
  function valid(overrides: Record<string, unknown> = {}) {
    return {
      grade: 'b',
      overallScore: 80,
      metrics: [],
      evaluationPeriodStart: NOW,
      evaluationPeriodEnd: FUTURE,
      orderCount: 50,
      isSuspended: false,
      warningIssued: false,
      ...overrides,
    } as never;
  }

  it('create() valid', () => {
    expect(VendorPerformanceSummaryVO.create(valid()).grade).toBe('b');
  });

  it('create() rejects invalid grade', () => {
    expect(() => VendorPerformanceSummaryVO.create(valid({ grade: 'bogus' }))).toThrow();
  });

  it('create() rejects score > 100', () => {
    expect(() => VendorPerformanceSummaryVO.create(valid({ overallScore: 101 }))).toThrow();
  });

  it('create() rejects negative score', () => {
    expect(() => VendorPerformanceSummaryVO.create(valid({ overallScore: -1 }))).toThrow();
  });

  it('create() rejects > 20 metrics', () => {
    expect(() => VendorPerformanceSummaryVO.create(valid({ metrics: new Array(21).fill({ name: 'x', value: 1, target: 1 }) }))).toThrow();
  });

  it('create() rejects non-integer orderCount', () => {
    expect(() => VendorPerformanceSummaryVO.create(valid({ orderCount: 1.5 }))).toThrow();
  });

  it('create() rejects periodEnd < periodStart', () => {
    expect(() => VendorPerformanceSummaryVO.create(valid({
      evaluationPeriodStart: FUTURE,
      evaluationPeriodEnd: NOW,
    }))).toThrow();
  });

  it('isTopPerformer true for a', () => {
    expect(VendorPerformanceSummaryVO.create(valid({ grade: 'a' })).isTopPerformer()).toBe(true);
  });

  it('isTopPerformer false for b', () => {
    expect(VendorPerformanceSummaryVO.create(valid()).isTopPerformer()).toBe(false);
  });

  it('isAtRisk true for low score', () => {
    expect(VendorPerformanceSummaryVO.create(valid({ overallScore: 40 })).isAtRisk()).toBe(true);
  });

  it('shouldAutoSuspend true for very low', () => {
    expect(VendorPerformanceSummaryVO.create(valid({ overallScore: 30 })).shouldAutoSuspend()).toBe(true);
  });

  it('hasEnoughData true for >= min orders', () => {
    expect(VendorPerformanceSummaryVO.create(valid({ orderCount: 100 })).hasEnoughData()).toBe(true);
  });

  it('getGradeLabel returns label', () => {
    expect(VendorPerformanceSummaryVO.create(valid()).getGradeLabel()).toBe('B');
  });

  it('getWorstMetric undefined when empty', () => {
    expect(VendorPerformanceSummaryVO.create(valid()).getWorstMetric()).toBeUndefined();
  });

  it('getBestMetric undefined when empty', () => {
    expect(VendorPerformanceSummaryVO.create(valid()).getBestMetric()).toBeUndefined();
  });

  it('gradeFromScore mapping', () => {
    expect(VendorPerformanceSummaryVO.gradeFromScore(95)).toBe('a_plus');
    expect(VendorPerformanceSummaryVO.gradeFromScore(50)).toBe('f');
  });
});

// ═══════════════════════════════════════════════════════════════════
// 4. VendorPayoutConfigVO
// ═══════════════════════════════════════════════════════════════════
describe('VendorPayoutConfigVO', () => {
  function valid(overrides: Record<string, unknown> = {}) {
    return {
      method: 'bank_transfer',
      cycle: 'weekly',
      minAmount: PayoutAmountVO.minimum('BDT'),
      autoPayout: false,
      requireApproval: true,
      bankAccountId: 'acct-1',
      ...overrides,
    } as never;
  }

  it('create() valid', () => {
    expect(VendorPayoutConfigVO.create(valid()).method).toBe('bank_transfer');
  });

  it('create() rejects invalid method', () => {
    expect(() => VendorPayoutConfigVO.create(valid({ method: 'bad' }))).toThrow();
  });

  it('create() rejects invalid cycle', () => {
    expect(() => VendorPayoutConfigVO.create(valid({ cycle: 'bad' }))).toThrow();
  });

  it('create() rejects non-VO minAmount', () => {
    expect(() => VendorPayoutConfigVO.create(valid({ minAmount: 'bad' }))).toThrow();
  });

  it('create() rejects bank_transfer without account', () => {
    expect(() => VendorPayoutConfigVO.create(valid({ method: 'bank_transfer', bankAccountId: undefined }))).toThrow();
  });

  it('create() rejects autoPayout + requireApproval', () => {
    expect(() => VendorPayoutConfigVO.create(valid({ autoPayout: true, requireApproval: true }))).toThrow();
  });

  it('defaults() returns default config', () => {
    expect(VendorPayoutConfigVO.defaults('BDT')).toBeDefined();
  });

  it('getters', () => {
    const vo = VendorPayoutConfigVO.create(valid());
    expect(vo.method).toBe('bank_transfer');
    expect(vo.cycle).toBe('weekly');
    expect(vo.minAmount).toBeDefined();
    expect(vo.autoPayout).toBe(false);
    expect(vo.requireApproval).toBe(true);
    expect(vo.bankAccountId).toBe('acct-1');
  });

  it('getHoldDays returns number', () => {
    expect(typeof VendorPayoutConfigVO.create(valid()).getHoldDays()).toBe('number');
  });

  it('isBankTransfer/isMobileBanking', () => {
    const vo = VendorPayoutConfigVO.create(valid());
    expect(vo.isBankTransfer()).toBe(true);
    expect(vo.isMobileBanking()).toBe(false);
  });

  it('isOnDemand', () => {
    expect(VendorPayoutConfigVO.create(valid({ cycle: 'on_demand' })).isOnDemand()).toBe(true);
  });

  it('isAutoPayoutEnabled false by default', () => {
    expect(VendorPayoutConfigVO.create(valid()).isAutoPayoutEnabled()).toBe(false);
  });

  it('cycleHours correct', () => {
    expect(VendorPayoutConfigVO.create(valid({ cycle: 'daily' })).cycleHours()).toBe(24);
  });

  it('withBankAccount returns new config', () => {
    const vo = VendorPayoutConfigVO.create(valid());
    expect(vo.withBankAccount('acct-2').bankAccountId).toBe('acct-2');
  });
});

// ═══════════════════════════════════════════════════════════════════
// 5. VendorCommissionConfigVO
// ═══════════════════════════════════════════════════════════════════
describe('VendorCommissionConfigVO', () => {
  function valid(overrides: Record<string, unknown> = {}) {
    return {
      type: 'percentage',
      percent: CommissionPercentVO.create(15),
      applyOnShipping: false,
      applyOnTax: false,
      effectiveFrom: NOW,
      ...overrides,
    } as never;
  }

  it('create() valid', () => {
    expect(VendorCommissionConfigVO.create(valid()).type).toBe('percentage');
  });

  it('create() rejects invalid type', () => {
    expect(() => VendorCommissionConfigVO.create(valid({ type: 'bad' }))).toThrow();
  });

  it('create() rejects non-VO percent', () => {
    expect(() => VendorCommissionConfigVO.create(valid({ percent: 'bad' }))).toThrow();
  });

  it('create() rejects non-VO fixedAmount', () => {
    expect(() => VendorCommissionConfigVO.create(valid({ fixedAmount: 'bad' }))).toThrow();
  });

  it('create() rejects FIXED type without fixedAmount', () => {
    expect(() => VendorCommissionConfigVO.create(valid({ type: 'fixed' }))).toThrow();
  });

  it('create() rejects effectiveTo <= effectiveFrom', () => {
    expect(() => VendorCommissionConfigVO.create(valid({ effectiveTo: PAST }))).toThrow();
  });

  it('calculateCommission percentage only', () => {
    const vo = VendorCommissionConfigVO.create(valid({ percent: CommissionPercentVO.create(10) }));
    expect(vo.calculateCommission(1000)).toBe(100);
  });

  it('calculateCommission with fixedAmount', () => {
    const vo = VendorCommissionConfigVO.create(valid({
      type: 'hybrid',
      percent: CommissionPercentVO.create(10),
      fixedAmount: CommissionAmountVO.create(50, 'BDT'),
    }));
    expect(vo.calculateCommission(1000)).toBe(150);
  });

  it('isActive true within range', () => {
    expect(VendorCommissionConfigVO.create(valid({ effectiveFrom: PAST })).isActive()).toBe(true);
  });

  it('isActive false past effectiveTo', () => {
    const vo = VendorCommissionConfigVO.create(valid({
      effectiveFrom: '2018-01-01T00:00:00.000Z',
      effectiveTo: '2019-01-01T00:00:00.000Z',
    }));
    expect(vo.isActive(new Date(NOW))).toBe(false);
  });

  it('isPercentage/isFixed', () => {
    const vo = VendorCommissionConfigVO.create(valid());
    expect(vo.isPercentage()).toBe(true);
    expect(vo.isFixed()).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════════════
// 6. VendorStatsSummaryVO
// ═══════════════════════════════════════════════════════════════════
describe('VendorStatsSummaryVO', () => {
  function valid(overrides: Record<string, unknown> = {}) {
    return {
      totalProducts: 100,
      totalOrders: 500,
      totalRevenue: 100000,
      totalCommission: 15000,
      totalPayout: 80000,
      averageRating: RatingScoreVO.create(4.5),
      fulfillmentRate: 0.95,
      currency: 'BDT',
      ...overrides,
    } as never;
  }

  it('create() valid', () => {
    expect(VendorStatsSummaryVO.create(valid()).totalOrders).toBe(500);
  });

  it('create() rejects negative totalProducts', () => {
    expect(() => VendorStatsSummaryVO.create(valid({ totalProducts: -1 }))).toThrow();
  });

  it('create() rejects non-VO averageRating', () => {
    expect(() => VendorStatsSummaryVO.create(valid({ averageRating: 'bad' }))).toThrow();
  });

  it('create() rejects fulfillmentRate > 1', () => {
    expect(() => VendorStatsSummaryVO.create(valid({ fulfillmentRate: 1.5 }))).toThrow();
  });

  it('create() rejects invalid currency', () => {
    expect(() => VendorStatsSummaryVO.create(valid({ currency: 'AB' }))).toThrow();
  });

  it('getPlatformEarning computes', () => {
    expect(VendorStatsSummaryVO.create(valid()).getPlatformEarning()).toBe(20000);
  });

  it('getAverageOrderValue 0 for no orders', () => {
    const vo = VendorStatsSummaryVO.create(valid({ totalOrders: 0 }));
    expect(vo.getAverageOrderValue()).toBe(0);
  });

  it('getAverageOrderValue computes', () => {
    expect(VendorStatsSummaryVO.create(valid()).getAverageOrderValue()).toBe(200);
  });

  it('getPayoutRatio 0 for no revenue', () => {
    const vo = VendorStatsSummaryVO.create(valid({ totalRevenue: 0, totalPayout: 0 }));
    expect(vo.getPayoutRatio()).toBe(0);
  });

  it('getPayoutRatio computes', () => {
    expect(VendorStatsSummaryVO.create(valid()).getPayoutRatio()).toBe(0.8);
  });

  it('isHighVolume true for >= 1000 orders', () => {
    const vo = VendorStatsSummaryVO.create(valid({ totalOrders: 1000 }));
    expect(vo.isHighVolume()).toBe(true);
  });

  it('isLowFulfillment true for < 0.8', () => {
    const vo = VendorStatsSummaryVO.create(valid({ fulfillmentRate: 0.5 }));
    expect(vo.isLowFulfillment()).toBe(true);
  });

  it('isHealthy true for good stats', () => {
    expect(VendorStatsSummaryVO.create(valid()).isHealthy()).toBe(true);
  });

  it('toDisplaySummary returns object', () => {
    expect(VendorStatsSummaryVO.create(valid()).toDisplaySummary()).toBeDefined();
  });
});

// ═══════════════════════════════════════════════════════════════════
// 7. VendorTeamSummaryVO
// ═══════════════════════════════════════════════════════════════════
describe('VendorTeamSummaryVO', () => {
  function valid(overrides: Record<string, unknown> = {}) {
    return {
      totalMembers: 5,
      activeMembers: 4,
      pendingInvites: 1,
      roleCounts: [],
      ownerCount: 1,
      ...overrides,
    } as never;
  }

  it('create() valid', () => {
    expect(VendorTeamSummaryVO.create(valid()).totalMembers).toBe(5);
  });

  it('create() rejects negative totalMembers', () => {
    expect(() => VendorTeamSummaryVO.create(valid({ totalMembers: -1 }))).toThrow();
  });

  it('create() rejects active > total', () => {
    expect(() => VendorTeamSummaryVO.create(valid({ activeMembers: 10 }))).toThrow();
  });

  it('create() rejects ownerCount < 1', () => {
    expect(() => VendorTeamSummaryVO.create(valid({ ownerCount: 0 }))).toThrow();
  });

  it('create() rejects ownerCount > 1', () => {
    expect(() => VendorTeamSummaryVO.create(valid({ ownerCount: 2 }))).toThrow();
  });

  it('getActiveRatio 0 for empty', () => {
    const vo = VendorTeamSummaryVO.create(valid({ totalMembers: 1, activeMembers: 0, ownerCount: 1 }));
    expect(vo.getActiveRatio()).toBe(0);
  });

  it('getActiveRatio computes', () => {
    expect(VendorTeamSummaryVO.create(valid()).getActiveRatio()).toBe(0.8);
  });

  it('isAtDefaultLimit false for small', () => {
    expect(VendorTeamSummaryVO.create(valid()).isAtDefaultLimit()).toBe(false);
  });

  it('canAddMember true for free plan', () => {
    expect(VendorTeamSummaryVO.create(valid()).canAddMember()).toBe(true);
  });

  it('getCountForRole returns count', () => {
    const vo = VendorTeamSummaryVO.create(valid({
      roleCounts: [{ role: MemberRoleVO.create('vendor_staff'), count: 3 }],
    }));
    expect(vo.getCountForRole(MemberRoleVO.create('vendor_staff'))).toBe(3);
  });

  it('hasRole true/false', () => {
    const vo = VendorTeamSummaryVO.create(valid({
      roleCounts: [{ role: MemberRoleVO.create('vendor_manager'), count: 1 }],
    }));
    expect(vo.hasRole(MemberRoleVO.create('vendor_manager'))).toBe(true);
    expect(vo.hasRole(MemberRoleVO.create('vendor_staff'))).toBe(false);
  });

  it('hasManagerialStaff', () => {
    const vo = VendorTeamSummaryVO.create(valid({
      roleCounts: [{ role: MemberRoleVO.create('vendor_manager'), count: 1 }],
    }));
    expect(vo.hasManagerialStaff()).toBe(true);
  });

  it('isSmallTeam true for <= 5', () => {
    expect(VendorTeamSummaryVO.create(valid()).isSmallTeam()).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════════
// 8. VendorBrandingVO
// ═══════════════════════════════════════════════════════════════════
describe('VendorBrandingVO', () => {
  it('empty() has no logo/banner', () => {
    const vo = VendorBrandingVO.empty();
    expect(vo.hasLogo()).toBe(false);
    expect(vo.hasBanner()).toBe(false);
  });

  it('create() with logo only', () => {
    const vo = VendorBrandingVO.create({
      logo: VendorLogoVO.create('https://cdn.example.com/l.png'),
    });
    expect(vo.hasLogo()).toBe(true);
    expect(vo.hasBanner()).toBe(false);
  });

  it('create() rejects non-VO logo', () => {
    expect(() => VendorBrandingVO.create({ logo: 'bad' as never })).toThrow();
  });

  it('create() rejects non-VO banner', () => {
    expect(() => VendorBrandingVO.create({ banner: 'bad' as never })).toThrow();
  });

  it('getters', () => {
    const logo = VendorLogoVO.create('https://cdn.example.com/l.png');
    const vo = VendorBrandingVO.create({ logo });
    expect(vo.logo?.value).toBe(logo.value);
    expect(vo.banner).toBeUndefined();
  });

  it('isComplete true when both set', () => {
    const vo = VendorBrandingVO.create({
      logo: VendorLogoVO.create('https://cdn.example.com/l.png'),
      banner: VendorBannerVO.create('https://cdn.example.com/b.jpg'),
    });
    expect(vo.isComplete()).toBe(true);
  });

  it('isBranded true with logo only', () => {
    const vo = VendorBrandingVO.create({
      logo: VendorLogoVO.create('https://cdn.example.com/l.png'),
    });
    expect(vo.isBranded()).toBe(true);
  });

  it('withLogo returns new branding', () => {
    const vo = VendorBrandingVO.empty();
    const updated = vo.withLogo(VendorLogoVO.create('https://cdn.example.com/l.png'));
    expect(updated.hasLogo()).toBe(true);
  });

  it('withBanner returns new branding', () => {
    const vo = VendorBrandingVO.empty();
    const updated = vo.withBanner(VendorBannerVO.create('https://cdn.example.com/b.jpg'));
    expect(updated.hasBanner()).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════════
// 9. VendorShippingConfigVO
// ═══════════════════════════════════════════════════════════════════
describe('VendorShippingConfigVO', () => {
  function rate(method: string, zone: string, cost: number, isActive = true) {
    return {
      method: ShippingMethodVO.create(method),
      zone: ShippingZoneVO.create(zone),
      cost: ShippingCostVO.create(cost, 'BDT'),
      deliveryDays: DeliveryDaysVO.create(1, 5),
      isActive,
    };
  }

  function valid(overrides: Record<string, unknown> = {}) {
    return {
      rates: [rate('standard', 'inside_city', 60)],
      defaultMethod: ShippingMethodVO.create('standard'),
      trackingRequired: true,
      allowPickup: true,
      allowCourier: true,
      ...overrides,
    } as never;
  }

  it('create() valid', () => {
    expect(VendorShippingConfigVO.create(valid()).defaultMethod.value).toBe('standard');
  });

  it('create() rejects empty rates', () => {
    expect(() => VendorShippingConfigVO.create(valid({ rates: [] }))).toThrow();
  });

  it('create() rejects > 50 rates', () => {
    expect(() => VendorShippingConfigVO.create(valid({ rates: new Array(51).fill(rate('standard', 'inside_city', 60)) }))).toThrow();
  });

  it('create() rejects invalid defaultMethod', () => {
    expect(() => VendorShippingConfigVO.create(valid({ defaultMethod: 'bad' }))).toThrow();
  });

  it('create() rejects duplicate method+zone', () => {
    expect(() => VendorShippingConfigVO.create(valid({
      rates: [rate('standard', 'inside_city', 60), rate('standard', 'inside_city', 70)],
    }))).toThrow();
  });

  it('create() rejects default method without active rate', () => {
    expect(() => VendorShippingConfigVO.create(valid({
      rates: [rate('express', 'inside_city', 120)],
    }))).toThrow();
  });

  it('getActiveRates filters', () => {
    const vo = VendorShippingConfigVO.create(valid({
      rates: [rate('standard', 'inside_city', 60, true), rate('express', 'inside_city', 100, false)],
    }));
    expect(vo.getActiveRates().length).toBe(1);
  });

  it('getRatesForZone filters by zone', () => {
    const vo = VendorShippingConfigVO.create(valid());
    expect(vo.getRatesForZone(ShippingZoneVO.create('inside_city')).length).toBe(1);
  });

  it('findRate returns rate', () => {
    const vo = VendorShippingConfigVO.create(valid());
    expect(vo.findRate(ShippingMethodVO.create('standard'), ShippingZoneVO.create('inside_city'))).toBeDefined();
  });

  it('getCheapestRate undefined for empty zone', () => {
    const vo = VendorShippingConfigVO.create(valid());
    expect(vo.getCheapestRate(ShippingZoneVO.create('international'))).toBeUndefined();
  });

  it('getCheapestRate returns cheapest', () => {
    const vo = VendorShippingConfigVO.create(valid({
      rates: [rate('standard', 'inside_city', 60), rate('express', 'inside_city', 120)],
    }));
    expect(vo.getCheapestRate(ShippingZoneVO.create('inside_city'))?.cost.amount).toBe(60);
  });

  it('getFastestRate undefined for empty zone', () => {
    const vo = VendorShippingConfigVO.create(valid());
    expect(vo.getFastestRate(ShippingZoneVO.create('international'))).toBeUndefined();
  });

  it('supportsZone', () => {
    const vo = VendorShippingConfigVO.create(valid());
    expect(vo.supportsZone(ShippingZoneVO.create('inside_city'))).toBe(true);
    expect(vo.supportsZone(ShippingZoneVO.create('international'))).toBe(false);
  });

  it('supportsMethod', () => {
    const vo = VendorShippingConfigVO.create(valid());
    expect(vo.supportsMethod(ShippingMethodVO.create('standard'))).toBe(true);
  });
});
