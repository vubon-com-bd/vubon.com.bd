/**
 * VendorPerformanceEntity — periodic performance evaluation
 * @module vendor-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_PERFORMANCE } from '@vubon/shared-constants/business';
import { PerformanceMetricTypeVO } from '../value-objects/primitives/performance-metric-type.vo.js';
import { PerformanceGradeVO } from '../value-objects/primitives/performance-grade.vo.js';

export interface PerformanceMetricEntry {
  readonly metric: PerformanceMetricTypeVO;
  readonly value: number;
  readonly target: number;
  readonly grade: PerformanceGradeVO;
}

export interface VendorPerformanceEntityProps {
  readonly vendorId: string;
  readonly grade: PerformanceGradeVO;
  readonly overallScore: number;
  readonly metrics: readonly PerformanceMetricEntry[];
  readonly evaluationPeriodStart: string;
  readonly evaluationPeriodEnd: string;
  readonly orderCount: number;
  readonly isSuspended: boolean;
  readonly warningIssued: boolean;
}

export class VendorPerformanceEntity extends AggregateRoot<string> {
  private _grade: PerformanceGradeVO;
  private _overallScore: number;
  private _metrics: PerformanceMetricEntry[];
  private _orderCount: number;
  private _isSuspended: boolean;
  private _warningIssued: boolean;

  private readonly _vendorId: string;
  private readonly _evaluationPeriodStart: string;
  private readonly _evaluationPeriodEnd: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorPerformanceEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._grade = props.grade;
    this._overallScore = props.overallScore;
    this._metrics = [...props.metrics];
    this._evaluationPeriodStart = props.evaluationPeriodStart;
    this._evaluationPeriodEnd = props.evaluationPeriodEnd;
    this._orderCount = props.orderCount;
    this._isSuspended = props.isSuspended;
    this._warningIssued = props.warningIssued;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._overallScore < 0 || this._overallScore > 100) {
      throw new ValidationError('Overall score must be between 0 and 100', 'overallScore');
    }
    if (this._metrics.length > 20) {
      throw new ValidationError('Metrics cannot exceed 20 items', 'metrics');
    }
    if (this._orderCount < 0 || !Number.isInteger(this._orderCount)) {
      throw new ValidationError('Order count must be a non-negative integer', 'orderCount');
    }
    if (Date.parse(this._evaluationPeriodEnd) < Date.parse(this._evaluationPeriodStart)) {
      throw new ValidationError('Period end must be after period start', 'evaluationPeriod');
    }
  }

  get vendorId(): string { return this._vendorId; }
  get grade(): PerformanceGradeVO { return this._grade; }
  get overallScore(): number { return this._overallScore; }
  get metrics(): readonly PerformanceMetricEntry[] { return this._metrics; }
  get evaluationPeriodStart(): string { return this._evaluationPeriodStart; }
  get evaluationPeriodEnd(): string { return this._evaluationPeriodEnd; }
  get orderCount(): number { return this._orderCount; }
  get isSuspended(): boolean { return this._isSuspended; }
  get warningIssued(): boolean { return this._warningIssued; }

  hasEnoughData(): boolean {
    return this._orderCount >= VENDOR_PERFORMANCE.MIN_ORDERS_FOR_EVALUATION;
  }

  isAtRisk(): boolean {
    return this._overallScore < VENDOR_PERFORMANCE.WARNING_BELOW;
  }

  shouldAutoSuspend(): boolean {
    return this._overallScore < VENDOR_PERFORMANCE.AUTO_SUSPEND_BELOW;
  }

  isTopPerformer(): boolean {
    return this._grade.isTopGrade();
  }

  getMetric(metric: PerformanceMetricTypeVO): PerformanceMetricEntry | undefined {
    return this._metrics.find((m) => m.metric.value === metric.value);
  }

  /** Best metric by (value/target) ratio. */
  getBestMetric(): PerformanceMetricEntry | undefined {
    if (this._metrics.length === 0) return undefined;
    return [...this._metrics].sort((a, b) => (b.value / b.target) - (a.value / a.target))[0];
  }

  /** Worst metric by (value/target) ratio. */
  getWorstMetric(): PerformanceMetricEntry | undefined {
    if (this._metrics.length === 0) return undefined;
    return [...this._metrics].sort((a, b) => (a.value / a.target) - (b.value / b.target))[0];
  }

  /** Recompute overall score as average of metric ratios. */
  computeOverallScore(): number {
    if (this._metrics.length === 0) return 0;
    let sum = 0;
    for (const m of this._metrics) {
      const ratio = m.metric.isHigherBetter()
        ? Math.min(1, m.value / m.target)
        : Math.min(1, m.target / Math.max(m.value, 0.001));
      sum += ratio;
    }
    return Math.round((sum / this._metrics.length) * 10000) / 100;
  }

  issueWarning(now: string = new Date().toISOString()): void {
    if (this._warningIssued) return;
    this._warningIssued = true;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  clearWarning(now: string = new Date().toISOString()): void {
    if (!this._warningIssued) return;
    this._warningIssued = false;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  suspend(now: string = new Date().toISOString()): void {
    if (this._isSuspended) return;
    this._isSuspended = true;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  reinstate(now: string = new Date().toISOString()): void {
    if (!this._isSuspended) return;
    this._isSuspended = false;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  /** Update the score & grade after recomputing. */
  recalculate(now: string = new Date().toISOString()): void {
    const score = this.computeOverallScore();
    this._overallScore = score;
    this._grade = PerformanceGradeVO.reconstitute(
      VendorPerformanceEntity.gradeFromScore(score),
    );
    // Auto-flag warning if at risk
    if (this.isAtRisk() && !this._warningIssued) {
      this._warningIssued = true;
    }
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  static gradeFromScore(score: number): string {
    if (score >= VENDOR_PERFORMANCE.A_PLUS_THRESHOLD) return 'a_plus';
    if (score >= VENDOR_PERFORMANCE.A_THRESHOLD) return 'a';
    if (score >= VENDOR_PERFORMANCE.B_THRESHOLD) return 'b';
    if (score >= VENDOR_PERFORMANCE.C_THRESHOLD) return 'c';
    if (score >= VENDOR_PERFORMANCE.D_THRESHOLD) return 'd';
    return 'f';
  }

  static create(params: {
    id: string;
    vendorId: string;
    evaluationPeriodStart: string;
    evaluationPeriodEnd: string;
    now: string;
  }): VendorPerformanceEntity {
    return new VendorPerformanceEntity(params.id, params.now, params.now, {
      vendorId: params.vendorId,
      grade: PerformanceGradeVO.reconstitute('f'),
      overallScore: 0,
      metrics: [],
      evaluationPeriodStart: params.evaluationPeriodStart,
      evaluationPeriodEnd: params.evaluationPeriodEnd,
      orderCount: 0,
      isSuspended: false,
      warningIssued: false,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: VendorPerformanceEntityProps;
    deletedAt?: string | null;
    version?: number;
  }): VendorPerformanceEntity {
    const entity = new VendorPerformanceEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
