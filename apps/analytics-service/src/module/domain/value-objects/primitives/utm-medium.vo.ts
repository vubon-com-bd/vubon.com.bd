/**
 * UTM Medium Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * UTM campaign-এর medium (e.g., cpc, organic, email, social)।
 * Business Rule:
 * - Lowercase, alphanumeric + dot + hyphen
 * - Max 100 chars
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

const MIN_LENGTH = 1;
const MAX_LENGTH = 100;
const PATTERN = /^[a-z0-9][a-z0-9._-]*$/;

export class UtmMediumVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UtmMediumVO {
    if (typeof raw !== 'string') {
      throw new Error('UtmMedium must be a string');
    }

    const normalized = raw.trim().toLowerCase();

    if (normalized.length < MIN_LENGTH || normalized.length > MAX_LENGTH) {
      throw new Error(`UtmMedium must be ${MIN_LENGTH}-${MAX_LENGTH} chars`);
    }

    if (!PATTERN.test(normalized)) {
      throw new Error(
        `UtmMedium must be lowercase alphanumeric with ._- : "${normalized}"`
      );
    }

    return new UtmMediumVO(normalized);
  }

  isPaid(): boolean {
    const paidMediums: readonly string[] = ['cpc', 'cpm', 'cpa', 'ppc', 'paid', 'display'];
    return paidMediums.includes(this.value);
  }

  isOrganic(): boolean {
    return this.value === 'organic';
  }

  isEmail(): boolean {
    return this.value === 'email' || this.value === 'newsletter';
  }

  isSocial(): boolean {
    return this.value === 'social';
  }

  isReferral(): boolean {
    return this.value === 'referral';
  }

  isAffiliate(): boolean {
    return this.value === 'affiliate';
  }
}
