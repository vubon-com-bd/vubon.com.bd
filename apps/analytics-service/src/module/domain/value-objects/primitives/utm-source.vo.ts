/**
 * UTM Source Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * UTM campaign-এর source (e.g., google, facebook, newsletter)।
 * Business Rule:
 * - Lowercase, alphanumeric + dot + hyphen
 * - Max 100 chars
 * - Immutable
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

const MIN_LENGTH = 1;
const MAX_LENGTH = 100;
const PATTERN = /^[a-z0-9][a-z0-9._-]*$/;

export class UtmSourceVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UtmSourceVO {
    if (typeof raw !== 'string') {
      throw new Error('UtmSource must be a string');
    }

    const normalized = raw.trim().toLowerCase();

    if (normalized.length < MIN_LENGTH || normalized.length > MAX_LENGTH) {
      throw new Error(`UtmSource must be ${MIN_LENGTH}-${MAX_LENGTH} chars`);
    }

    if (!PATTERN.test(normalized)) {
      throw new Error(
        `UtmSource must be lowercase alphanumeric with ._- : "${normalized}"`
      );
    }

    return new UtmSourceVO(normalized);
  }

  static google(): UtmSourceVO {
    return UtmSourceVO.create('google');
  }

  static facebook(): UtmSourceVO {
    return UtmSourceVO.create('facebook');
  }

  static newsletter(): UtmSourceVO {
    return UtmSourceVO.create('newsletter');
  }

  isSearch(): boolean {
    const searchSources: readonly string[] = ['google', 'bing', 'yahoo', 'duckduckgo'];
    return searchSources.includes(this.value);
  }

  isSocial(): boolean {
    const socialSources: readonly string[] = [
      'facebook',
      'instagram',
      'twitter',
      'linkedin',
      'tiktok',
      'youtube',
      'pinterest',
    ];
    return socialSources.includes(this.value);
  }

  isEmail(): boolean {
    return (
      this.value.includes('email') ||
      this.value.includes('newsletter') ||
      this.value.includes('mail')
    );
  }
}
