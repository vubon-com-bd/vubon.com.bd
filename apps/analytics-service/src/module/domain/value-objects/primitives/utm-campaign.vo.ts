/**
 * UTM Campaign Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * UTM campaign name (e.g., "summer_sale_2025")।
 * Business Rule:
 * - Lowercase, alphanumeric + dot + hyphen + underscore
 * - Max 150 chars
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

const MIN_LENGTH = 1;
const MAX_LENGTH = 150;
const PATTERN = /^[a-z0-9][a-z0-9._-]*$/;

export class UtmCampaignVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UtmCampaignVO {
    if (typeof raw !== 'string') {
      throw new Error('UtmCampaign must be a string');
    }

    const normalized = raw.trim().toLowerCase();

    if (normalized.length < MIN_LENGTH || normalized.length > MAX_LENGTH) {
      throw new Error(`UtmCampaign must be ${MIN_LENGTH}-${MAX_LENGTH} chars`);
    }

    if (!PATTERN.test(normalized)) {
      throw new Error(
        `UtmCampaign must be lowercase alphanumeric with ._- : "${normalized}"`
      );
    }

    return new UtmCampaignVO(normalized);
  }

  /** Season hint (summer, winter, black_friday) */
  hasSeasonHint(): boolean {
    return /summer|winter|spring|fall|autumn|black_friday|cyber_monday|eid|puja/i.test(
      this.value
    );
  }

  /** Year hint (2025) */
  hasYearHint(): boolean {
    return /20\d{2}/.test(this.value);
  }

  /** Promotional hint */
  isPromotional(): boolean {
    return /sale|promo|discount|offer|deal|flash/i.test(this.value);
  }
}
