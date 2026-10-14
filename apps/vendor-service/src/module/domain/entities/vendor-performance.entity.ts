/**
 * VendorPerformanceEntity — Child Entity
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import {
  VendorPerformanceVO,
  type VendorPerformanceVOProps,
} from '../value-objects/composites/vendor-performance.vo.js';

export interface VendorPerformanceEntityProps {
  readonly vo: VendorPerformanceVO;
}

export class VendorPerformanceEntity extends BaseEntity<string> {
  private _vo: VendorPerformanceVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorPerformanceEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
  }

  // ═══ Getters ═══
  get vo(): VendorPerformanceVO { return this._vo; }
  get performanceId() { return this._vo.id; }
  get vendorId() { return this._vo.vendorId; }
  get overallScore() { return this._vo.overallScore; }
  get grade() { return this._vo.grade; }
  get orderFulfillmentRate(): number { return this._vo.orderFulfillmentRate; }
  get onTimeShippingRate(): number { return this._vo.onTimeShippingRate; }
  get orderCancellationRate(): number { return this._vo.orderCancellationRate; }
  get returnRate(): number { return this._vo.returnRate; }
  get customerSatisfaction(): number { return this._vo.customerSatisfaction; }
  get averageResponseTimeHours(): number { return this._vo.averageResponseTimeHours; }
  get averageResolutionTimeHours(): number { return this._vo.averageResolutionTimeHours; }
  get totalOrders(): number { return this._vo.totalOrders; }
  get periodStart(): string { return this._vo.periodStart; }
  get periodEnd(): string { return this._vo.periodEnd; }
  get evaluatedAt(): string { return this._vo.evaluatedAt; }
  get periodDays(): number { return this._vo.periodDays; }

  // ═══ Predicates ═══
  isAPlus(): boolean { return this._vo.isAPlus(); }
  isA(): boolean { return this._vo.isA(); }
  isB(): boolean { return this._vo.isB(); }
  isC(): boolean { return this._vo.isC(); }
  isD(): boolean { return this._vo.isD(); }
  isF(): boolean { return this._vo.isF(); }
  isTopTier(): boolean { return this._vo.isTopTier(); }
  triggersAutoSuspend(): boolean { return this._vo.triggersAutoSuspend(); }
  triggersWarning(): boolean { return this._vo.triggersWarning(); }
  isSignificant(): boolean { return this._vo.isSignificant(); }

  // ═══ Comparisons ═══
  hasImprovedSince(previous: VendorPerformanceEntity): boolean {
    return this._vo.hasImprovedSince(previous._vo);
  }

  hasDeclinedSince(previous: VendorPerformanceEntity): boolean {
    return this._vo.hasDeclinedSince(previous._vo);
  }

  deltaFrom(previous: VendorPerformanceEntity): number {
    return this._vo.deltaFrom(previous._vo);
  }

  meetsAllThresholds(thresholds: {
    fulfillment?: number;
    onTimeShipping?: number;
    cancellation?: number;
    returnRate?: number;
  }): boolean {
    return this._vo.meetsAllThresholds(thresholds);
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: VendorPerformanceVO;
    now: string;
  }): VendorPerformanceEntity {
    return new VendorPerformanceEntity(params.id, params.now, params.now, { vo: params.vo }, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: VendorPerformanceEntityProps;
  }): VendorPerformanceEntity {
    return new VendorPerformanceEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
