/**
 * ComplaintSeverityDetailVO — Composite view with computed severity
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ComplaintSeverityVO } from '../primitives/complaint-severity.vo';

export interface ComplaintSeverityDetailVOProps {
  readonly severity: ComplaintSeverityVO;
  readonly impactScore: number;
  readonly urgencyScore: number;
}

export class ComplaintSeverityDetailVO extends BaseVO<Readonly<ComplaintSeverityDetailVOProps>> {
  private constructor(props: ComplaintSeverityDetailVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ComplaintSeverityDetailVOProps): ComplaintSeverityDetailVO {
    if (!props.severity) {
      throw new ValidationError(
        'ComplaintSeverityDetailVO requires severity',
        'complaintSeverityDetail',
      );
    }
    if (props.impactScore < 0 || props.urgencyScore < 0) {
      throw new ValidationError(
        'ComplaintSeverityDetailVO scores must be non-negative',
        'complaintSeverityDetail',
      );
    }
    return new ComplaintSeverityDetailVO(props);
  }

  get severity(): ComplaintSeverityVO {
    return this.value.severity;
  }

  get isEscalationRequired(): boolean {
    return (
      this.value.severity.isCritical() ||
      this.value.impactScore >= 8 ||
      this.value.urgencyScore >= 8
    );
  }

  get compositeScore(): number {
    return this.value.severity.weight * 2 + this.value.impactScore + this.value.urgencyScore;
  }

  get priority(): 'low' | 'medium' | 'high' | 'critical' {
    const score = this.compositeScore;
    if (score >= 20) return 'critical';
    if (score >= 15) return 'high';
    if (score >= 10) return 'medium';
    return 'low';
  }
}
