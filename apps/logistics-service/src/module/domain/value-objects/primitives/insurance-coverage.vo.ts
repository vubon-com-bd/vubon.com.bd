/**
 * InsuranceCoverage Value Object (array of coverage types)
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { INSURANCE_COVERAGE } from '@vubon/shared-constants/logistics';

export type InsuranceCoverageValue =
  (typeof INSURANCE_COVERAGE)[keyof typeof INSURANCE_COVERAGE];

const VALID_COVERAGES: readonly string[] = Object.values(INSURANCE_COVERAGE);

export class InsuranceCoverageVO extends BaseVO<readonly InsuranceCoverageValue[]> {
  private constructor(value: readonly InsuranceCoverageValue[]) {
    super(value);
  }

  static create(raw: readonly string[]): InsuranceCoverageVO {
    if (!Array.isArray(raw) || raw.length === 0) {
      throw new ValidationError('At least one coverage required', 'coverages');
    }
    const normalized: InsuranceCoverageValue[] = [];
    const seen = new Set<string>();
    for (const c of raw) {
      if (typeof c !== 'string') {
        throw new ValidationError('Coverage must be a string', 'coverages');
      }
      const n = c.trim().toLowerCase();
      if (!VALID_COVERAGES.includes(n)) {
        throw new ValidationError(
          `Invalid coverage "${n}". Allowed: ${VALID_COVERAGES.join(', ')}`,
          'coverages',
        );
      }
      if (seen.has(n)) {
        throw new ValidationError(`Duplicate coverage "${n}"`, 'coverages');
      }
      seen.add(n);
      normalized.push(n as InsuranceCoverageValue);
    }
    return new InsuranceCoverageVO(normalized);
  }

  static reconstitute(raw: readonly InsuranceCoverageValue[]): InsuranceCoverageVO {
    return new InsuranceCoverageVO(raw);
  }

  has(coverage: string): boolean {
    return this.value.includes(coverage.trim().toLowerCase() as InsuranceCoverageValue);
  }

  hasLoss(): boolean { return this.has(INSURANCE_COVERAGE.LOSS); }
  hasDamage(): boolean { return this.has(INSURANCE_COVERAGE.DAMAGE); }
  hasTheft(): boolean { return this.has(INSURANCE_COVERAGE.THEFT); }
  hasDelay(): boolean { return this.has(INSURANCE_COVERAGE.DELAY); }

  isComprehensive(): boolean {
    return this.hasLoss() && this.hasDamage() && this.hasTheft();
  }

  get count(): number {
    return this.value.length;
  }
}
