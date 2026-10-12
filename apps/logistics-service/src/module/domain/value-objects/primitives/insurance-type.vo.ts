/**
 * InsuranceType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { INSURANCE_TYPE } from '@vubon/shared-constants/logistics';
import { InvalidInsuranceTypeError } from '../../errors/insurance.errors.js';

const ALLOWED = Object.values(INSURANCE_TYPE) as readonly string[];

export class InsuranceTypeVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): InsuranceTypeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidInsuranceTypeError(String(raw));
    }
    return new InsuranceTypeVO(raw);
  }

  static reconstitute(raw: string): InsuranceTypeVO { return new InsuranceTypeVO(raw); }

  static basic(): InsuranceTypeVO { return new InsuranceTypeVO(INSURANCE_TYPE.BASIC); }
  static standard(): InsuranceTypeVO { return new InsuranceTypeVO(INSURANCE_TYPE.STANDARD); }
  static premium(): InsuranceTypeVO { return new InsuranceTypeVO(INSURANCE_TYPE.PREMIUM); }
  static fullCoverage(): InsuranceTypeVO { return new InsuranceTypeVO(INSURANCE_TYPE.FULL_COVERAGE); }
  static thirdParty(): InsuranceTypeVO { return new InsuranceTypeVO(INSURANCE_TYPE.THIRD_PARTY); }

  isBasic(): boolean { return this.value === INSURANCE_TYPE.BASIC; }
  isStandard(): boolean { return this.value === INSURANCE_TYPE.STANDARD; }
  isPremium(): boolean { return this.value === INSURANCE_TYPE.PREMIUM; }
  isFullCoverage(): boolean { return this.value === INSURANCE_TYPE.FULL_COVERAGE; }
  isThirdParty(): boolean { return this.value === INSURANCE_TYPE.THIRD_PARTY; }

  /** Premium tier or above. */
  isHighTier(): boolean { return this.isPremium() || this.isFullCoverage(); }

  /** Premium percentage of declared value (per constants). */
  get premiumPercent(): number {
    const map: Record<string, number> = {
      [INSURANCE_TYPE.BASIC]: 0.5,
      [INSURANCE_TYPE.STANDARD]: 1.0,
      [INSURANCE_TYPE.PREMIUM]: 2.0,
      [INSURANCE_TYPE.FULL_COVERAGE]: 3.0,
      [INSURANCE_TYPE.THIRD_PARTY]: 1.5,
    };
    return map[this.value] ?? 1.0;
  }
}
