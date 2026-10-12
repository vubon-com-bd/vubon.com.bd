/**
 * InsuranceCoverage Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { INSURANCE_COVERAGE } from '@vubon/shared-constants/logistics';
import { InvalidInsuranceCoverageError } from '../../errors/insurance.errors.js';

const ALLOWED = Object.values(INSURANCE_COVERAGE) as readonly string[];

export class InsuranceCoverageVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): InsuranceCoverageVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidInsuranceCoverageError(String(raw));
    }
    return new InsuranceCoverageVO(raw);
  }

  static reconstitute(raw: string): InsuranceCoverageVO { return new InsuranceCoverageVO(raw); }

  static loss(): InsuranceCoverageVO { return new InsuranceCoverageVO(INSURANCE_COVERAGE.LOSS); }
  static damage(): InsuranceCoverageVO { return new InsuranceCoverageVO(INSURANCE_COVERAGE.DAMAGE); }
  static theft(): InsuranceCoverageVO { return new InsuranceCoverageVO(INSURANCE_COVERAGE.THEFT); }
  static delay(): InsuranceCoverageVO { return new InsuranceCoverageVO(INSURANCE_COVERAGE.DELAY); }
  static partialLoss(): InsuranceCoverageVO { return new InsuranceCoverageVO(INSURANCE_COVERAGE.PARTIAL_LOSS); }
  static totalLoss(): InsuranceCoverageVO { return new InsuranceCoverageVO(INSURANCE_COVERAGE.TOTAL_LOSS); }
  static naturalDisaster(): InsuranceCoverageVO { return new InsuranceCoverageVO(INSURANCE_COVERAGE.NATURAL_DISASTER); }

  isLoss(): boolean { return this.value === INSURANCE_COVERAGE.LOSS; }
  isDamage(): boolean { return this.value === INSURANCE_COVERAGE.DAMAGE; }
  isTheft(): boolean { return this.value === INSURANCE_COVERAGE.THEFT; }
  isDelay(): boolean { return this.value === INSURANCE_COVERAGE.DELAY; }
  isPartialLoss(): boolean { return this.value === INSURANCE_COVERAGE.PARTIAL_LOSS; }
  isTotalLoss(): boolean { return this.value === INSURANCE_COVERAGE.TOTAL_LOSS; }
  isNaturalDisaster(): boolean { return this.value === INSURANCE_COVERAGE.NATURAL_DISASTER; }

  /** Physical damage to goods. */
  isPhysical(): boolean {
    return [INSURANCE_COVERAGE.LOSS, INSURANCE_COVERAGE.DAMAGE, INSURANCE_COVERAGE.THEFT, INSURANCE_COVERAGE.PARTIAL_LOSS, INSURANCE_COVERAGE.TOTAL_LOSS].includes(this.value as never);
  }

  /** Financial loss (no physical damage). */
  isFinancial(): boolean { return this.isDelay(); }

  /** Full-value payout coverage. */
  isFullValue(): boolean {
    return [INSURANCE_COVERAGE.TOTAL_LOSS, INSURANCE_COVERAGE.LOSS, INSURANCE_COVERAGE.THEFT].includes(this.value as never);
  }

  /** Force majeure scenarios. */
  isForceMajeure(): boolean { return this.isNaturalDisaster(); }
}
