/**
 * PerformanceGrade Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_PERFORMANCE_GRADE } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_PERFORMANCE_GRADE) as readonly string[];

export class PerformanceGradeVO extends BaseTypeVO<string> {
  private constructor(value: string) { super(value); }
  protected static allowedValues(): ReadonlySet<string> { return new Set(ALLOWED); }

  static create(raw: string): PerformanceGradeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(`Invalid performance grade "${raw}"`, 'grade');
    }
    return new PerformanceGradeVO(raw);
  }

  static reconstitute(raw: string): PerformanceGradeVO { return new PerformanceGradeVO(raw); }

  getRank(): number {
    const order = [
      VENDOR_PERFORMANCE_GRADE.F,
      VENDOR_PERFORMANCE_GRADE.D,
      VENDOR_PERFORMANCE_GRADE.C,
      VENDOR_PERFORMANCE_GRADE.B,
      VENDOR_PERFORMANCE_GRADE.A,
      VENDOR_PERFORMANCE_GRADE.A_PLUS,
    ];
    return order.indexOf(this.value as never);
  }

  isTopGrade(): boolean {
    return this.value === VENDOR_PERFORMANCE_GRADE.A_PLUS || this.value === VENDOR_PERFORMANCE_GRADE.A;
  }

  isFailing(): boolean {
    return this.value === VENDOR_PERFORMANCE_GRADE.D || this.value === VENDOR_PERFORMANCE_GRADE.F;
  }

  isHigherThan(other: PerformanceGradeVO): boolean {
    return this.getRank() > other.getRank();
  }

  getLabel(): string {
    const labels: Record<string, string> = {
      [VENDOR_PERFORMANCE_GRADE.A_PLUS]: 'A+',
      [VENDOR_PERFORMANCE_GRADE.A]: 'A',
      [VENDOR_PERFORMANCE_GRADE.B]: 'B',
      [VENDOR_PERFORMANCE_GRADE.C]: 'C',
      [VENDOR_PERFORMANCE_GRADE.D]: 'D',
      [VENDOR_PERFORMANCE_GRADE.F]: 'F',
    };
    return labels[this.value] ?? this.value;
  }
}
