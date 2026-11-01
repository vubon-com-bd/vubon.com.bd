/**
 * InsuranceType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { INSURANCE_TYPE, INSURANCE } from '@vubon/shared-constants/logistics';

export type InsuranceTypeValue =
  (typeof INSURANCE_TYPE)[keyof typeof INSURANCE_TYPE];

const VALID_TYPES: readonly string[] = Object.values(INSURANCE_TYPE);

const PREMIUM_RATES: Readonly<Record<InsuranceTypeValue, number>> = {
  basic: INSURANCE.BASIC_PREMIUM_PERCENT,
  standard: INSURANCE.STANDARD_PREMIUM_PERCENT,
  premium: INSURANCE.PREMIUM_PREMIUM_PERCENT,
  full_coverage: INSURANCE.FULL_COVERAGE_PREMIUM_PERCENT,
  third_party: INSURANCE.STANDARD_PREMIUM_PERCENT,
};

export class InsuranceTypeVO extends BaseVO<InsuranceTypeValue> {
  private constructor(value: InsuranceTypeValue) {
    super(value);
  }

  static create(raw: string): InsuranceTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('InsuranceType must be a string', 'type');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.includes(normalized)) {
      throw new ValidationError(
        `Invalid InsuranceType: "${normalized}". Allowed: ${VALID_TYPES.join(', ')}`,
        'type',
      );
    }
    return new InsuranceTypeVO(normalized as InsuranceTypeValue);
  }

  static reconstitute(raw: string): InsuranceTypeVO {
    return new InsuranceTypeVO(raw as InsuranceTypeValue);
  }

  isBasic(): boolean { return this.value === INSURANCE_TYPE.BASIC; }
  isStandard(): boolean { return this.value === INSURANCE_TYPE.STANDARD; }
  isPremium(): boolean { return this.value === INSURANCE_TYPE.PREMIUM; }
  isFullCoverage(): boolean { return this.value === INSURANCE_TYPE.FULL_COVERAGE; }
  isThirdParty(): boolean { return this.value === INSURANCE_TYPE.THIRD_PARTY; }

  get premiumPercent(): number {
    return PREMIUM_RATES[this.value] ?? 1;
  }

  calculatePremium(declaredValue: number): number {
    return Math.round(declaredValue * (this.premiumPercent / 100) * 100) / 100;
  }

  isComprehensive(): boolean {
    return this.isFullCoverage() || this.isPremium();
  }
}
