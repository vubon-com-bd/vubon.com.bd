/**
 * InsuranceStatus Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { INSURANCE_STATUS } from '@vubon/shared-constants/logistics';
import { InvalidInsuranceStatusError } from '../../errors/insurance.errors.js';

const ALLOWED = Object.values(INSURANCE_STATUS) as readonly string[];

export class InsuranceStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): InsuranceStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidInsuranceStatusError(String(raw));
    }
    return new InsuranceStatusVO(raw);
  }

  static reconstitute(raw: string): InsuranceStatusVO { return new InsuranceStatusVO(raw); }

  static active(): InsuranceStatusVO { return new InsuranceStatusVO(INSURANCE_STATUS.ACTIVE); }
  static inactive(): InsuranceStatusVO { return new InsuranceStatusVO(INSURANCE_STATUS.INACTIVE); }
  static expired(): InsuranceStatusVO { return new InsuranceStatusVO(INSURANCE_STATUS.EXPIRED); }
  static cancelled(): InsuranceStatusVO { return new InsuranceStatusVO(INSURANCE_STATUS.CANCELLED); }
  static claimed(): InsuranceStatusVO { return new InsuranceStatusVO(INSURANCE_STATUS.CLAIMED); }
  static pending(): InsuranceStatusVO { return new InsuranceStatusVO(INSURANCE_STATUS.PENDING); }

  isActive(): boolean { return this.value === INSURANCE_STATUS.ACTIVE; }
  isInactive(): boolean { return this.value === INSURANCE_STATUS.INACTIVE; }
  isExpired(): boolean { return this.value === INSURANCE_STATUS.EXPIRED; }
  isCancelled(): boolean { return this.value === INSURANCE_STATUS.CANCELLED; }
  isClaimed(): boolean { return this.value === INSURANCE_STATUS.CLAIMED; }
  isPending(): boolean { return this.value === INSURANCE_STATUS.PENDING; }

  isFinal(): boolean {
    return [INSURANCE_STATUS.EXPIRED, INSURANCE_STATUS.CANCELLED, INSURANCE_STATUS.CLAIMED].includes(
      this.value as never,
    );
  }

  /** Policy covers the shipment right now. */
  isCovering(): boolean { return this.isActive(); }

  /** Claim can still be filed. */
  canFileClaim(): boolean { return this.isActive() || this.isExpired(); }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [INSURANCE_STATUS.PENDING]: [
        INSURANCE_STATUS.ACTIVE,
        INSURANCE_STATUS.CANCELLED,
      ],
      [INSURANCE_STATUS.ACTIVE]: [
        INSURANCE_STATUS.CLAIMED,
        INSURANCE_STATUS.EXPIRED,
        INSURANCE_STATUS.CANCELLED,
      ],
      [INSURANCE_STATUS.EXPIRED]: [INSURANCE_STATUS.CLAIMED],
      [INSURANCE_STATUS.INACTIVE]: [
        INSURANCE_STATUS.ACTIVE,
        INSURANCE_STATUS.CANCELLED,
      ],
      [INSURANCE_STATUS.CLAIMED]: [],
      [INSURANCE_STATUS.CANCELLED]: [],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
