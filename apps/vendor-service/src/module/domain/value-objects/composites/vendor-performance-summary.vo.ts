/**
 * VendorPerformanceSummaryVO — computed performance grade + metrics
 * @module vendor-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_PERFORMANCE, VENDOR_PERFORMANCE_GRADE } from '@vubon/shared-constants/business';

export type PerformanceGrade = (typeof VENDOR_PERFORMANCE_GRADE)[keyof typeof VENDOR_PERFORMANCE_GRADE];

export interface PerformanceMetric {
  readonly name: string;
  readonly value: number;
  readonly target: number;
}

export interface VendorPerformanceSummaryVOProps {
  readonly grade: PerformanceGrade;
  readonly overallScore: number;
  readonly metrics: readonly PerformanceMetric[];
  readonly evaluationPeriodStart: string;
  readonly evaluationPeriodEnd: string;
  readonly orderCount: number;
  readonly isSuspended: boolean;
  readonly warningIssued: boolean;
}

const ALLOWED_GRADES = Object.values(VENDOR_PERFORMANCE_GRADE) as readonly string[];

export class VendorPerformanceSummaryVO extends BaseVO<VendorPerformanceSummaryVOProps> {
  private constructor(props: VendorPerformanceSummaryVOProps) {
    super(props);
  }

  static create(props: VendorPerformanceSummaryVOProps): VendorPerformanceSummaryVO {
    if (!ALLOWED_GRADES.includes(props.grade)) {
      throw new ValidationError(`Invalid performance grade "${props.grade}"`, 'grade');
    }
    if (!Number.isFinite(props.overallScore) || props.overallScore < 0 || props.overallScore > 100) {
      throw new ValidationError('Overall score must be between 0 and 100', 'overallScore');
    }
    if (!Array.isArray(props.metrics) || props.metrics.length > 20) {
      throw new ValidationError('Metrics must be an array with max 20 items', 'metrics');
    }
    if (props.orderCount < 0 || !Number.isInteger(props.orderCount)) {
      throw new ValidationError('Order count must be a non-negative integer', 'orderCount');
    }
    if (Date.parse(props.evaluationPeriodEnd) < Date.parse(props.evaluationPeriodStart)) {
      throw new ValidationError('Evaluation end date must be after start date', 'evaluationPeriod');
    }
    return new VendorPerformanceSummaryVO(props);
  }

  static reconstitute(props: VendorPerformanceSummaryVOProps): VendorPerformanceSummaryVO {
    return new VendorPerformanceSummaryVO(props);
  }

  get grade(): PerformanceGrade { return this.value.grade; }
  get overallScore(): number { return this.value.overallScore; }
  get metrics(): readonly PerformanceMetric[] { return this.value.metrics; }
  get orderCount(): number { return this.value.orderCount; }
  get isSuspended(): boolean { return this.value.isSuspended; }
  get warningIssued(): boolean { return this.value.warningIssued; }

  isTopPerformer(): boolean {
    return this.value.grade === VENDOR_PERFORMANCE_GRADE.A_PLUS
      || this.value.grade === VENDOR_PERFORMANCE_GRADE.A;
  }

  isAtRisk(): boolean {
    return this.value.overallScore < VENDOR_PERFORMANCE.WARNING_BELOW;
  }

  shouldAutoSuspend(): boolean {
    return this.value.overallScore < VENDOR_PERFORMANCE.AUTO_SUSPEND_BELOW;
  }

  hasEnoughData(): boolean {
    return this.value.orderCount >= VENDOR_PERFORMANCE.MIN_ORDERS_FOR_EVALUATION;
  }

  getGradeLabel(): string {
    const labels: Record<string, string> = {
      [VENDOR_PERFORMANCE_GRADE.A_PLUS]: 'A+',
      [VENDOR_PERFORMANCE_GRADE.A]: 'A',
      [VENDOR_PERFORMANCE_GRADE.B]: 'B',
      [VENDOR_PERFORMANCE_GRADE.C]: 'C',
      [VENDOR_PERFORMANCE_GRADE.D]: 'D',
      [VENDOR_PERFORMANCE_GRADE.F]: 'F',
    };
    return labels[this.value.grade] ?? this.value.grade;
  }

  getWorstMetric(): PerformanceMetric | undefined {
    if (this.value.metrics.length === 0) return undefined;
    return [...this.value.metrics].sort((a, b) => (a.value / a.target) - (b.value / b.target))[0];
  }

  getBestMetric(): PerformanceMetric | undefined {
    if (this.value.metrics.length === 0) return undefined;
    return [...this.value.metrics].sort((a, b) => (b.value / b.target) - (a.value / a.target))[0];
  }

  static gradeFromScore(score: number): PerformanceGrade {
    if (score >= VENDOR_PERFORMANCE.A_PLUS_THRESHOLD) return VENDOR_PERFORMANCE_GRADE.A_PLUS;
    if (score >= VENDOR_PERFORMANCE.A_THRESHOLD) return VENDOR_PERFORMANCE_GRADE.A;
    if (score >= VENDOR_PERFORMANCE.B_THRESHOLD) return VENDOR_PERFORMANCE_GRADE.B;
    if (score >= VENDOR_PERFORMANCE.C_THRESHOLD) return VENDOR_PERFORMANCE_GRADE.C;
    if (score >= VENDOR_PERFORMANCE.D_THRESHOLD) return VENDOR_PERFORMANCE_GRADE.D;
    return VENDOR_PERFORMANCE_GRADE.F;
  }
}
