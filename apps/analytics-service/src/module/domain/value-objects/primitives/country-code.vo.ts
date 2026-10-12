/**
 * Country Code Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * ISO 3166-1 alpha-2 country code (e.g., BD, US, IN)।
 * Business Rule:
 * - 2 uppercase letters
 * - COUNTRY constants থেকে preferred (known) countries
 * - Unknown 2-letter codes allowed (ISO compliance)
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { COUNTRY } from '@vubon/shared-constants/common';

const KNOWN_COUNTRIES: readonly string[] = Object.values(COUNTRY);
const PATTERN = /^[A-Z]{2}$/;

export class CountryCodeVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CountryCodeVO {
    if (typeof raw !== 'string') {
      throw new Error('CountryCode must be a string');
    }

    const normalized = raw.trim().toUpperCase();

    if (!PATTERN.test(normalized)) {
      throw new Error(
        `CountryCode must be 2 uppercase letters (ISO 3166-1 alpha-2), got "${normalized}"`
      );
    }

    return new CountryCodeVO(normalized);
  }

  /** Known country (in our constants) কিনা */
  isKnown(): boolean {
    return KNOWN_COUNTRIES.includes(this.value);
  }

  /** Bangladesh কিনা */
  isBangladesh(): boolean {
    return this.value === COUNTRY.BD;
  }

  /** South Asia কিনা */
  isSouthAsia(): boolean {
    const southAsia: readonly string[] = [
      COUNTRY.BD,
      COUNTRY.IN,
      COUNTRY.PK,
      COUNTRY.NP,
      COUNTRY.LK,
    ];
    return southAsia.includes(this.value);
  }

  /** Middle East কিনা */
  isMiddleEast(): boolean {
    const middleEast: readonly string[] = [COUNTRY.AE, COUNTRY.SA];
    return middleEast.includes(this.value);
  }
}
