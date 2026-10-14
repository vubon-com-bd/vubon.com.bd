/**
 * VendorPerformanceVO — Composite Value Object
 * @module vendor-service/domain/value-objects/composites
 *
 * Vendor এর performance snapshot for a period।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { PerformanceIdVO } from '../primitives/performance-id.vo.js';
import type { PerformanceGradeValue } from '../primitives/score-value.vo.js';
export type { PerformanceGradeValue };
import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { ScoreValueVO } from '../primitives/score-value.vo.js';
import {
  VENDOR_PERFORMANCE,
  VENDOR_PERFORMANCE_METRIC,
  VENDOR_PERFORMANCE_GRADE,
} from '@vubon/shared-constants/business';

export type PerformanceMetricValue =
  (typeof VENDOR_PERFORMANCE_METRIC)[keyof typeof VENDOR_PERFORMANCE_METRIC];


export interface VendorPerformanceVOProps {
  readonly id: PerformanceIdVO;
  readonly vendorId: VendorIdVO;
  readonly overallScore: ScoreValueVO;
  readonly grade: PerformanceGradeValue;
  readonly orderFulfillmentRate: number;
  readonly onTimeShippingRate: number;
  readonly orderCancellationRate: number;
  readonly returnRate: number;
  readonly customerSatisfaction: number;
  readonly averageResponseTimeHours: number;
  readonly averageResolutionTimeHours: number;
  readonly totalOrders: number;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly evaluatedAt: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const VALID_GRADES = new Set<string>(Object.values(VENDOR_PERFORMANCE_GRADE));

export class VendorPerformanceVO extends BaseVO<VendorPerformanceVOProps> {
  private constructor(props: VendorPerformanceVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: VendorPerformanceVOProps): VendorPerformanceVO {
    const vo = new VendorPerformanceVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: VendorPerformanceVOProps): VendorPerformanceVO {
    return new VendorPerformanceVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (!VALID_GRADES.has(v.grade)) {
      throw new ValidationError(`Invalid grade: "${v.grade}"`, 'grade');
    }

    const rateFields = [
      'orderFulfillmentRate',
      'onTimeShippingRate',
      'orderCancellationRate',
      'returnRate',
      'customerSatisfaction',
    ] as const;

    for (const key of rateFields) {
      const val = v[key];
      if (!Number.isFinite(val) || val < 0 || val > 100) {
        throw new ValidationError(`${key} must be between 0 and 100`, key);
      }
    }

    if (v.averageResponseTimeHours < 0) {
      throw new ValidationError('averageResponseTimeHours must be non-negative', 'averageResponseTimeHours');
    }
    if (v.averageResolutionTimeHours < 0) {
      throw new ValidationError('averageResolutionTimeHours must be non-negative', 'averageResolutionTimeHours');
    }

    if (!Number.isInteger(v.totalOrders) || v.totalOrders < 0) {
      throw new ValidationError('totalOrders must be a non-negative integer', 'totalOrders');
    }

    if (new Date(v.periodStart) >= new Date(v.periodEnd)) {
      throw new ValidationError('periodStart must be before periodEnd', 'periodEnd');
    }
  }

  // ─── Getters ───
  get id(): PerformanceIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get overallScore(): ScoreValueVO { return this.value.overallScore; }
  get grade(): PerformanceGradeValue { return this.value.grade; }
  get orderFulfillmentRate(): number { return this.value.orderFulfillmentRate; }
  get onTimeShippingRate(): number { return this.value.onTimeShippingRate; }
  get orderCancellationRate(): number { return this.value.orderCancellationRate; }
  get returnRate(): number { return this.value.returnRate; }
  get customerSatisfaction(): number { return this.value.customerSatisfaction; }
  get averageResponseTimeHours(): number { return this.value.averageResponseTimeHours; }
  get averageResolutionTimeHours(): number { return this.value.averageResolutionTimeHours; }
  get totalOrders(): number { return this.value.totalOrders; }
  get periodStart(): string { return this.value.periodStart; }
  get periodEnd(): string { return this.value.periodEnd; }
  get evaluatedAt(): string { return this.value.evaluatedAt; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  // ─── Predicates ───
  isAPlus(): boolean { return this.grade === 'a_plus'; }
  isA(): boolean { return this.grade === 'a'; }
  isB(): boolean { return this.grade === 'b'; }
  isC(): boolean { return this.grade === 'c'; }
  isD(): boolean { return this.grade === 'd'; }
  isF(): boolean { return this.grade === 'f'; }

  /** Grade is top-tier (a+ or a) */
  isTopTier(): boolean {
    return this.isAPlus() || this.isA();
  }

  /** Grade triggers auto-suspension */
  triggersAutoSuspend(): boolean {
    return this.overallScore.triggersAutoSuspend();
  }

  /** Grade triggers warning */
  triggersWarning(): boolean {
    return this.overallScore.triggersWarning();
  }

  /** Has enough orders for meaningful evaluation */
  isSignificant(): boolean {
    return this.totalOrders >= VENDOR_PERFORMANCE.MIN_ORDERS_FOR_EVALUATION;
  }

  /** Period length in days */
  get periodDays(): number {
    const diff = new Date(this.periodEnd).getTime() - new Date(this.periodStart).getTime();
    return Math.round(diff / (1000 * 60 * 60 * 24));
  }

  /** Score has improved vs another performance snapshot */
  hasImprovedSince(previous: VendorPerformanceVO): boolean {
    return this.overallScore.score > previous.overallScore.score;
  }

  /** Score has declined vs another performance snapshot */
  hasDeclinedSince(previous: VendorPerformanceVO): boolean {
    return this.overallScore.score < previous.overallScore.score;
  }

  /** Performance delta in points */
  deltaFrom(previous: VendorPerformanceVO): number {
    return Math.round((this.overallScore.score - previous.overallScore.score) * 100) / 100;
  }

  /** All metrics above given thresholds */
  meetsAllThresholds(thresholds: {
    fulfillment?: number;
    onTimeShipping?: number;
    cancellation?: number;
    returnRate?: number;
  }): boolean {
    if (thresholds.fulfillment !== undefined && this.orderFulfillmentRate < thresholds.fulfillment) return false;
    if (thresholds.onTimeShipping !== undefined && this.onTimeShippingRate < thresholds.onTimeShipping) return false;
    if (thresholds.cancellation !== undefined && this.orderCancellationRate > thresholds.cancellation) return false;
    if (thresholds.returnRate !== undefined && this.returnRate > thresholds.returnRate) return false;
    return true;
  }
}
